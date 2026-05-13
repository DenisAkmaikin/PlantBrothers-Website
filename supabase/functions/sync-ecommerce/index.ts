import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, cart, checkout_url } = await req.json()
    if (!email) throw new Error("Email is required")

    const MAILERLITE_API_KEY = Deno.env.get('MAILERLITE_API_KEY')
    const SHOP_ID = Deno.env.get('MAILERLITE_SHOP_ID')

    if (!MAILERLITE_API_KEY || !SHOP_ID) {
      throw new Error("Missing environment variables")
    }

    // 1. Upsert Customer in MailerLite
    const customerResponse = await fetch(`https://connect.mailerlite.com/api/ecommerce/shops/${SHOP_ID}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        accepts_marketing: true, // Assuming true if they are at checkout
        create_subscriber: true
      })
    })

    if (!customerResponse.ok) {
       console.error("ML Customer Sync Error:", await customerResponse.text())
    }

    // 2. Sync Cart to MailerLite
    // Note: Carts in ML v3 are often handled via the 'carts' endpoint if available, 
    // but the search suggested using the order lifecycle or a specific cart endpoint.
    // Based on latest ML v3 docs: POST /api/ecommerce/shops/{shop_id}/carts
    const cartId = btoa(email).replace(/=/g, '') // Simple stable ID based on email
    
    const cartResponse = await fetch(`https://connect.mailerlite.com/api/ecommerce/shops/${SHOP_ID}/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        id: cartId,
        currency: 'EUR',
        total_price: cart.reduce((total: number, item: any) => total + (item.price * item.quantity), 0),
        checkout_url: checkout_url || 'https://4everplants.nl/cart.html',
        items: cart.map((item: any) => ({
          ecommerce_product_id: item.slug,
          variant_id: item.slug,
          name: item.name,
          unit_price: item.price,
          quantity: item.quantity,
          image_url: item.image
        }))
      })
    })

    if (!cartResponse.ok) {
        const errText = await cartResponse.text()
        console.error("ML Cart Sync Error:", errText)
        throw new Error(`MailerLite Cart Error: ${errText}`)
    }

    return new Response(
      JSON.stringify({ message: "Cart synced", status: "success" }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error: any) {
    console.error("Sync Error:", error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
