'use client';

import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { Listing, Reservation, User } from "@prisma/client";
import {useRouter} from 'next-intl/client';
import { useCallback, useMemo } from "react";
import {format} from 'date-fns';
import Image from 'next/image'
import HeartButton from "../HeartButton";
import Button from "../Button";
import {useTranslations} from 'next-intl';
import { MoneyValue } from "../currency/MoneyValue";


interface ReservationCardProps{
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

const ReservationCard: React.FC<ReservationCardProps> = ({
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
        <div onClick={() => router.push(`/trips/${reservation?.id}`)} className="
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
                </div>
            </div>
        </div>
    )
}

export default ReservationCard;