import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function main() {
  console.log("Creating shipping rates...");

  // 1. Netherlands
  const nlRate = await stripe.shippingRates.create({
    display_name: 'Netherlands',
    type: 'fixed_amount',
    fixed_amount: { amount: 695, currency: 'eur' },
    delivery_estimate: { minimum: { unit: 'business_day', value: 1 }, maximum: { unit: 'business_day', value: 2 } },
  });
  console.log("NL Rate:", nlRate.id);

  // We can't set "Free shipping over X" or country restrictions via the API!
  // Wait, let's check the API docs for shippingRates.create.
}
main();
