import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Transaction from '../../../models/Transaction';
import Booking from '../../../models/Booking';

export async function POST(req) {
  const { orderId, passengerData, paymentDetails, flightData } = await req.json();

  if (!flightData) {
    return NextResponse.json({ error: 'Flight data is missing' }, { status: 400 });
  }

  try {
    await connectToDatabase();

    const booking = await Booking.findOne({ 'paymentDetails.id': paymentDetails.id });
    const bookingReference = booking && booking.bookingDetails ? booking.bookingDetails.bookingReference : '';

    if (!bookingReference) {
      console.error('Booking reference is missing');
    } else {
      console.log('Booking reference:', bookingReference);
    }

    const ticketDetails = {
      passengerName: `${passengerData.firstName} ${passengerData.lastName}`,
      passengerEmail: passengerData.email,
      flightNumber: flightData.map(flight => flight.itineraries.map(itinerary => itinerary.segments.map(segment => segment.carrierCode + segment.number)).flat()).flat().join(', '),
      departure: flightData.map(flight => flight.itineraries.map(itinerary => itinerary.segments.map(segment => new Date(segment.departure.at).toLocaleString())).flat()).flat().join(', '),
      arrival: flightData.map(flight => flight.itineraries.map(itinerary => itinerary.segments.map(segment => new Date(segment.arrival.at).toLocaleString())).flat()).flat().join(', '),
      transactionId: paymentDetails.id,
      amount: paymentDetails.amount,
      bookingReference: bookingReference,
    };

    const transaction = new Transaction({
      orderId,
      passengerData,
      flightData,
      paymentDetails,
      bookingDetails: booking ? booking.bookingDetails : null,
    });

    await transaction.save();

    return NextResponse.json({ ticketDetails });
  } catch (error) {
    console.error('Error issuing ticket:', error);
    return NextResponse.json({ error: 'Failed to issue ticket' }, { status: 500 });
  }
}
