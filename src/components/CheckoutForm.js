import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ amount, passengerData, flightData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Crear un PaymentIntent en el servidor y obtener el client secret
    const createPaymentIntent = async () => {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();
      setClientSecret(data.clientSecret);
    };

    createPaymentIntent();
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!clientSecret) {
      console.error("Client secret is missing");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: passengerData.firstName + ' ' + passengerData.lastName,
        },
      },
    });

    if (error) {
      console.error(error);
      alert('An error occurred during the transaction. Please try again.');
    } else {
      alert('Transaction completed successfully');

      // Enviar los datos del pasajero y la confirmación del pago a tu servidor
      try {
        const response = await fetch('/api/issue-ticket', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId: paymentIntent.id,
            passengerData: passengerData,
            paymentDetails: paymentIntent,
            flightData: flightData,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Ticket issued successfully:', result.ticketDetails);
          router.push(`/confirmation?ticketDetails=${encodeURIComponent(JSON.stringify(result.ticketDetails))}`);
        } else {
          console.error('Failed to issue ticket');
        }
      } catch (error) {
        console.error('Error issuing ticket:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
    </form>
  );
};

const StripeCheckoutButton = ({ amount, passengerData, flightData }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} passengerData={passengerData} flightData={flightData} />
    </Elements>
  );
};

export default StripeCheckoutButton;
