import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { data } = await req.json();
    const { reservationId } = data;

    try {
        const reservation = await prisma.reservation.findUnique({
            where: {
                id: reservationId,
            },
        });

        return new NextResponse(JSON.stringify(reservation), { status: 200 });
    } catch (error) {
        return new NextResponse("Error retrieving listing", {
                    status: 400,
            });
    }
}
