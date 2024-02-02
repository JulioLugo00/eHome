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
import Heading from "../../components/Heading";
import { set } from "lodash";

interface CheckoutClientProps {
  currentUser: any;
  pendingReservation: any;
}
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CheckoutClient: React.FC<CheckoutClientProps> = ({
  currentUser,
  pendingReservation
}) => {;
  const t = useTranslations('Index');
  const router = useRouter();
  const totalPersonas = pendingReservation.adultCount + pendingReservation.childrenCount;
  const [inputValues, setInputValues] = useState(Array(totalPersonas).fill(''));

  const [adultCount, setAdultCount] = useState(pendingReservation.adultCount);
const [childrenCount, setChildrenCount] = useState(pendingReservation.childrenCount);

const handleAdultCountChange = (event: { target: { value: string; }; }) => {
  const newAdultCount = parseInt(event.target.value, 10);
  setAdultCount(newAdultCount);
};

const handleChildrenCountChange = (event: { target: { value: string; }; }) => {
  const newChildrenCount = parseInt(event.target.value, 10);
  setChildrenCount(newChildrenCount);
};

const handleUpdateCounts = () => {

  if(adultCount + childrenCount > pendingReservation.guestCount){

    toast.error(t("tooManyGuests"));
    setAdultCount(pendingReservation.adultCount);
    setChildrenCount(pendingReservation.childrenCount);
    return;
  } 

  const updatedReservation = {
    ...pendingReservation,
    adultCount: adultCount,
    childrenCount: childrenCount,
  };

  axios
    .put('/api/pendingReservations/'+pendingReservation.id, updatedReservation)
    .then(() => {
      toast.success("Cantidad actualizada!");
      router.refresh();
      // Realiza cualquier acción adicional que desees después de actualizar los recuentos.
    })
    .catch(() => {
      toast.error("Something went wrong");
    });
};
  const onSave = (data:any, index?: number) => {
    axios.put('/api/pendingReservation/'+pendingReservation.id, data)
    .then(() => {
        toast.success('Property Updated!');
        router.refresh();
        //reset();
        //if(index || index == 0){
        //    handleInputEditClick(index);
        //}
    })
    .catch(() => {
        toast.error('Something went wrong')
    })
}

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

   function PaymentForm2() {
/*
        useEffect(() => {
            // Check to see if this is a redirect back from Checkout
            const query = new URLSearchParams(window.location.search);
            if (query.get('success')) {
              console.log('Order placed! You will receive an email confirmation.');
              onSubmit();
              axios.post('/api/email-traveler', {
                data: { language: currentLocale, amount: totalPrice, userNameTraveler: userTraveler?.name, userNameHost: userHost.name, titleListing: listing.title, startDate:dateRange.startDate, endDate: dateRange.endDate, image: image },
                });
            axios.post('/api/email-host', {
                data: { language: currentLocale, amount: totalPrice, userNameTraveler: userTraveler?.name, userNameHost: userHost.name, titleListing: listing.title, startDate:dateRange.startDate, endDate: dateRange.endDate, image: image },
            });
            }
        
            if (query.get('canceled')) {
              console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
            }
          }, []);
  */
 /*      
          return (
            <form action="/api/checkout_sessions" method="POST">
              <section>
              <input type="hidden" name="amount" value={total} />
                    <input type="hidden" name="currency" value={currency ?? ''} />
                    <input type="hidden" name="title" value={listing.title} />
                    <input type="hidden" name="listingId" value={listing.id} />
                    <button type="submit" role="link">
                        Checkout
                    </button>
                </section>
                <style jsx>
                    {`
                  section {
                    background: #ffffff;
                    display: flex;
                    flex-direction: column;
                    width: 400px;
                    height: 112px;
                    border-radius: 6px;
                    justify-content: space-between;
                  }
                  button {
                    height: 36px;
                    background: #556cd6;
                    border-radius: 4px;
                    color: white;
                    border: 0;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
                  }
                  button:hover {
                    opacity: 0.8;
                  }
                `}
              </style>
            </form>
          );*/

          const handleSubmit = async (event: { preventDefault: () => void; }) => {
            event.preventDefault();
        
            const pendingReservationId = pendingReservation.id;

            // Configurar el formulario para enviar a Stripe
            const formData = new FormData();
            formData.append('amount', String(Math.round(pendingReservation.totalPrice)));
            formData.append('adultCount', String(Math.round(pendingReservation.adultCount)));
            formData.append('childrenCount', String(Math.round(pendingReservation.childrenCount)));
            formData.append('startDate', String(pendingReservation.startDate));
            formData.append('endDate', String(pendingReservation.endDate));

            formData.append('currency', pendingReservation.currency ?? '');
            formData.append('title', pendingReservation.listingTitle ?? '');
            formData.append('listingId', String(pendingReservation.listingId) ?? '');
            formData.append('pendingReservationId', pendingReservationId ?? '');
            formData.append('userNameHost', pendingReservation.userNameHost ?? '');
            formData.append('userNameTraveler', currentUser.name ?? '');
            formData.append('language', pendingReservation.language ?? '');
  


            // Crear un formulario temporal y enviarlo
            const form = document.createElement('form');
            form.action = '/api/checkout_sessions';
            form.method = 'POST';
            document.body.appendChild(form);
            formData.forEach((value, key) => {
              const input = document.createElement('input');
              input.type = 'hidden';
              input.name = key;
              input.value = typeof value === 'string' ? value : JSON.stringify(value);
              form.appendChild(input);
            });
            form.submit();
          };
        
          return (
            <form onSubmit={handleSubmit}>
              <section>
                <button type="submit" role="link">
                Realizar pago de reserva
                </button>
              </section>
              <style jsx>
                {`
                  section {
                    background: #ffffff;
                    display: flex;
                    flex-direction: column;
                    w-full
                    height: 40px;
                    border-radius: 6px;
                    justify-content: space-between;
                  }
                  button {
                    height: 36px;
                    width: 400px;
                    background: #556cd6;
                    border-radius: 4px;
                    color: white;
                    border: 0;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
                  }
                  button:hover {
                    opacity: 0.8;
                  }
                `}
              </style>
            </form>
          );
    }
    /*

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
*/

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
       <Heading
                title={"Confirmar datos"}
                subtitle={"Por favor, confirme los datos de su reservación"}
            />
      <h1>{pendingReservation.listingTitle}</h1>
      <h1>El nombre del anfitrión es {pendingReservation.userNameHost}</h1>
      <h1>{format(new Date(pendingReservation.startDate), 'PP')} - {format(new Date(pendingReservation.endDate), 'PP')}</h1>
    
      
    
      <h1>Costo total: {pendingReservation.totalPrice} {pendingReservation.currency}</h1>
      <h1>Cantidad de adultos</h1>
      <input
        type="number"
        value={adultCount}
        onChange={handleAdultCountChange}
        placeholder="Cantidad de adultos"
        className="p-2 m-2 border border-gray-300 rounded"
      />
  <h1>Cantidad de niños</h1>
      <input
        type="number"
        value={childrenCount}
        onChange={handleChildrenCountChange}
        placeholder="Cantidad de niños"
        className="p-2 m-2 border border-gray-300 rounded"
      />

<button
        type="button"
        onClick={() => handleUpdateCounts()} // Asegúrate de llamar a la función correspondiente
        style={{
          backgroundColor: "green", // Establece el color de fondo a verde
          borderRadius: "8px", // Establece las esquinas redondeadas
          color: "white", // Establece el color del texto en blanco
          padding: "10px 20px", // Ajusta el espacio interno del botón
          cursor: "pointer", // Cambia el cursor al estilo "pointer" al pasar el ratón
        }}
      >
        Actualizar cantidad de huéspedes
      </button>


        {/* Resto de tu componente */}
        <hr />
        <hr />
        <hr />
      <PaymentForm2/>
    </div>
  );
};

export default CheckoutClient;