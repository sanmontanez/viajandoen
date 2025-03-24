import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Transaction from '../../../models/Transaction';

export async function GET() {
  try {
    await connectToDatabase();
    const transactions = await Transaction.find({});
    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}
