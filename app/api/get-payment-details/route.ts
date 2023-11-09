import { NextResponse, NextRequest } from "next/server";
import { transactions } from "../start-payment/route";

export async function POST(req: NextRequest) {
    const { data } = await req.json();
    const { transactionId } = data;
  
    console.log('transactions en get-payment details ', transactions)
  
    if (!transactionId || !transactions[transactionId]) {
      return new NextResponse(JSON.stringify({ error: 'Transaction not found' }), { status: 404 });
    }
    
    const transaction = transactions[transactionId];
    return new NextResponse(JSON.stringify(transaction), { status: 200 });
}
