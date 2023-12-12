'use client';

import Container from "@/app/[locale]/components/Container";
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
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";
import Heading from "../../components/Heading";
import ListingCard from "../../components/listings/ListingCard";
import {useTranslations} from 'next-intl';
import { format } from 'date-fns';
import GMap from "../../components/GMap";

interface HostingProps{
    reservation?: SafeReservation | null;
    currentUser?: SafeUser | null;

}

const Hosting: React.FC<HostingProps> =({
    reservation,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
    const t = useTranslations('Index');
    let center = [reservation?.listing.latitude || 0, reservation?.listing.longitude || 0];

    const onCancelReservation = useCallback((id:string) => {
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success(t("reservationCanceled"));
            router.refresh();
        })
        .catch(() => {
            toast.error(t("somethingWentWrong"));
        })
        .finally(() => {
            setDeletingId('');
        })
    }, [router]);


    return(
        <Container>
            <Heading
                title={`Reservación en ${reservation?.listing?.title}`}
                subtitle=""
            />
            <div >
                <h1>ID de la reservación: {reservation?.id}</h1>
                <h1>{reservation?.totalPrice} {reservation?.currency}</h1>
                <h1>{reservation?.startDate && format(new Date(reservation?.startDate), 'PP')} - {reservation?.endDate && format(new Date(reservation?.endDate), 'PP')}</h1>
                <h1>{reservation?.listing?.description}</h1>
                <img src={reservation?.listing?.imageSrc[0]} alt="" height={400} width={400}/>
                <h1>{reservation?.listing?.country}, {reservation?.listing?.state}, {reservation?.listing?.city}</h1>
                <h1>{reservation?.listing?.address}</h1>
                <h1>Número de huespedes: {reservation?.listing?.guestCount}</h1>
                <h1>Número de habitaciones: {reservation?.listing?.roomCount}</h1>
                <h1>Número de baños: {reservation?.listing?.bathroomCount}</h1>
                <h1> longitude: {reservation?.listing?.longitude}</h1>
                <h1> latitude: {reservation?.listing?.latitude}</h1>
       
                {/* Mapa */}

        <GMap center={center} />

</div>
            
        </Container>
    )
}

export default Hosting;