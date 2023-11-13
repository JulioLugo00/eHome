import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();
    const { startDate, endDate, listingId, totalPrice, userId, currency } = data

    if (!startDate || !endDate || !listingId || !totalPrice || !userId || !currency)  {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const reservation = await prisma.reservation.findFirst({
      where: {
        startDate,
        endDate,
        listingId,
        totalPrice,
        userId,
        currency
      }
    });

    if (!reservation) {
      return new NextResponse("La reservación no se ha encontrado", { status: 404 });
    }

    return new NextResponse(JSON.stringify({ id: reservation.id }), { status: 200 });
  } catch (error) {
    console.error('Error retrieving reservation', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}