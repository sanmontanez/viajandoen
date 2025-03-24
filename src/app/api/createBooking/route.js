import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Booking from '../../../models/Booking';

export async function POST(req) {
  try {
    const { passengerData, flightData, paymentDetails, additionalBaggage } = await req.json();

    if (!passengerData || !flightData || !paymentDetails) {
      console.error('Missing required data');
      return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
    }

    console.log('Received booking request:', { passengerData, flightData, paymentDetails, additionalBaggage });

    // Connect to the database
    await connectToDatabase();

    // Add additional baggage information to the flight data
    if (additionalBaggage) {
      flightData.forEach((flight, index) => {
        flight.travelerPricings.forEach((travelerPricing) => {
          travelerPricing.fareDetailsBySegment.forEach((fareDetail) => {
            if (!fareDetail.includedCheckedBags) {
              fareDetail.includedCheckedBags = {};
            }

            // Add the additional baggage to the fare details
            fareDetail.includedCheckedBags.quantity = 
              (fareDetail.includedCheckedBags.quantity || 0) + 
              (additionalBaggage?.[index]?.firstBag || 0) +
              (additionalBaggage?.[index]?.secondBag || 0) +
              (additionalBaggage?.[index]?.thirdBag || 0);
          });
        });
      });
    }

    // Generate a unique booking reference instead of getting it from Amadeus
    const bookingReference = generateBookingReference();
    
    // Create a unique order ID
    const orderId = `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Create and save the booking in our database
    const booking = new Booking({
      orderId: orderId,
      passengerData,
      flightData,
      paymentDetails,
      bookingDetails: {
        id: orderId,
        bookingReference: bookingReference,
        status: 'CONFIRMED', // Status hardcoded to CONFIRMED since we're not using Amadeus
      },
      createdAt: new Date()
    });

    await booking.save();

    console.log('Booking saved to database:', booking);

    // Prepare the response - keep the same structure as before
    const responseData = {
      bookingDetails: {
        id: booking.orderId,
        bookingReference: bookingReference,
        status: 'CONFIRMED',
        passengerName: `${passengerData.firstName} ${passengerData.lastName}`,
        flightInfo: flightData.map(flight => ({
          departureDate: flight.itineraries[0].segments[0].departure.at,
          arrivalDate: flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.at,
          origin: flight.itineraries[0].segments[0].departure.iataCode,
          destination: flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.iataCode,
        })),
        amount: paymentDetails.paymentDetails?.amount || paymentDetails.amount,
        currency: paymentDetails.paymentDetails?.currency || paymentDetails.currency || 'CLP',
      }
    };

    console.log('Sending response:', responseData);

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to create booking', details: error.message }, { status: 500 });
  }
}

// Generate a unique booking reference (6 character alphanumeric code)
function generateBookingReference() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let reference = '';
  for (let i = 0; i < 6; i++) {
    reference += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return reference;
}