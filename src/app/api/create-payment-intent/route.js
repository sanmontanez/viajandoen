import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

export const POST = async (req, res) => {
  const { amount } = await req.json();

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe usa centavos, así que multiplicamos por 100
      currency: 'usd',
    });

    return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), { status: 200 });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const GET = async (req, res) => {
  return new Response('Method not allowed', { status: 405 });
};
