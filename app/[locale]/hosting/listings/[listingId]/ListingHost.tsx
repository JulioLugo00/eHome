'use client';

import Container from "@/app/[locale]/components/Container";
import Heading from "@/app/[locale]/components/Heading";
import SubHeading from "@/app/[locale]/components/SubHeading";
import ListingHead from "@/app/[locale]/components/listings/ListingHead";
import ListingInfo from "@/app/[locale]/components/listings/ListingInfo";
import ListingReservation from "@/app/[locale]/components/listings/ListingReservation";
import { categories } from "@/app/[locale]/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import {useRouter} from 'next-intl/client';
import Link from "next-intl/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface ListingHostProps{
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser: SafeUser | null;
}

const ListingHost: React.FC<ListingHostProps> = ({
    listing,
    reservations = [],
    currentUser
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const disableDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });

            dates = [...dates, ...range];
        });

        return dates;
    }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const onCreateReservation = useCallback(() => {
        if(!currentUser){
            return loginModal.onOpen();
        }

        setIsLoading(true);

        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        }).then(() => {
            toast.success('Property reserved!');
            setDateRange(initialDateRange);
            router.push('/trips')
        }).catch(() => {
            toast.error('Something went wrong');
        }).finally(() => {
            setIsLoading(false);
        })
    }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

    useEffect(() => {
        if(dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);
            if(dayCount && listing.price){
                setTotalPrice(dayCount * listing.price);
            }else{
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);

    const category = useMemo(() => {
        return categories.find((item) => item.label == listing.category);
    }, [listing.category]);

    return(
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead 
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <hr/>
                    <div className="flex flex-row justify-between items-center">
                        <SubHeading 
                            title="Información del alojamiento"
                        />
                        <div onClick={() => router.push(`/hosting/listings/${listing.id}/details`)} className="hidden underline md:block text-sm font-semibold py-1 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                            Editar
                        </div>
                    </div>
                    <hr/>
                    <div className="flex flex-row justify-between items-center">
                        <SubHeading 
                            title="Precios y disponibilidad"
                        />
                        <Link href={`/hosting/listings/${listing.id}/pricing`}>
                            <div className="hidden underline md:block text-sm font-semibold py-1 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                                Editar
                            </div>
                        </Link>
                    </div>
                    <hr/>
                    <div className="flex flex-row justify-between items-center">
                        <SubHeading 
                            title="Politícas y Reglas"
                        />
                        <Link href={`/hosting/listings/${listing.id}/rules`}>
                            <div className="hidden underline md:block text-sm font-semibold py-1 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                                Editar
                            </div>
                        </Link>
                    </div>
                    <hr/>
                    <div className="flex flex-row justify-between items-center">
                        <SubHeading 
                            title="Información para los huéspedes"
                        />
                        <Link href={`/hosting/listings/${listing.id}/info-guests`}>
                            <div className="hidden underline md:block text-sm font-semibold py-1 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                                Editar
                            </div>
                        </Link>
                    </div>
                    <hr/>
                    <div className="flex flex-row justify-between items-center">
                        <SubHeading 
                            title="Coanfitriones"
                        />
                        <Link href={`/hosting/listings/${listing.id}/co-hosts`}>
                            <div className="hidden underline md:block text-sm font-semibold py-1 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                                Editar
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default ListingHost;