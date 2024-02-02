import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";


interface IParams{
    guidebookId?: string;
}

export async function PUT(
    request: Request,
){
    const body = await request.json();
    const {guidebookId,  title, coverImage} = body;

    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }

    if(!guidebookId || typeof guidebookId !== 'string'){
        throw new Error('Invalid ID');
    }

    if(title === "" && typeof coverImage !== 'string'){
        return;
    }

    
    if(title !== "" && typeof coverImage !== 'string'){
        const guidebook = await prisma.guidebook.update({
            where:{
                id: guidebookId
            },
            data: {
                title,
             
            }
        }) 
        return NextResponse.json(guidebook);
    }

    if(title === "" && typeof coverImage === 'string'){
        const guidebook = await prisma.guidebook.update({
            where:{
                id: guidebookId
            },
            data: {
                coverImage: coverImage,
            }
        }) 
        return NextResponse.json(guidebook);
    }
    
    else if(title !== "" && typeof coverImage === 'string'){
        const guidebook = await prisma.guidebook.update({
            where:{
                id: guidebookId
            },
            data: {
                title,
                coverImage: coverImage,
            }
        }) 
        return NextResponse.json(guidebook);
    }  
}