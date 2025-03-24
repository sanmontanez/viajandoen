import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

const client_id = process.env.AMADEUS_CLIENT_ID;
const client_secret = process.env.AMADEUS_CLIENT_SECRET;

const getAccessToken = async () => {
  const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'grant_type': 'client_credentials',
      'client_id': client_id,
      'client_secret': client_secret
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Failed to get access token:', errorData);
    throw new Error('Failed to get access token');
  }

  const data = await response.json();
  return data.access_token;
};

const searchLocation = async (city) => {
  const accessToken = await getAccessToken();

  const response = await fetch(`https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT,CITY&keyword=${city}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Failed to fetch location data:', errorData);
    throw new Error('Failed to fetch location data');
  }

  const data = await response.json();
  return data.data;
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city');

  try {
    const locations = await searchLocation(city);
    return NextResponse.json(locations);
  } catch (error) {
    console.error('Error fetching location data:', error);
    return NextResponse.json({ error: 'Failed to fetch location data' }, { status: 500 });
  }
}
