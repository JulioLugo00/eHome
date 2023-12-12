import prisma from "@/app/libs/prismadb";

interface IParams{
    pendingReservationId?: string;
}

export default async function getUserById(
    params: IParams
){
    try{
        const {pendingReservationId} = params;

        const reservation = await prisma.pendingReservation.findUnique({
            where: {
                id: pendingReservationId
            },
        });

        if(!reservation){
            return null;
        }

        return {
            ...reservation,
            startDate: reservation.startDate.toString(),
            endDate: reservation.endDate.toString(),
        };
    } catch(error: any){
        throw new Error(error);
    }
}