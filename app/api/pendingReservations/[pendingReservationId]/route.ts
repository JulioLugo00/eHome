import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams{
    pendingReservationId?: string;
}


export async function PUT(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error();
    }

    const { pendingReservationId } = params;

    if (!pendingReservationId || typeof pendingReservationId != 'string') {
        throw new Error('Invalid ID');
    }

    const body = await request.json();

    const startDate = new Date(body.startDate);
const endDate = new Date(body.endDate);

// Crear un objeto de actualización con todos los campos proporcionados en la solicitud
const updateData = {
    ...body,
    startDate: startDate,
    endDate: endDate,
    adultCount: parseInt(body.adultCount),
    childrenCount: parseInt(body.childrenCount)
};

// Eliminar campos que no deben actualizarse
delete updateData.id;
delete updateData.userId;

const pendingReservation = await prisma.pendingReservation.update({
    where: {
        id: pendingReservationId
    },
    data: updateData
});

    return NextResponse.json(pendingReservation);
}