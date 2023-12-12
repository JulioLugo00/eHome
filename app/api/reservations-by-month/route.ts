import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();
    const { year } = data;

    //const year = 2023;

    // Crear fecha de inicio y fin para el año
    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

    const reservations = await prisma.reservation.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
    });
    return new NextResponse(JSON.stringify(reservations), { status: 200 });


  } catch (error: any) {
    console.error(error);
    return new NextResponse(error, {
        status: 400,
      });
  }
}