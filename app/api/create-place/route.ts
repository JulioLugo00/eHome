import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import {NextResponse} from "next/server";

export async function POST(
  request: Request
){
    const currentUser = await getCurrentUser();

    const bodyRequest = await request.json();
    const{
        name,
        image,
        classification,
        description,
        guidebookId,
        category,
        latitude,
        longitude
        
    } = bodyRequest;

    if (!currentUser) {
        return NextResponse.error();
    }
    
    try {
        // Crea la reserva pendiente en la base de datos
        const place= await prisma.place.create({
          data: {
            name,
            image,
            classification,
            description,
            category,
            guidebookId,
            latitude,
            longitude
          },
        });
    
        // Devuelve la reserva pendiente creada
        return NextResponse.json(place);
    } catch (error) {
        console.error('Error al crear la guia:', error);
        return NextResponse.error();
    }
}
