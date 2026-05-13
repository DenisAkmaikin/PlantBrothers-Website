import Stripe from 'https://esm.sh/stripe@14?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  httpClient: Stripe.createFetchHttpClient(),
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

Deno.serve(async (req) => {
  const signature = req.headers.get('Stripe-Signature');
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
  
  if (!signature || !webhookSecret) {
    return new Response('Webhook secret or signature missing', { status: 400 });
  }

  let event;
  try {
    const body = await req.text();
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const sessionId = session.id;

      // 0. Check if this order already exists to prevent duplicate webhooks
      const { data: existingOrder } = await supabase
        .from('orders')
        .select('id')
        .eq('stripe_session_id', sessionId)
        .single();

      if (existingOrder) {
        console.log(`Order already exists for session ${sessionId}, skipping.`);
        return new Response(JSON.stringify({ received: true, duplicate: true }), {
          headers: { 'Content-Type': 'application/json' },
          status: 200,
        });
      }

      // Extract details collected by Stripe
      const email = session.customer_details?.email;
      const amountTotal = session.amount_total; // Including shipping
      const shippingCost = session.shipping_cost?.amount_total || 0;
      
      const shippingDetails = session.shipping_details || session.customer_details;
      const address = shippingDetails?.address;
      const name = shippingDetails?.name || session.customer_details?.name;

      const street = address ? `${address.line1 || ''}${address.line2 ? `, ${address.line2}` : ''}`.trim() : null;

      if (!email || !address) {
         console.warn("Session completed without email or address details");
      }

      // 1. Insert the new paid order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          stripe_session_id: sessionId,
          status: 'paid',
          email: email || 'unknown',
          amount: amountTotal,
          shipping_fee: shippingCost,
          shipping_name: name || null,
          shipping_street: street || null,
          shipping_city: address?.city || null,
          shipping_zip: address?.postal_code || null,
          shipping_country: address?.country || null,
          shipping_state: address?.state || null,
        })
        .select('id')
        .single();

      if (orderError) {
        console.error("Error inserting order:", orderError);
        throw orderError;
      }
      
      const orderId = orderData.id;

      // 2. Retrieve line items from Stripe to know what was purchased
      const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
      
      // 3. Insert order items
      if (lineItems && lineItems.data && lineItems.data.length > 0) {
        const orderItemsToInsert = lineItems.data.map((item: any) => ({
          order_id: orderId,
          product_name: item.description, // Stripe stores the product name in description
          quantity: item.quantity,
          unit_price: item.price?.unit_amount || 0,
        }));

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItemsToInsert);

        if (itemsError) {
          console.error("Error inserting order items:", itemsError);
          throw itemsError;
        }
      }

      console.log(`Order inserted successfully for session: ${sessionId}`);

      // 4. Sync Order to MailerLite (Async)
      const MAILERLITE_API_KEY = Deno.env.get('MAILERLITE_API_KEY');
      const SHOP_ID = Deno.env.get('MAILERLITE_SHOP_ID');
      if (MAILERLITE_API_KEY && SHOP_ID && email) {
        fetch(`https://connect.mailerlite.com/api/ecommerce/shops/${SHOP_ID}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
          },
          body: JSON.stringify({
            id: String(orderId),
            email: email,
            currency: 'EUR',
            total_price: amountTotal / 100, // Stripe uses cents
            items: lineItems.data.map((item: any) => ({
              ecommerce_product_id: item.price?.product?.id || item.description,
              name: item.description,
              unit_price: (item.price?.unit_amount || 0) / 100,
              quantity: item.quantity
            }))
          })
        }).catch(err => console.error("Error syncing to MailerLite:", err));
      }

      // 5. Trigger the Order Confirmation Email (Async)
      // We don't 'await' this so the webhook returns quickly to Stripe
      fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-order-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        },
        body: JSON.stringify({ orderId: orderId })
      }).catch(err => console.error("Error triggering email function:", err));
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error: any) {
    console.error(`Webhook Error: ${error.message}`);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
