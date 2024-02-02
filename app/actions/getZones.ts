import prisma from "@/app/libs/prismadb";

export default async function getZones(
    guidebookId: string
){
    try{
        const zones = await prisma.zone.findMany({
            where: {
                guidebookId: guidebookId
            },
        });
        return zones;
    } catch(error: any){
        throw new Error(error);
    }
}