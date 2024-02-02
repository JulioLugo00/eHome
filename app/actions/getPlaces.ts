import prisma from "@/app/libs/prismadb";

export default async function getPlaces(
    guidebookId: string
){
    try{
        const places = await prisma.place.findMany({
            where: {
                guidebookId: guidebookId
            },
        });
        return places;
    } catch(error: any){
        throw new Error(error);
    }
}