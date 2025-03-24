'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import airlineNames from '../../utils/airlineNames';

const PaymentResponseContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('Processing payment...');

  useEffect(() => {
    const token_ws = searchParams.get('token_ws');
    const storedData = JSON.parse(sessionStorage.getItem('transbankPaymentData'));

    const handlePaymentResponse = async () => {
      try {
        const response = await fetch('/api/payment-response', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token_ws }),
        });

        const data = await response.json();

        if (data.status === 'success') {
          setStatus('Payment successful. Creating booking...');
          const bookingResponse = await fetch('/api/createBooking', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              passengerData: storedData.passengerData,
              paymentDetails: data.details,
              flightData: storedData.flightData,
              additionalBaggage: storedData.additionalBaggage
            }),
          });

          if (!bookingResponse.ok) {
            throw new Error('Booking creation error');
          }

          const bookingResult = await bookingResponse.json();
          
          const ticketDetails = {
            passengerName: `${storedData.passengerData.firstName} ${storedData.passengerData.lastName}`,
            passengerEmail: storedData.passengerData.email,
            flightNumber: storedData.flightData.map(flight => flight.itineraries[0].segments.map(segment => segment.number).join(', ')).join(', '),
            departure: storedData.flightData.map(flight => flight.itineraries[0].segments.map(segment => new Date(segment.departure.at).toLocaleString()).join(', ')).join(', '),
            arrival: storedData.flightData.map(flight => flight.itineraries[0].segments.map(segment => new Date(segment.arrival.at).toLocaleString()).join(', ')).join(', '),
            transactionId: data.details.transactionId,
            amount: storedData.amount,
            bookingReference: bookingResult.bookingDetails.bookingReference,
            airlineNames: getAirlineNames(storedData.flightData),
            additionalBaggage: storedData.additionalBaggage
          };

          router.push(`/confirmation?ticketDetails=${encodeURIComponent(JSON.stringify(ticketDetails))}`);
        } else {
          setStatus('Payment failed. Please try again.');
        }
      } catch (error) {
        console.error('Error in payment process:', error);
        setStatus('An error occurred. Please contact support.');
      }
    };

    if (token_ws && storedData) {
      handlePaymentResponse();
    } else {
      setStatus('Invalid payment token or missing data. Please try again.');
    }
  }, [searchParams, router]);

  return <div>{status}</div>;
};

function getAirlineNames(flightData) {
  return flightData.map(flight =>
    flight.itineraries[0].segments.map(segment => {
      const carrierCode = segment.operating?.carrierCode || segment.carrierCode;
      return airlineNames[carrierCode] || `Unknown (${carrierCode})`;
    }).join(', ')
  ).join(', ');
}

export default PaymentResponseContent;