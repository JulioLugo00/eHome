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
        description,
        guidebookId,

        latitude,
        longitude
        
    } = bodyRequest;

    if (!currentUser) {
        return NextResponse.error();
    }
    
    try {
        // Crea la reserva pendiente en la base de datos
        const zone= await prisma.zone.create({
          data: {
            name,
            image,
        
            description,
      
            guidebookId,
            latitude,
            longitude
          },
        });
    
        // Devuelve la reserva pendiente creada
        return NextResponse.json(zone);
    } catch (error) {
        console.error('Error al crear la guia:', error);
        return NextResponse.error();
    }
}
