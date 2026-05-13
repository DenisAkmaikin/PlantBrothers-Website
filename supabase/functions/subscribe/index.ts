import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, type } = await req.json()
    if (!email) throw new Error("Email is required")

    const MAILERLITE_API_KEY = Deno.env.get('MAILERLITE_API_KEY')
    const STRIPE_KEY = Deno.env.get('STRIPE_SECRET_KEY')
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    const NEWSLETTER_GROUP = Deno.env.get('MAILERLITE_NEWSLETTER_GROUP_ID')
    const DISCOUNT_GROUP = Deno.env.get('MAILERLITE_DISCOUNT_GROUP_ID')

    if (!MAILERLITE_API_KEY || !STRIPE_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing environment variables")
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    const stripe = new Stripe(STRIPE_KEY, {
      apiVersion: '2022-11-15',
      httpClient: Stripe.createFetchHttpClient(),
    })

    if (type === 'discount') {
      // 1. Check if email already claimed
      const { data: existingClaim, error: fetchError } = await supabase
        .from('discount_claims')
        .select('*')
        .eq('email', email)
        .single()

      if (existingClaim) {
        return new Response(
          JSON.stringify({ message: "Already subscribed", status: "exists" }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        )
      }

      // 2. Create unique Stripe coupon
      const coupon = await stripe.coupons.create({
        percent_off: 10,
        duration: 'once',
        max_redemptions: 1,
        name: `Welcome ${email}`,
        metadata: { email }
      })

      // 3. Add to MailerLite with custom field
      const mlResponse = await fetch(`https://connect.mailerlite.com/api/subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          groups: [DISCOUNT_GROUP],
          fields: {
            discount_code: coupon.id
          }
        })
      })

      if (!mlResponse.ok) {
        const errData = await mlResponse.json()
        throw new Error(`MailerLite Error: ${JSON.stringify(errData)}`)
      }

      // 4. Store claim in Supabase
      const { error: insertError } = await supabase
        .from('discount_claims')
        .insert({ email, stripe_coupon_id: coupon.id })

      if (insertError) throw insertError

      return new Response(
        JSON.stringify({ message: "Discount code sent!", status: "success" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )

    } else {
      // Newsletter only
      const mlResponse = await fetch(`https://connect.mailerlite.com/api/subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          groups: [NEWSLETTER_GROUP]
        })
      })

      if (!mlResponse.ok) {
        const errData = await mlResponse.json()
        throw new Error(`MailerLite Error: ${JSON.stringify(errData)}`)
      }

      return new Response(
        JSON.stringify({ message: "Subscribed to newsletter!", status: "success" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    }

  } catch (error: any) {
    console.error("Subscribe Error:", error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
