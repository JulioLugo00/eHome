import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import {NextResponse} from "next/server";

export async function POST(
  request: Request
){
    const currentUser = await getCurrentUser();

    const bodyRequest = await request.json();
    const{
        category,
        body,
        title,
        guidebookId
        
        
    } = bodyRequest;

    if (!currentUser) {
        return NextResponse.error();
    }
    
    try {
        // Crea la reserva pendiente en la base de datos
        const advice= await prisma.advice.create({
          data: {
            title,
            category,
            guidebookId,
            body
          
          },
        });
    
        // Devuelve la reserva pendiente creada
        return NextResponse.json(advice);
    } catch (error) {
        console.error('Error al crear la guia:', error);
        return NextResponse.error();
    }
}
