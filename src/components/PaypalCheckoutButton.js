'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const PaypalCheckoutButton = ({ amount, passengerData, flightData }) => {
  const router = useRouter();

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      alert('Transaction completed by ' + details.payer.name.given_name);

      // Validar los datos del pasajero y del vuelo
      if (!passengerData || !flightData) {
        console.error('Passenger data or flight data is missing');
        return;
      }

      try {
        // Enviar los datos del pasajero y la confirmación del pago a tu servidor
        const response = await fetch('/api/issue-ticket', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId: data.orderID,
            passengerData: passengerData,
            paymentDetails: details,
            flightData: flightData,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Ticket issued successfully:', result.ticketDetails);
          console.log('Redirection to confirmation page');
          router.push(`/confirmation?ticketDetails=${encodeURIComponent(JSON.stringify(result.ticketDetails))}`);
        } else {
          console.error('Failed to issue ticket');
        }
      } catch (error) {
        console.error('Error issuing ticket:', error);
      }
    });
  };

  const onError = (err) => {
    console.error('PayPal Checkout onError:', err);
    alert('An error occurred during the transaction. Please try again.');
  };

  const onCancel = (data) => {
    console.log('Transaction cancelled:', data);
    alert('The transaction was cancelled.');
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "AQlV6r0PTpw--ArTmQEoT1VL4f9gBi5Rr2ijTlT0mTIIc6yYOw21bS5v9o90sWOjM9A4ez2rLXEAHB5u" }}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
        onCancel={onCancel}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalCheckoutButton;
