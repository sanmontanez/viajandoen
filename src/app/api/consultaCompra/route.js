import connectToDatabase from '../../../lib/mongodb';
import Booking from '../../../models/Booking';

export async function POST(req) {
  const { email, lastName } = await req.json();

  console.log('Received request:', { email, lastName });

  try {
    await connectToDatabase();
    const bookings = await Booking.find({ 
      'passengerData.email': email, 
      'passengerData.lastName': lastName 
    })
    .sort({ createdAt: -1 }) // Ordena por fecha de creación descendente
    .limit(3); // Limita los resultados a los tres más recientes

    console.log('Bookings found:', bookings);

    if (bookings.length > 0) {
      return new Response(JSON.stringify(bookings), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Compra no encontrada' }), { status: 404 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al conectar con la base de datos' }), { status: 500 });
  }
}
