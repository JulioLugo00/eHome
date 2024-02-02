import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import {NextResponse} from "next/server";

export async function POST(
){
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }
    
    try {
        // Crea la reserva pendiente en la base de datos
        const guidebook = await prisma.guidebook.create({
          data: {
            userId: currentUser?.id,
            title: "Guidebook of " +  currentUser?.name,
          },
        });
    
        // Devuelve la reserva pendiente creada
        return NextResponse.json(guidebook);
    } catch (error) {
        console.error('Error al crear la guia:', error);
        return NextResponse.error();
    }
}
