import { NextResponse } from 'next/server';
import { commitTransaction } from '../../../lib/transbank';

export async function POST(req) {
  const { token_ws } = await req.json();

  console.log('Received token_ws:', token_ws);

  try {
    console.log('Attempting to commit transaction...');
    
    const commitResponse = await commitTransaction.commit(token_ws);

    console.log('Commit response:', commitResponse);
    console.log('Full commit response:', JSON.stringify(commitResponse, null, 2));

    if (commitResponse.status === 'AUTHORIZED') {
      // ... (resto del código para manejar la transacción autorizada)

      return NextResponse.json({
        status: 'success',
        details: {
          paymentDetails: {
            transactionId: commitResponse.buy_order,
            amount: commitResponse.amount,
            status: commitResponse.status,
            paymentType: commitResponse.payment_type_code,
            authorizationCode: commitResponse.authorization_code,
            cardNumber: commitResponse.card_detail.card_number,
            transactionDate: commitResponse.transaction_date,
          },
          // ... (otros detalles como passengerData, flightData, etc.)
        }
      }, { status: 200 });
    } else {
      return NextResponse.json({
        status: 'failed',
        details: commitResponse
      }, { status: 200 });
    }
  } catch (error) {
    console.error('Error handling payment response:', error);
    return NextResponse.json({
      status: 'error',
      message: error.message || 'Unknown error occurred during payment processing'
    }, { status: 500 });
  }
}