import prisma from "@/app/libs/prismadb";

export default async function getTowns(
    guidebookId: string
){
    try{
        const towns = await prisma.town.findMany({
            where: {
                guidebookId: guidebookId
            },
        });
        return towns;
    } catch(error: any){
        throw new Error(error);
    }
}