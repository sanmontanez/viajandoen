import Amadeus from 'amadeus';

const environment = process.env.NEXT_PUBLIC_AMADEUS_ENVIRONMENT;
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
  hostname: 'production',  // Prueba forzando a 'production'
});

// Verificación de variables de entorno
if (!process.env.AMADEUS_CLIENT_ID || !process.env.AMADEUS_CLIENT_SECRET) {
  console.error('Faltan las variables de entorno AMADEUS_CLIENT_ID o AMADEUS_CLIENT_SECRET');
} else {
  console.log('Amadeus Client ID:', process.env.AMADEUS_CLIENT_ID);
  console.log('Amadeus Client Secret:', process.env.AMADEUS_CLIENT_SECRET);
}

export const searchLocation = async (city) => {
  try {
    const response = await amadeus.referenceData.locations.get({
      keyword: city,
      subType: 'AIRPORT,CITY',
    });
    console.log('Resultados de búsqueda de ubicación:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching location data:', error);
    throw error;
  }
};

export default amadeus;
