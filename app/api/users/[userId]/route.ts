import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import {NextResponse} from "next/server";



export async function PUT(
    request: Request

){
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }
    const body = await request.json();
    const{
        createdProfile,
        work,
        funFact,
        pets,
        spendTime,
        biography,
        liveIn,
        song,
        guestAttention,
        birthdate,
        obsessed,
        languages,
        breakfast,
        description

    } = body;

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data:{
            createdProfile,
            work,
            funFact,
            pets,
            spendTime,
            biography,
            liveIn,
            song,
            guestAttention,
            birthdate,
            obsessed,
            languages,
            breakfast,
            description
        }
    });

    return NextResponse.json(user);
}