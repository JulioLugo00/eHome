import { headers } from "next/headers"
import Stripe from 'stripe';
import { NextResponse } from "next/server";
import axios from "axios";

const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: '2023-08-16',
});

const webhookSecret = process.env.STRIPE_ENDPOINT_SECRET;

export async function POST (req: Request) {
  /*
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret!)
    }  catch (error: any) {
      return new NextResponse(error.message, { status: 400 })
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if(event.type === "checkout.session.completed"){
      console.log("Checkout Session Completed AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")

      // Retrieve the session details
    const sessionDetails = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['line_items'],
    });

    // Access title, currency, and reservationId from the line items
    if (sessionDetails.line_items?.data) {
      const lineItem = sessionDetails.line_items.data[0];
      const title = lineItem.description;  // Title of the product
      const currency = lineItem.currency;  // Currency used in the session
      const reservationId = session.metadata?.reservationId;
      
      const userNameTraveler = session.metadata?.userNameTraveler;
      const userNameHost = session.metadata?.userNameHost;
      const language = session.metadata?.language;

      const { data } = await axios.post("http://localhost:3000/api/getPendingReservationById", {
        data: { pendingReservationId: reservationId },
    });
    const response = await axios.post("http://localhost:3000/api/getListingById", {
        data: { listingId: data.listingId },
    });
    try {
    const reservationResponse = await axios.post('http://localhost:3000/api/create-reservation', {
      totalPrice: data.totalPrice,
      startDate: data.startDate,
      endDate: data.endDate,
      listingId: data.listingId,
      userId: data.userId,
      currency: data.currency,
    });
      console.log("DATAAA", data)

      console.log(`Title: ${title}, Currency: ${currency}, Reservation ID: ${reservationId}`);
      if (reservationResponse.status === 201 || reservationResponse.status === 200) {
        console.log('Property reserved!');

        try {
              // Ahora puedes obtener la reserva recién creada
              const getReservationResponse = await axios.post('http://localhost:3000/api/getReservationByData', {
              data: {
                  totalPrice: data.totalPrice,
                  startDate: data.startDate,
                  endDate: data.endDate,
                  listingId: data.listingId,
                  userId: data.userId,
                  currency: data.currency,
              },
              });
  
              const idReservation = getReservationResponse.data.id;
              
              axios.post('http://localhost:3000/api/email-traveler', {
                  data: { language: language, amount: data.totalPrice, userNameTraveler: userNameTraveler, userNameHost: userNameHost, titleListing: response.data.title, startDate:data.startDate, endDate: data.endDate, idReservation: idReservation},
          });
          axios.post('http://localhost:3000/api/email-host', {
              data: { language:  language, amount: data.totalPrice, userNameTraveler: userNameTraveler, userNameHost: userNameHost, titleListing: response.data.title, startDate:data.startDate, endDate: data.endDate, idReservation: idReservation},
          });
          
} catch (getReservationError) {
  console.error('Error retrieving reservation:', getReservationError);

}
}
} catch (reservationError) {
console.error('Error creating reservation:', reservationError);

}
    
    }
    }

    return new NextResponse("Webhook Handled", { status: 200 })*/
    
};