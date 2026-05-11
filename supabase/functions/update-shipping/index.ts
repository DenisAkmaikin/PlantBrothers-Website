import Stripe from 'https://esm.sh/stripe?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { sessionId, country, shippingDetails } = await req.json();

    if (!sessionId || !country) {
      throw new Error("Missing sessionId or country");
    }

    // SECURITY: Retrieve the real subtotal from Stripe instead of trusting the frontend
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const orderTotal = session.amount_subtotal || 0;

    let amount = 2500;
    let display_name = 'International Shipping';
    let allowed = true;

    if (country === 'NL') {
      amount = orderTotal >= 10000 ? 0 : 695;
      display_name = orderTotal >= 10000 ? 'Netherlands (Free Shipping)' : 'Netherlands';
    } else if (['BE', 'DE'].includes(country)) {
      amount = orderTotal >= 10000 ? 0 : 895;
      display_name = orderTotal >= 10000 ? 'BE & DE (Free Shipping)' : 'Belgium & Germany';
    } else if (['FR', 'IT', 'ES', 'PT', 'AT', 'SE', 'DK', 'FI', 'IE', 'PL', 'CZ', 'HU', 'RO', 'BG', 'HR', 'SK', 'SI', 'EE', 'LV', 'LT', 'LU', 'MT', 'CY', 'GR'].includes(country)) {
      amount = orderTotal >= 15000 ? 0 : 1295;
      display_name = orderTotal >= 15000 ? 'EU (Free Shipping)' : 'Rest of EU';
    }

    // Return the shipping options directly to Stripe in the accepted format
    return new Response(
      JSON.stringify({ 
        type: 'accept',
        shippingOptions: [
          {
            id: `rate-${country.toLowerCase()}`,
            label: display_name,
            detail: 'Estimated delivery 1-5 business days',
            amount: amount, // in cents
          },
        ]
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error: any) {
    console.error("Error updating shipping:", error);
    // If something fails, we reject the shipping update
    return new Response(
      JSON.stringify({ type: 'reject', errorMessage: `Stripe Error: ${error.message}` }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200, // Return 200 so Stripe can parse the 'reject' payload
      }
    );
  }
});
