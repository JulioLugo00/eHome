import {NextResponse} from "next/server"
import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser"

export async function POST(
    request: Request
){
    const body = await request.json();

    const{
        listingId,
        startDate,
        endDate,
        totalPrice,
        userId,
        currency,
        guestNames,
        conversationId
    } = body;

    if(!listingId || !startDate || !endDate || !totalPrice || !userId || !currency){
        return NextResponse.error();
    }

    const listingAndReservation = await prisma.listing.update({
        where:{
            id: listingId
        },
        data: {
            reservations: {
                create: {
                    userId,
                    startDate,
                    endDate,
                    totalPrice,
                    currency,
                    guestNames,

                    conversationId
                }
            }
        }
    });

    return NextResponse.json(listingAndReservation);
}