'use client';

import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { Listing, Reservation, User } from "@prisma/client";
import {useRouter} from 'next-intl/client';
import { useCallback, useMemo, useState } from "react";
import {format} from 'date-fns';
import Image from 'next/image'
import HeartButton from "../HeartButton";
import Button from "../Button";
import {useTranslations} from 'next-intl';
import { MoneyValue } from "../currency/MoneyValue";
import axios from "axios";
import toast from "react-hot-toast";
import { differenceInDays } from 'date-fns';


interface ListingCardProps{
    currentUser?: SafeUser | null; 
    reservation?: SafeReservation;
    data: SafeListing;
    onAction?: (id:string, reservation:SafeReservation) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    editAction?: () => void;
    editLabel?: string;
    deleteColor?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser,
    editAction,
    editLabel,
    deleteColor
}) => {
    const router = useRouter();
    const {getByValue} = useCountries();
    const t = useTranslations('Index');
    const [botonVisible, setBotonVisible] = useState(true);
    const [currentLocale, setCurrentLocale] = useState("es");
    //const currency = localStorage.getItem("currency");

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if(disabled){
                return;
            }
          
            onAction?.(actionId, reservation as SafeReservation);
        }, [onAction, actionId, disabled]);
        

    let price = useMemo(() => {
        if(reservation){
            return reservation.totalPrice;
        }

        return data.price;
    }, [reservation, data.price]);
    
    let currency = useMemo(() => {
        if(reservation){
            return reservation.currency;
        }

        return localStorage.getItem("currency");
    }, [reservation, data.price]);

    const handleConfirmReservation = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
      
        // Verifica si el botón está deshabilitado
        if (disabled || !reservation || reservation.confirmed) {
          return;
        }

        const updatedReservation = {
            ...reservation,
            confirmed: true
          };
        
      
        // Realiza la llamada a la API para confirmar la reserva
        // Puedes utilizar axios u otra librería para hacer la solicitud PUT
        axios.put('/api/confirmReservation/'+reservation.id)
          .then(async () => {
            // Éxito: Actualización exitosa
            toast.success("Reserva confirmada exitosamente.");
            const response = await axios.post('/api/getUserById', {data: { userId: data.userId },})
            axios.post('/api/email-confirm', {
                data: { language: currentLocale, amount: reservation.totalPrice, userNameTraveler: currentUser?.name, userNameHost: response.data.name, titleListing: data.title, startDate:reservation.startDate, endDate: reservation.endDate},
                });
            setBotonVisible(false); 
            // Puedes realizar alguna acción adicional si es necesario
          })
          .catch((error) => {
            // Manejo de errores
            toast.error("Hubo un error al confirmar la reserva.");
          });
      };

    const reservationDate = useMemo(() => {
        if(!reservation){
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate)
        return `${format(start, 'PP')} - ${format(end, 'PP')}`;

    }, [reservation])

    if(localStorage.getItem("exchangeRates")){
        let change = JSON.parse(localStorage.getItem("exchangeRates")!);
        if(!reservation && currency && change.conversion_rates[currency]){
            price = price * parseInt(change.conversion_rates[currency])
        }
    }

    return(
        <div onClick={() => router.push(`/listings/${data.id}`)} className="
            col-span-1
            cursor-pointer
            group
        ">
            <div className="flex flex-col gap-2 w-full">
                <div className="
                    aspect-square
                    w-full
                    relative
                    overflow-hidden
                    rounded-xl
                ">
                  <Image
                        fill 
                        alt="Listing"
                        src={data.imageSrc[0]}
                        className="object-cover h-full w-full group-hover:scale-110 transition"
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton 
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {data.state}, {data.country}
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate || t(data.category)}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        ${price} {currency} 
                    </div>
                    {!reservation && (
                        <div className="font-light">{t('night')}</div>   
                    )}
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                    {editAction && editLabel && (
                        <Button 
                            disabled={disabled}
                            small
                            label={editLabel}
                            onEdit={editAction}
                        />
                    )}
                </div>
                <div>
                    {onAction && actionLabel && (
                        <Button 
                            disabled={disabled}
                            small
                            label={actionLabel}
                            onClick={handleCancel}
                            deleteColor
                        />
                    )}

{reservation && !reservation.confirmed && botonVisible && (
    <Button
      small
      label="Confirmar Reserva"
      onClick={handleConfirmReservation}
    />
  )}
                </div>
            </div>
        </div>
    )
}

export default ListingCard;