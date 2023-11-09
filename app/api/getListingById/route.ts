
import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { data } = await req.json();
    const { listingId } = data;

    try {
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId,
            },
        });

        return new NextResponse(JSON.stringify(listing), { status: 200 });
    } catch (error) {
            return new NextResponse("Error retrieving listing", {
                    status: 400,
            });
    }
}
