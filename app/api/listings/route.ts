import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title,
        description,
        imageSrc,
        category,
        type,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price,
        discount,
        weekDiscount,
        monthlyDiscount,
        firstReservation,
        state,
        city,
        country,
        address,
        zipCode,
        guns,
        dangerousAnimals,
        securityCameras,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if(!body[value]) {
            NextResponse.error();
        }
    });



    const listing = await prisma.listing.create({
        data: {
            title,
            description,
 
            imageSrc,
            
            category,
            type,
            discount,
            weekDiscount,
            monthlyDiscount,
            firstReservation,
            roomCount,
            bathroomCount,
            guestCount,
            state,
            city,
            country,
            address,
            zipCode,
            guns,
            dangerousAnimals,
            securityCameras,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id,
        }
    });

    return NextResponse.json(listing);
}