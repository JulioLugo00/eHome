import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();
    const { year, month } = data;

    let startDate: Date;
    let endDate: Date;
    let monthString: string;
    if (month < 10) {
        monthString = `0${month}`;
    }
    else{
        monthString = `${month}`;
    }

    if (monthString === "01" || monthString === "03" || monthString === "05" || monthString === "07" || monthString === "08" || monthString === "10" || monthString === "12") {
        // Crear fecha de inicio y fin para el año
        startDate = new Date(`${year}-${monthString}-01T00:00:00.000Z`);
        endDate = new Date(`${year}-${monthString}-31T23:59:59.999Z`);
    }   else if (monthString === "04" || monthString === "06" || monthString === "09" || monthString === "11") {
        // Crear fecha de inicio y fin para el año
        startDate = new Date(`${year}-${monthString}-01T00:00:00.000Z`);
        endDate = new Date(`${year}-${monthString}-30T23:59:59.999Z`);
    }   else  {
        // Crear fecha de inicio y fin para el año
        startDate = new Date(`${year}-${monthString}-01T00:00:00.000Z`);
        endDate = new Date(`${year}-${monthString}-28T23:59:59.999Z`);
    } 




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