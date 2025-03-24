'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import airlineNames from '@/utils/airlineNames';

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

const TransbankCheckoutButton = ({ amount, passengerData, flightData, additionalBaggage }) => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Iniciar transacción con Transbank
      const createPaymentResponse = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          sessionId: `${passengerData.firstName}-${passengerData.lastName}-${Date.now()}`,
          buyOrder: `ORDER-${passengerData.lastName}-${Date.now()}`,
          returnUrl: `${window.location.origin}/payment-response`
        })
      });

      const paymentData = await createPaymentResponse.json();
      
      if (paymentData.url && paymentData.token) {
        // Almacenar datos relevantes en sessionStorage
        sessionStorage.setItem('transbankPaymentData', JSON.stringify({
          passengerData,
          flightData,
          additionalBaggage,
          amount
        }));

        // Redirigir a la página de pago de Transbank
        window.location.href = `${paymentData.url}?token_ws=${paymentData.token}`;
      } else {
        throw new Error('Invalid response from payment creation');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('An error occurred during the payment process. Please try again or contact support.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button 
      onClick={handlePayment} 
      disabled={isProcessing}
      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
    >
      {isProcessing ? 'Processing...' : 'Pay with Transbank'}
    </button>
  );
};

export default TransbankCheckoutButton;