import { NextRequest, NextResponse } from 'next/server';

import { format } from 'date-fns';
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();
    const amount = body.get('amount');
    const currency = body.get('currency');
    const title = body.get('title');
    const startDate = body.get('startDate');
    const userNameHost = body.get('userNameHost');
    const userNameTraveler = body.get('userNameTraveler');
    const endDate = body.get('endDate');
    const adultCount = body.get('adultCount');
    const childrenCount = body.get('childrenCount');
    const pendingReservationId = body.get('pendingReservationId');
    const id = body.get('listingId');
    const reservationId = body.get('pendingReservationId');
    const language = body.get('language');
    if (typeof amount !== 'string' || typeof currency !== 'string' || typeof title !== 'string') {
      return new NextResponse('Invalid form data', { status: 400 });
    }
    if (typeof reservationId !== 'string' || typeof userNameHost !== 'string' || typeof userNameTraveler !== 'string' || typeof language !== 'string') {
      return new NextResponse('Invalid reservation ID', { status: 400 });
    }

    
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: title + " " + format(new Date(startDate as string), 'PP') + " " + format(new Date(endDate as string), 'PP') + " " + adultCount + " " + childrenCount,
            },
            unit_amount: Math.round(parseFloat(amount) * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/reservation/' + pendingReservationId,
      cancel_url: 'http://localhost:3000/listings/'+ id,
      metadata: {
        reservationId: reservationId,
        userNameHost: userNameHost,
        userNameTraveler: userNameTraveler,
        language: language,
      },
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err:any) {
    return new NextResponse(err.message, { status: err.statusCode || 500 });
  }
}