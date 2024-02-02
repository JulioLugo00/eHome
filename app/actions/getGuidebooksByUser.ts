import prisma from "@/app/libs/prismadb";

export default async function getUserById(
    userId: string
){
    try{
        const guidebooks = await prisma.guidebook.findMany({
            where: {
                userId: userId
            },
        });
        return guidebooks;
    } catch(error: any){
        throw new Error(error);
    }
}