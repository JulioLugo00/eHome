'use client';

import {Range} from 'react-date-range';
import Calendar from '../inputs/Calendar';
import { MoneyValue } from '../currency/MoneyValue';
import {useTranslations} from 'next-intl';

import React, { useEffect, useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from 'axios';
import { toast } from "react-hot-toast";
import { SafeUser } from '@/app/types';
import Button from '../Button';

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface ListingReservationProps{
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    clean: boolean;
    disabled?: boolean;
    disabledDates: Date[];
    listing: any;
    userTraveler: SafeUser | null;
    image: string;
    userHost: SafeUser
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    dateRange,
    totalPrice,
    clean,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates,
    listing,
    userTraveler,
    image,
    userHost
}) => {

    let tarifaServicio = (totalPrice*16.3/100);
    let tarifaClean = totalPrice*10/100
    let total = totalPrice + tarifaServicio;
    let Clean = (<div></div>);
    const t = useTranslations('Index');
    const currency = localStorage.getItem("currency");
    const [currentLocale, setCurrentLocale] = useState("es");

    useEffect(() => {
      // Check to see if this is a redirect back from Checkout
      const query = new URLSearchParams(window.location.search);
      if (query.get('success')) {

          toast.success(t('reservationCreated'));
      }
  }, []);
/*
    useEffect(() => {
      // Check to see if this is a redirect back from Checkout
      const query = new URLSearchParams(window.location.search);
      if (query.get('success')) {
        console.log('Order placed! You will receive an email confirmation.');
      }
  
      if (query.get('canceled')) {
        console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
      }
    }, []);
*/
    useEffect(() => {
        const extractedLocale = window.location.pathname.split('/')[1];
        const validLocales = ["es", "en"];
        if (validLocales.includes(extractedLocale)) {
            setCurrentLocale(extractedLocale);
        }
    }, []);
    
    function PaymentForm({ totalPrice }: { totalPrice: number }) {
        const stripe = useStripe();
        const elements = useElements();
      
        const onSubmitPayment = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const cardElement = elements?.getElement("card");
      
          try {
            if (!stripe || !cardElement) return null;
            let currency =  localStorage.getItem("currency")!
            const { data } = await axios.post("/api/create-payment-intent", {
              data: { amount: totalPrice, currency: currency },
            });
            const clientSecret = data;
      
            const paymentResult = await stripe?.confirmCardPayment(clientSecret, {
              payment_method: { card: cardElement },
            });
            if (paymentResult?.paymentIntent && paymentResult?.paymentIntent.status === "succeeded") {
                onSubmit();
                
                axios.post('/api/email-traveler', {
                    data: { language: currentLocale, amount: totalPrice, userNameTraveler: userTraveler?.name, userNameHost: userHost.name, titleListing: listing.title, startDate:dateRange.startDate, endDate: dateRange.endDate, image: image },
                });
                axios.post('/api/email-host', {
                    data: { language: currentLocale, amount: totalPrice, userNameTraveler: userTraveler?.name, userNameHost: userHost.name, titleListing: listing.title, startDate:dateRange.startDate, endDate: dateRange.endDate, image: image },
                });

            } else {
                toast.error(t("failedPayment"));
                // Aquí puedes manejar errores adicionales si lo necesitas
            }
          } catch (error) {
          }
        };
      
          return (
            <form onSubmit={onSubmitPayment} className="pt-3 mx-10">
              <CardElement />
              <button className='
                relative
                disabled:opacity-70
                disabled:cursor-not-allowed
                rounded-lg
                hover:opacity-80
                transition
                w-full
                bg-green-500
                border-green-500
                py-3
                text-md
                font-semibold
                border-2
                text-white
                ' type="submit">{t('reserve')}</button>
            </form>
    );  }
    
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
        
           
        
            // Crear la reserva pendiente
            const response = await fetch('/api/createPendingReservation', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId: userTraveler?.id, // ID del usuario
                listingId: listing.id,
                startDate: dateRange.startDate, // Fecha de inicio
                endDate: dateRange.endDate, // Fecha de finalización
                totalPrice: Math.round(total),
                userNameHost: userHost.name, // Nombre del anfitrión
                currency: currency
              }),
            });
        
            if (!response.ok) {
              // Manejar el error
              console.error('Error al crear la reserva pendiente');
              return;
            }
        
            const pendingReservation = await response.json();
            const pendingReservationId = pendingReservation.id;

            // Configurar el formulario para enviar a Stripe
            const formData = new FormData();
            formData.append('amount', String(Math.round(total)));
            formData.append('startDate', String(dateRange.startDate));
            formData.append('endDate', String(dateRange.endDate));
            formData.append('amount', String(Math.round(total)));
            formData.append('currency', currency ?? '');
            formData.append('title', listing.title ?? '');
            formData.append('listingId', String(listing.id) ?? '');
            formData.append('pendingReservationId', pendingReservationId ?? '');
            formData.append('userNameHost', userHost.name ?? '');
            formData.append('userNameTraveler', userTraveler?.name ?? '');
            formData.append('language', currentLocale);

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
                {t('reserve')}
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

    if(localStorage.getItem("exchangeRates")){
        let change = JSON.parse(localStorage.getItem("exchangeRates")!);
        let moneda =  localStorage.getItem("currency")!
        total = total * parseInt(change.conversion_rates[moneda])
        tarifaServicio = tarifaServicio * parseInt(change.conversion_rates[moneda])
        tarifaClean = tarifaClean * parseInt(change.conversion_rates[moneda])
        totalPrice = totalPrice * parseInt(change.conversion_rates[moneda])
        price = price *  parseInt(change.conversion_rates[moneda])
    }

    if(clean) {
        Clean = (
            <div className="
            p-4
            flex
            flex-row
            items-center
            justify-between
            text-md
            underline
            text-neutral-500
        ">
            <div>{t('cleaningFee')}</div>
            <MoneyValue value={tarifaClean} currency={currency ? currency : "USD"} decimals={1}/>
        </div>)
        total = total + tarifaClean;
    }

    return(
        <div className="
            bg-white
            rounded-xl
            border-[1px]
            border-neutral-200
            overflow-hidden
        ">
            <div className="flex flex-row items-center gap-1 p-4">
                <div className="text-2xl font-semibold">
                    <MoneyValue value={price} currency={currency ? currency : "USD"} decimals={1}/>
                </div>
                <div className="font-light text-neutral-600">
                    {t('night')}
                </div>
            </div>
            <hr />
            <Calendar 
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => onChangeDate(value.selection)}
            />
            <hr />
            <div className="p-4">
            <PaymentForm2/>
                 {/*<Button 
                    disabled={disabled}
                    label={t('reserve')}
                    onClick={onSubmit}
                />
    */}
            </div>
            <hr/>
            {/*<div className="order-last md:order-first md:col-span-3 p-4">
            <Elements stripe={stripePromise}>
              <PaymentForm totalPrice={totalPrice}/>
            </Elements> 
            
     
            </div>
            */}

            {Clean}
            <div className="
                p-4
                flex
                flex-row
                items-center
                justify-between
                text-md
                underline
                text-neutral-500
            ">
                <div>{t('eHomeFee')}</div>
                <MoneyValue value={tarifaServicio} currency={currency ? currency : "USD"} decimals={1}/>
            </div>

            <div className="
                p-4
                flex
                flex-row
                items-center
                justify-between
                font-semibold
                text-lg
            ">
                <div>
                    {t('total')}
                </div>
                <div>
                    <MoneyValue value={total} currency={currency ? currency : "USD"} decimals={1}/>
                </div>
            </div>
          
        </div>
    )
}

export default ListingReservation;