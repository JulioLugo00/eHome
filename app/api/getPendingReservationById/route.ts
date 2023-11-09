import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { data } = await req.json();
    const { pendingReservationId } = data;

    try {
        const pendingReservation = await prisma.pendingReservation.findUnique({
            where: {
                id: pendingReservationId,
            },
        });

        return new NextResponse(JSON.stringify(pendingReservation), { status: 200 });
    } catch (error) {
        return new NextResponse("Error retrieving listing", {
                    status: 400,
            });
    }
}
