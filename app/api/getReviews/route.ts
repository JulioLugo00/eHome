import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

// La función API para obtener listados basados en cityGMap
export async function POST(req: NextRequest) {
    const { data } = await req.json();
    const { listingId } = data;
try {
    const reviews = await prisma.review.findMany({
        where: {
            listingId: listingId
        },
    });

    return new NextResponse(JSON.stringify(reviews), { status: 200 });
} catch (error: any) {
    console.error('Error fetching listings:', error);
    return new NextResponse(error, {
        status: 400,
      });
  } finally {
    // Asegúrate de cerrar las conexiones a la base de datos para evitar problemas
    await prisma.$disconnect();
  }
}