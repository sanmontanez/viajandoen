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

    // Generate a unique booking reference
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
        status: 'CONFIRMED',
      },
      createdAt: new Date()
    });

    await booking.save();

    console.log('Booking saved to database:', booking);

    // Extract payment information from the structure
    const payment = paymentDetails.paymentDetails || paymentDetails;

    // Prepare flights information - handle all itineraries and segments
    const flightsInfo = [];

    // Process each flight offer
    flightData.forEach(flight => {
      // Process each itinerary (outbound, return, etc.)
      flight.itineraries.forEach((itinerary, itineraryIndex) => {
        const itineraryInfo = {
          type: itineraryIndex === 0 ? 'OUTBOUND' : 'RETURN',
          segments: []
        };

        // Process each segment in the itinerary
        itinerary.segments.forEach(segment => {
          const departureDate = new Date(segment.departure.at);
          const arrivalDate = new Date(segment.arrival.at);
          
          itineraryInfo.segments.push({
            flightNumber: `${segment.carrierCode}${segment.number}`,
            origin: segment.departure.iataCode,
            destination: segment.arrival.iataCode,
            departure: `${segment.departure.iataCode} - ${departureDate.toLocaleString('es-CL')}`,
            arrival: `${segment.arrival.iataCode} - ${arrivalDate.toLocaleString('es-CL')}`,
            departureDateTime: segment.departure.at,
            arrivalDateTime: segment.arrival.at,
            carrierCode: segment.carrierCode
          });
        });

        flightsInfo.push(itineraryInfo);
      });
    });

    // Prepare the response data
    const responseData = {
      bookingDetails: {
        id: booking.orderId,
        bookingReference: bookingReference,
        status: 'CONFIRMED',
        passengerName: `${passengerData.firstName} ${passengerData.lastName}`,
        passengerEmail: passengerData.email,
        flights: flightsInfo,
        amount: payment.amount,
        currency: payment.currency || 'CLP',
        transactionId: payment.transactionId || payment.authorizationCode,
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