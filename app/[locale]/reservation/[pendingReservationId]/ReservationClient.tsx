'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
//import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import {useTranslations} from 'next-intl';
//import { loadStripe } from "@stripe/stripe-js";
//import {useRouter} from 'next-intl/client';
import { useRouter } from "next/navigation";
import {format} from 'date-fns';
import Image from 'next/image'
import Heading from "../../components/Heading";
import { set } from "lodash";

interface ReservationClientProps {
  currentUser: any;
  pendingReservation: any;
}

const ReservationClient: React.FC<ReservationClientProps> = ({
  currentUser,
  pendingReservation
}) => {;
  const t = useTranslations('Index');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
      placeholder={`${t("namePerson"
        )} ${index + 1}`}
      className="p-2 m-2 border border-gray-300 rounded"
    />
  ));

  const handleSubmit = async () => {
    // Aquí puedes recopilar los datos de inputValues y hacer algo con ellos
    if(!loading){
      setLoading(true);
    
    const groupConversationResponse = await axios.post('/api/conversations', {
      isGroup: true,
      members: [
        { value: pendingReservation.userIdHost },
      ],
      image: pendingReservation.image,
      name: pendingReservation.listingTitle + ' ' + format(new Date(pendingReservation.startDate), 'dd/MM/yyyy') + ' - ' + format(new Date(pendingReservation.endDate), 'dd/MM/yyyy')	
    });

    // Obtener el ID de la conversación de grupo recién creada desde la respuesta
    const conversationId = groupConversationResponse.data.id;
    
    const reservationResponse = await axios.post('http://localhost:3000/api/create-reservation', {
      totalPrice: pendingReservation.totalPrice,
      startDate: new Date(pendingReservation.startDate),
      endDate: new Date(pendingReservation.endDate),
      listingId: pendingReservation.listingId,
      userId: pendingReservation.userId,
      currency: pendingReservation.currency,
      guestNames: inputValues,
      conversationId: conversationId,
    });

    axios.post('/api/email-traveler', {
      data: { language: pendingReservation.language, amount: pendingReservation.totalPrice, userNameTraveler: currentUser.name, userNameHost: pendingReservation.userNameHost, titleListing: pendingReservation.listingTitle, startDate:pendingReservation.startDate, endDate: pendingReservation.endDate},
    });
    axios.post('/api/email-host', {
      data: { language: pendingReservation.language, amount: pendingReservation.totalPrice, userNameTraveler: currentUser.name, userNameHost: pendingReservation.userNameHost, titleListing: pendingReservation.listingTitle, startDate:pendingReservation.startDate, endDate: pendingReservation.endDate },
    });

    router.push('/payment');
    // Luego, realiza la acción deseada, como enviar estos datos a una API
    setLoading(false);
  }
  };

  return (
    <div>
       <Heading
                title={t("titleGuestNames")}
                subtitle={t("subtitleGuestNames")}
            />
      {/* Renderiza los inputs */}
      {inputs.map(input => input)}
      {/* Botón para aceptar y enviar los datos */}
      <button className="bg-green-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Aceptar</button>
      {/* Resto de tu componente */}
    </div>
  );
};

export default ReservationClient;