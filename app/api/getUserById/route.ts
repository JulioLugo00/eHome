import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { data } = await req.json();
    const { userId } = data;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        return new NextResponse(JSON.stringify(user), { status: 200 });
    } catch (error) {
        return new NextResponse("Error retrieving listing", {
                    status: 400,
            });
    }
}
