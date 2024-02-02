import prisma from "@/app/libs/prismadb";

export default async function getAdvices(
    guidebookId: string
){
    try{
        const advices = await prisma.advice.findMany({
            where: {
                guidebookId: guidebookId
            },
        });
        return advices;
    } catch(error: any){
        throw new Error(error);
    }
}