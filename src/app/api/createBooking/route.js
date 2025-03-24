import { NextResponse } from 'next/server';
import amadeus from '../../../lib/amadeus';
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

          // Optionally, include carry-on information if needed
          // fareDetail.includedCabinBags = { quantity: (fareDetail.includedCabinBags?.quantity || 0) + (additionalBaggage[index]?.carryOn || 0) };
        });
      });
    });

    // Create the flight order with Amadeus
    const amadeusResponse = await amadeus.booking.flightOrders.post(
      JSON.stringify({
        data: {
          type: 'flight-order',
          flightOffers: flightData,
          travelers: [
            {
              id: '1',
              dateOfBirth: passengerData.dateOfBirth,
              name: {
                firstName: passengerData.firstName,
                lastName: passengerData.lastName,
              },
              contact: {
                emailAddress: passengerData.email,
                phones: [
                  {
                    deviceType: 'MOBILE',
                    countryCallingCode: passengerData.phone.slice(1, 3), // Adjust to your country code extraction logic
                    number: passengerData.phone.slice(3), // Adjust to your phone number extraction logic
                  },
                ],
              },
              documents: [
                {
                  documentType: passengerData.documentType.toUpperCase(),
                  number: passengerData.documentNumber,
                  expiryDate: passengerData.documentExpirationDate,
                  issuanceCountry: passengerData.nationality,
                  nationality: passengerData.nationality,
                  holder: true,
                },
              ],
            },
          ],
        },
      })
    );

    console.log('Amadeus response:', amadeusResponse.data);

    const bookingReference = amadeusResponse.data.associatedRecords?.[0]?.reference;

    if (!bookingReference) {
      throw new Error('Booking reference not found in Amadeus response');
    }

    // Create and save the booking in our database
    const booking = new Booking({
      orderId: amadeusResponse.data.id,
      passengerData,
      flightData,
      paymentDetails,
      bookingDetails: {
        id: amadeusResponse.data.id,
        bookingReference: bookingReference,
        status: amadeusResponse.data.status,
      },
    });

    await booking.save();

    console.log('Booking saved to database:', booking);

    // Prepare the response
    const responseData = {
      bookingDetails: {
        id: booking.orderId,
        bookingReference: bookingReference,
        status: amadeusResponse.data.status,
        passengerName: `${passengerData.firstName} ${passengerData.lastName}`,
        flightInfo: flightData.map(flight => ({
          departureDate: flight.itineraries[0].segments[0].departure.at,
          arrivalDate: flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.at,
          origin: flight.itineraries[0].segments[0].departure.iataCode,
          destination: flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.iataCode,
        })),
        amount: paymentDetails.amount,
        currency: paymentDetails.currency,
      }
    };

    console.log('Sending response:', responseData);

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to create booking', details: error.message }, { status: 500 });
  }
}
