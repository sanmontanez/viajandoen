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
            transactionId: data.details.transactionId,
            amount: storedData.amount,
            bookingReference: bookingResult.bookingDetails.bookingReference,
            airlineNames: getAirlineNames(storedData.flightData),
            additionalBaggage: storedData.additionalBaggage,
            
            // Agregar estructura de flights para todos los itinerarios
            flights: storedData.flightData.flatMap(flight => 
              flight.itineraries.map((itinerary, itineraryIndex) => ({
                type: itineraryIndex === 0 ? 'OUTBOUND' : 'RETURN',
                segments: itinerary.segments.map(segment => {
                  const departureDate = new Date(segment.departure.at);
                  const arrivalDate = new Date(segment.arrival.at);
                  return {
                    flightNumber: `${segment.carrierCode}${segment.number}`,
                    origin: segment.departure.iataCode,
                    destination: segment.arrival.iataCode,
                    departure: `${segment.departure.iataCode} - ${departureDate.toLocaleString()}`,
                    arrival: `${segment.arrival.iataCode} - ${arrivalDate.toLocaleString()}`,
                    carrierCode: segment.carrierCode
                  };
                })
              }))
            ),
            
            // Mantener los campos originales para compatibilidad
            flightNumber: storedData.flightData[0].itineraries[0].segments[0].carrierCode + storedData.flightData[0].itineraries[0].segments[0].number,
            origin: storedData.flightData[0].itineraries[0].segments[0].departure.iataCode,
            destination: storedData.flightData[0].itineraries[0].segments[0].arrival.iataCode,
            departure: `${storedData.flightData[0].itineraries[0].segments[0].departure.iataCode} - ${new Date(storedData.flightData[0].itineraries[0].segments[0].departure.at).toLocaleString()}`,
            arrival: `${storedData.flightData[0].itineraries[0].segments[0].arrival.iataCode} - ${new Date(storedData.flightData[0].itineraries[0].segments[0].arrival.at).toLocaleString()}`
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