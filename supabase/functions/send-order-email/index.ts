import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { orderId } = await req.json();

    if (!orderId) throw new Error("Missing orderId");

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch order details
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', orderId)
      .single();

    if (orderError || !order) throw new Error("Order not found");

    if (!RESEND_API_KEY) {
        console.warn("RESEND_API_KEY not set. Mocking email send.");
        return new Response(JSON.stringify({ success: true, mocked: true }), { status: 200 });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'PlantBrothers <orders@plantbrothers.nl>',
        to: [order.email],
        subject: `Order Confirmed #${order.id.slice(0,8)}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h1 style="color: #1b5e20;">Thank you for your order!</h1>
            <p>Hi ${order.shipping_name},</p>
            <p>Your order <strong>#${order.id.slice(0,8)}</strong> has been confirmed and is being prepared for shipment.</p>
            
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Order Summary</h3>
                <ul style="list-style: none; padding: 0;">
                    ${order.order_items.map((item: any) => `
                        <li style="display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px dashed #ddd;">
                            <span>${item.quantity}x ${item.product_name}</span>
                            <strong>€${(item.unit_price / 100).toFixed(2)}</strong>
                        </li>
                    `).join('')}
                </ul>
                <div style="text-align: right; margin-top: 10px;">
                    <strong>Total: €${(order.amount / 100).toFixed(2)}</strong>
                </div>
            </div>

            <div style="margin: 20px 0;">
                <h3>Shipping Address</h3>
                <p>
                    ${order.shipping_name}<br>
                    ${order.shipping_street}<br>
                    ${order.shipping_zip} ${order.shipping_city}<br>
                    ${order.shipping_country}
                </p>
            </div>

            <p style="color: #666; font-size: 0.9rem; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
                If you have any questions, reply to this email or visit our <a href="https://plantbrothers.nl/support.html">support page</a>.
            </p>
          </div>
        `,
      }),
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
