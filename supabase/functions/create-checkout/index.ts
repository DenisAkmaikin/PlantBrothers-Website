import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // 1. Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { items, SITE_URL } = await req.json()
    
    // 2. Initialize Stripe with the Deno-compatible client
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
    if (!stripeKey) throw new Error("Missing STRIPE_SECRET_KEY")
    
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2022-11-15', // Use a stable API version
      httpClient: Stripe.createFetchHttpClient(),
    })

    // 3. Simple line items
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: { 
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Ensure it's cents
      },
      quantity: item.quantity,
    }))

    // 4. Create session (Simplified to the most stable parameters)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'ideal', 'bancontact'],
      line_items: lineItems,
      mode: 'payment',
      ui_mode: 'embedded',
      shipping_address_collection: {
        allowed_countries: ['NL','DE','FR','BE','ES','IT','PT','AT','SE','DK','FI','IE','PL','CZ','HU','RO','BG','HR','SK','SI','EE','LV','LT','LU','MT','CY','GR'],
      },
      return_url: `${SITE_URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    })

    return new Response(
      JSON.stringify({ clientSecret: session.client_secret }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error: any) {
    console.error("Deploy Fix Error:", error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
