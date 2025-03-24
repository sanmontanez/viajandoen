'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ConfirmationContent = () => {
  const searchParams = useSearchParams();
  const ticketDetails = searchParams.get('ticketDetails');
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (ticketDetails) {
      try {
        const parsedTicket = JSON.parse(decodeURIComponent(ticketDetails));
        console.log('Parsed ticket details:', parsedTicket);
        setTicket(parsedTicket);

        // Llama a la API para enviar el correo electrónico
        const sendEmail = async () => {
          try {
            const response = await fetch('/api/sendEmail', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                to: parsedTicket.passengerEmail,
                subject: 'Ticket Confirmation',
                text: `Hello ${parsedTicket.passengerName},\n\nYour flight details:\nFlight Number: ${parsedTicket.flightNumber}\nDeparture: ${parsedTicket.departure}\nArrival: ${parsedTicket.arrival}\nTransaction ID: ${parsedTicket.transactionId}\nBooking Reference: ${parsedTicket.bookingReference}\nAirline: ${parsedTicket.airlineNames}\n\nThank you for booking with us!`,
                html: `<p>Hello ${parsedTicket.passengerName},</p><p>Your flight details:</p><p><strong>Flight Number:</strong> ${parsedTicket.flightNumber}</p><p><strong>Departure:</strong> ${parsedTicket.departure}</p><p><strong>Arrival:</strong> ${parsedTicket.arrival}</p><p><strong>Transaction ID:</strong> ${parsedTicket.transactionId}</p><p><strong>Booking Reference:</strong> ${parsedTicket.bookingReference}</p><p><strong>Airline:</strong> ${parsedTicket.airlineNames}</p><p>Thank you for booking with us!</p>`,
              }),
            });

            if (!response.ok) {
              throw new Error('Failed to send email');
            }

            console.log('Email sent successfully');
          } catch (error) {
            console.error('Error sending email:', error);
            setError('Failed to send confirmation email. Please contact customer support.');
          }
        };

        sendEmail();
      } catch (error) {
        console.error('Error parsing ticket details:', error);
        setError('Failed to load ticket details. Please try refreshing the page or contact customer support.');
      }
    }
  }, [ticketDetails]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!ticket) {
    return <div className="flex justify-center items-center h-screen">Loading ticket details...</div>;
  }

  return (
    <>
      <Header selectedCurrency="CLP" onCurrencyChange={() => {}} selectedLanguage="es" onLanguageChange={() => {}} />
      <div className="flex justify-center items-start min-h-screen bg-gray-100 p-8">
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Ticket Confirmation</h1>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">Passenger Details</h2>
            <p className="mb-2"><span className="font-bold">Name:</span> {ticket.passengerName}</p>
            <p><span className="font-bold">Email:</span> {ticket.passengerEmail}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">Flight Details</h2>
            <p className="mb-2"><span className="font-bold">Flight Number:</span> {ticket.flightNumber}</p>
            <p className="mb-2"><span className="font-bold">Departure:</span> {ticket.departure}</p>
            <p className="mb-2"><span className="font-bold">Arrival:</span> {ticket.arrival}</p>
            <p className="mb-2"><span className="font-bold">Airline:</span> {ticket.airlineNames}</p> {/* Mostrar el nombre de la aerolínea */}
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">Payment Details</h2>
            <p className="mb-2"><span className="font-bold">Transaction ID:</span> {ticket.transactionId}</p>
            <p><span className="font-bold">Amount:</span> ${ticket.amount.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">Booking Reference</h2>
            <p className="text-xl font-bold text-center p-4 bg-gray-100 rounded">{ticket.bookingReference}</p>
          </div>
          <div className="text-center text-sm text-gray-600 mt-8">
            <p>A confirmation email has been sent to your email address.</p>
            <p>Please keep your booking reference for future reference.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConfirmationContent;
