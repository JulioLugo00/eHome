import { NextResponse, NextRequest } from "next/server";
import { v4 as uuidv4 } from 'uuid';

const TRANSACTION_TIMEOUT = 15 * 60 * 1000; // 15 minutos

interface Transaction {
    price: number;
    startDate: string;
    endDate: string;
    userHostName: string;
    listingId: string;
}

let transactions: { [key: string]: Transaction } = {};

export async function POST(req: NextRequest) {
    const { data } = await req.json();
    const { price, startDate, endDate,  userHostName, listingId } = data;

    const transactionId = uuidv4();

    transactions[transactionId] = {
        price,
        startDate,
        endDate,
        userHostName,
        listingId,
    };
    console.log("Transacciones en start-payment ", transactions)
    return new NextResponse(JSON.stringify({ transactionId }), { status: 200 });
}

export { transactions };