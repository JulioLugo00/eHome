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


interface ListingCardProps{
    currentUser?: SafeUser | null; 
    reservation?: SafeReservation;
    data: SafeUser;
    onAction?: (id:string) => void;
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
    const t = useTranslations('Index');

    const [carouselClicked, setCarouselClicked] = useState(false);

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if(disabled){
                return;
            }

            onAction?.(actionId);
        }, [onAction, actionId, disabled]);
        

    return(
        <div className="
            col-span-1
            cursor-pointer
            group
        "
        onClick={() => router.push(`/admin/${data.id}`)}
        >
            <div className="flex flex-col gap-2 w-full">
                <div className="
                    aspect-square
                    w-full
                    relative
                    overflow-hidden
                    rounded-xl
                ">
                    <div >
                        <Image 
                        fill
                        alt="Profile"
                        src={data.image || "/images/placeholder.jpg"}
                        className="object-cover h-full w-full group-hover:scale-110 transition"/>
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {data.name}
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

export default ListingCard;