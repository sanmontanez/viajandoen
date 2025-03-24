import { NextResponse } from 'next/server';
import { createTransaction } from '../../../lib/transbank';
import { v4 as uuidv4 } from 'uuid';

// Function to generate a unique but shorter buyOrder
const generateBuyOrder = (prefix) => {
  const uniqueId = uuidv4().replace(/-/g, '').substring(0, 18); // Generates a unique ID of 18 characters
  return `${prefix}-${uniqueId}`.substring(0, 26); // Ensures the total length is 26 characters or less
};

export async function POST(req) {
  try {
    const { amount, sessionId, buyOrder, returnUrl } = await req.json();

    console.log('Received payment request:', { amount, sessionId, buyOrder, returnUrl });

    if (!amount || !sessionId || !buyOrder || !returnUrl) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Ensure amount is an integer (Transbank requirement)
    const intAmount = Math.round(parseFloat(amount));

    console.log('Attempting to create transaction...');

    // Generate a shorter buyOrder if necessary
    const validBuyOrder = buyOrder.length > 26 ? generateBuyOrder('ORDER') : buyOrder;

    const createResponse = await createTransaction.create(validBuyOrder, sessionId, intAmount, returnUrl);

    console.log('Transaction created successfully:', createResponse);

    return NextResponse.json({
      url: createResponse.url,
      token: createResponse.token
    }, { status: 200 });

  } catch (error) {
    console.error('Error creating payment:', error);
    return NextResponse.json({ 
      error: 'Error creating payment',
      details: error.message 
    }, { status: 500 });
  }
}
