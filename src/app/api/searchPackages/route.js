import { NextResponse } from 'next/server';
import Amadeus from 'amadeus';

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET
});

export async function POST(request) {
  try {
    const { origin, destination, departureDate, returnDate, adults } = await request.json();

    // Buscar vuelos
    const flightsResponse = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      returnDate,
      adults
    });

    const flights = flightsResponse.data;

    // Buscar hoteles
    const hotelsResponse = await amadeus.shopping.hotelOffers.get({
      cityCode: destination,
      checkInDate: departureDate,
      checkOutDate: returnDate,
      roomQuantity: adults
    });

    const hotels = hotelsResponse.data;

    // Crear paquetes turísticos combinando vuelos y hoteles
    const packages = flights.map(flight => {
      return hotels.map(hotel => {
        return {
          flight,
          hotel
        };
      });
    }).flat();

    return NextResponse.json(packages);
  } catch (error) {
    console.error('Error fetching package data:', error);
    return NextResponse.json({ message: 'Error fetching package data' }, { status: 500 });
  }
}
