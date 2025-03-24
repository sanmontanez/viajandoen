'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import airlineNames from '@/utils/airlineNames';

const stripePromise = loadStripe('pk_test_51AeqvULMed7kc1X7OztOCwd4U4SZYl8Snwz6dGEeLsL1KqNe0FcJgB3I5EG5puqeZAZOjz2AqELZBHqIwXs5gg2h00hu0JBurq');

const getAirlineNames = (flightData) => {
  console.log('Flight data received:', flightData);
  return flightData.map(flight =>
    flight.itineraries[0].segments.map(segment => {
      const carrierCode = segment.operating?.carrierCode || segment.carrierCode;
      console.log('Processing carrier code:', carrierCode);
      return airlineNames[carrierCode] || `Unknown (${carrierCode})`;
    }).join(', ')
  ).join(', ');
};

const CheckoutForm = ({ amount, passengerData, flightData, additionalBaggage }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
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

    if (!stripe || !elements || !clientSecret) {
      console.error("Stripe not initialized or client secret missing");
      return;
    }

    setIsProcessing(true);

    try {
      const cardElement = elements.getElement(CardElement);

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${passengerData.firstName} ${passengerData.lastName}`,
          },
        },
      });

      if (error) {
        throw error;
      }

      console.log('Payment successful:', paymentIntent);

      const bookingResponse = await fetch('/api/createBooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          passengerData: passengerData,
          paymentDetails: paymentIntent,
          flightData: flightData,
          additionalBaggage: additionalBaggage
        }),
      });

      if (!bookingResponse.ok) {
        throw new Error('Failed to create booking');
      }

      const bookingResult = await bookingResponse.json();
      console.log('Booking created:', bookingResult);

      // Redirect to confirmation page
      router.push(`/confirmation?ticketDetails=${encodeURIComponent(JSON.stringify({
        passengerName: `${passengerData.firstName} ${passengerData.lastName}`,
        passengerEmail: passengerData.email,
        flightNumber: flightData.map(flight => flight.itineraries[0].segments.map(segment => segment.number).join(', ')).join(', '),
        departure: flightData.map(flight => flight.itineraries[0].segments.map(segment => new Date(segment.departure.at).toLocaleString()).join(', ')).join(', '),
        arrival: flightData.map(flight => flight.itineraries[0].segments.map(segment => new Date(segment.arrival.at).toLocaleString()).join(', ')).join(', '),
        transactionId: paymentIntent.id,
        amount: paymentIntent.amount,
        bookingReference: bookingResult.bookingDetails.bookingReference,
        airlineNames: getAirlineNames(flightData),
        additionalBaggage: additionalBaggage
      }))}`);

    } catch (error) {
      console.error('Error in checkout process:', error);
      alert('An error occurred during the process. Please try again or contact support.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || !clientSecret || isProcessing} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        {isProcessing ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
};

const StripeCheckoutButton = ({ amount, passengerData, flightData, additionalBaggage }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} passengerData={passengerData} flightData={flightData} additionalBaggage={additionalBaggage} />
    </Elements>
  );
};

export default StripeCheckoutButton;