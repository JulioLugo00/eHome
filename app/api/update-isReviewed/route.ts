import { NextRequest, NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb';

interface IParams{
    reservationId?:string;
}

export async function POST(req: NextRequest) {
    const { data } = await req.json();
    const { reservationId } = data;

    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }

    if (!reservationId || typeof reservationId != 'string'){
        throw new Error('Invalid ID');
    }

    const reservation = await prisma.reservation.update({
        where: {
            id: reservationId
        },
        data:{
            isReviewed: true
        }
    });

    return NextResponse.json(reservation);
}