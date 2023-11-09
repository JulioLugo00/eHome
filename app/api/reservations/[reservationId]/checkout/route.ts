import Stripe from "stripe";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import { stripe } from "@/app/libs/stripe";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()

    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const reservation = await prisma.reservation.findUnique({
      where: {
        id: params.id,
      }
    });

    const listing = await prisma.listing.findUnique({
        where: {
          id: reservation?.id,
        }
      });

    if (!reservation) {
      return new NextResponse("Not found", { status: 404 });
    }

    if(!listing){
        return new NextResponse("Not found", { status: 404 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: listing?.title,
            description: listing.description!,
          },
          unit_amount: Math.round(reservation.totalPrice! * 100),
        }
      }
    ];



    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/reservations/${reservation.id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/reservations/${reservation.id}?canceled=1`,
      metadata: {
        reservationId: reservation.id,
        userId: user.id,
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}