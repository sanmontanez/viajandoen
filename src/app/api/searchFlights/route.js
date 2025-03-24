import { NextResponse } from 'next/server';
import amadeus from '../../../lib/amadeus';

const MARGIN_PERCENTAGE = 0.10; // Margen de ganancia por defecto del 15%
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 segundos

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchFlightOffers = async (params, retries = 0) => {
  try {
    const response = await amadeus.shopping.flightOffersSearch.get(params);
    return response;
  } catch (error) {
    if (error.code === 'ClientError' && error.response.statusCode === 429 && retries < MAX_RETRIES) {
      await delay(RETRY_DELAY);
      return fetchFlightOffers(params, retries + 1);
    }
    throw error;
  }
};

export async function POST(request) {
  try {
    const { origin, destination, departureDate, returnDate, adults } = await request.json();

    if (!origin || !destination || !departureDate || !adults) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const params = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      adults,
    };

    if (returnDate) {
      params.returnDate = returnDate;
    }

    const response = await fetchFlightOffers(params);

    const flightOffers = response.data.map((offer) => {
      const originalPrice = parseFloat(offer.price.total);
      const departureMonth = new Date(departureDate).getMonth();
      let marginPercentage = MARGIN_PERCENTAGE;

      if (departureMonth === 8) { // Septiembre es el mes 8 (0 indexado)
        if (destination === 'GIG') {
          marginPercentage = 0.1; // Ajusta esto según sea necesario
        } else {
          marginPercentage = 0.0; // Ajusta esto según sea necesario
        }
      }

      const priceWithMargin = (originalPrice * (1 + marginPercentage)).toFixed(2);

      return {
        ...offer,
        price: {
          ...offer.price,
          total: priceWithMargin,
        },
      };
    });

    return NextResponse.json(flightOffers);
  } catch (error) {
    console.error('Error fetching flight data:', error);

    let errorMessage = 'Error fetching flight data';
    let statusCode = 500;

    if (error.response) {
      const { statusCode: responseStatusCode, result } = error.response;

      if (responseStatusCode === 401) {
        errorMessage = 'Authentication failed. Please check your credentials.';
      } else if (responseStatusCode === 429) {
        errorMessage = 'Too many requests. Please try again later.';
      } else {
        errorMessage = result?.error_description || result?.title || errorMessage;
        statusCode = responseStatusCode;
      }
    }

    return NextResponse.json({ message: errorMessage, details: error.message }, { status: statusCode });
  }
}
