import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { add } from "date-fns";

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
        price,
        discount,
        weekDiscount,
        monthlyDiscount,
        firstReservation,
        address,
        zipCode,
        guns,
        dangerousAnimals,
        securityCameras,
        addressGMap,
        countryStateCity,
        cityGMap,
    
    } = body;

    console.log(title)

    Object.keys(body).forEach((value: any) => {
        if(!body[value]) {
            return NextResponse.error();
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
            address,
            zipCode,
            guns,
            dangerousAnimals,
            securityCameras,
            cityGMap,
            latitude: addressGMap[0],
            longitude: addressGMap[1],
            price: parseInt(price, 10),
            user: {
                connect: {
                    id: currentUser.id
                }
            },
        
            country: countryStateCity.country.label,
            state: countryStateCity.state.label,
            city: countryStateCity.city.label
        }
    });

    return NextResponse.json(listing);
}