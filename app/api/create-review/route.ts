import prisma from "@/app/libs/prismadb";
import {NextResponse} from "next/server";

export async function POST(
    request: Request
){
    const bodyRequest = await request.json();
    const{
        userId,
        listingId,
        body,
        rating
    } = bodyRequest;

    try {
        // Crea la reserva pendiente en la base de datos
        const review = await prisma.review.create({
          data: {
            userId,
            listingId,
            body,
            rating
          },
        });
    
        // Devuelve la reserva pendiente creada
        return NextResponse.json(review);
    } catch (error) {
        console.error('Error al crear la reservación:', error);
        return NextResponse.error();
    }
}
