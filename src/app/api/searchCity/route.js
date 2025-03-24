import { NextResponse } from 'next/server';
import Amadeus from 'amadeus';

// Mover la inicialización de Amadeus dentro de una función
function getAmadeusClient() {
  return new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET
  });
}

async function testConnection() {
  try {
    const response = await fetch('https://api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'grant_type': 'client_credentials',
        'client_id': process.env.AMADEUS_CLIENT_ID,
        'client_secret': process.env.AMADEUS_CLIENT_SECRET
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Connection test successful:', data);
    return true;
  } catch (error) {
    console.error('Error testing connection:', error);
    return false;
  }
}

export async function POST(request) {
  try {
    const connectionTestPassed = await testConnection();
    
    if (!connectionTestPassed) {
      return NextResponse.json({ message: 'Failed to connect to Amadeus API' }, { status: 500 });
    }

    const { city } = await request.json();
    
    // Inicializar Amadeus solo cuando sea necesario
    const amadeus = getAmadeusClient();
    
    const response = await amadeus.referenceData.locations.get({
      keyword: city,
      subType: Amadeus.location.any
    });

    console.log('City search response data:', response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error in POST request:', error);
    return NextResponse.json({ message: 'Error processing request', error: error.message }, { status: 500 });
  }
}