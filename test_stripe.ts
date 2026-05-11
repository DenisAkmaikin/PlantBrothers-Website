import Stripe from 'https://esm.sh/stripe@14?target=deno';
const stripe = new Stripe('sk_test_123');
console.log(Object.keys(stripe.checkout.sessions));
