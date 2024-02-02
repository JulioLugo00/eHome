import prisma from "@/app/libs/prismadb";

interface IParams{
    guidebookId?: string;
}

export default async function getUserById(
    params: IParams
){
    try{
        const {guidebookId} = params;

        const guidebook = await prisma.guidebook.findUnique({
            where: {
                id: guidebookId
            }
        });

        if(!guidebook){
            return null;
        }

        return guidebook
    } catch(error: any){
        throw new Error(error);
    }
}