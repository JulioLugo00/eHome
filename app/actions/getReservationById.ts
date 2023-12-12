import prisma from "@/app/libs/prismadb";

interface IParams{
    reservationId?: string;
}

export default async function getUserById(
    params: IParams
){
    try{
        const {reservationId} = params;

        const reservation = await prisma.reservation.findUnique({
            where: {
                id: reservationId
            },
            include: {
                listing: true
            },
        });

        if(!reservation){
            return null;
        }

        return {
            ...reservation,
            createdAt: reservation.createdAt.toString(),
            startDate: reservation.startDate.toString(),
            endDate: reservation.endDate.toString(),
            listing: {
                ...reservation.listing,
                createdAt: reservation.listing.createdAt.toISOString()
            }
        };
    } catch(error: any){
        throw new Error(error);
    }
}