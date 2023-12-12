'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import {useTranslations} from 'next-intl';
import { loadStripe } from "@stripe/stripe-js";
//import {useRouter} from 'next-intl/client';
import { useRouter } from "next/navigation";
import {format} from 'date-fns';
import Image from 'next/image'

interface ReservationClientProps {
  currentUser: any;
  pendingReservation: any;
}
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const ReservationClient: React.FC<ReservationClientProps> = ({
  currentUser,
  pendingReservation
}) => {;
  const t = useTranslations('Index');
  const router = useRouter();
  const totalPersonas = pendingReservation.adultCount + pendingReservation.childrenCount;
  const [inputValues, setInputValues] = useState(Array(totalPersonas).fill(''));

   // Manejar el cambio en los inputs
   const handleInputChange = (index:  number, value: any) => {
    const newValues = [...inputValues];
    newValues[index] = value;
    setInputValues(newValues);
  };

  const inputs = inputValues.map((value, index) => (
    <input
      key={index}
      type="text"
      value={value}
      onChange={(e) => handleInputChange(index, e.target.value)}
      placeholder={`Nombre de persona ${index + 1}`}
      className="p-2 m-2 border border-gray-300 rounded"
    />
  ));

  const handleSubmit = async () => {
    // Aquí puedes recopilar los datos de inputValues y hacer algo con ellos
    const reservationResponse = await axios.post('http://localhost:3000/api/create-reservation', {
      totalPrice: pendingReservation.totalPrice,
      startDate: new Date(pendingReservation.startDate),
      endDate: new Date(pendingReservation.endDate),
      listingId: pendingReservation.listingId,
      userId: pendingReservation.userId,
      currency: pendingReservation.currency,
      guestNames: inputValues,
    });

    axios.post('/api/email-traveler', {
      data: { language: pendingReservation.language, amount: pendingReservation.totalPrice, userNameTraveler: currentUser.name, userNameHost: pendingReservation.userNameHost, titleListing: pendingReservation.listingTitle, startDate:pendingReservation.startDate, endDate: pendingReservation.endDate},
    });
    axios.post('/api/email-host', {
      data: { language: pendingReservation.language, amount: pendingReservation.totalPrice, userNameTraveler: currentUser.name, userNameHost: pendingReservation.userNameHost, titleListing: pendingReservation.listingTitle, startDate:pendingReservation.startDate, endDate: pendingReservation.endDate },
    });

    router.push('/payment');
    // Luego, realiza la acción deseada, como enviar estos datos a una API
  };

  return (
    <div>
      {/* Renderiza los inputs */}
      {inputs.map(input => input)}
      {/* Botón para aceptar y enviar los datos */}
      <button className="bg-green-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Aceptar</button>
      {/* Resto de tu componente */}
    </div>
  );
};

export default ReservationClient;