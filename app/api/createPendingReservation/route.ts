import prisma from "@/app/libs/prismadb";
import {NextResponse} from "next/server";

export async function POST(
    request: Request
){
    const body = await request.json();
    const{
        userId,
        listingId,
        startDate,
        endDate,
        totalPrice,
        userNameHost,
        currency
    } = body;

    try {
        // Crea la reserva pendiente en la base de datos
        const pendingReservation = await prisma.pendingReservation.create({
          data: {
            userId,
            listingId,
            startDate,
            endDate,
            totalPrice,
            userNameHost,
            currency
          },
        });
    
        // Devuelve la reserva pendiente creada
        return NextResponse.json(pendingReservation);
    } catch (error) {
        console.error('Error al crear la reserva pendiente:', error);
        return NextResponse.error();
    }
}
