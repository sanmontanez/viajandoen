import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { orderId, passengerData, paymentDetails } = await request.json();

    // Aquí puedes guardar los datos del pasajero y la confirmación del pago en tu base de datos
    // Ejemplo:
    // await saveTransactionToDatabase(orderId, passengerData, paymentDetails);

    return NextResponse.json({ message: 'Transaction and passenger data saved successfully' });
  } catch (error) {
    console.error('Failed to save transaction and passenger data:', error);
    return NextResponse.json({ message: 'Failed to save transaction and passenger data' }, { status: 500 });
  }
}
