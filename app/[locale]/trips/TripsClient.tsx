'use client';

import { useRouter } from "next/navigation";

import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";
import {useTranslations} from 'next-intl';
import ReservationCard from "../components/listings/ReservationCard";

interface TripsClientProps{
    reservations: SafeReservation[];
    currentUser?: SafeUser|null;
}

const TripsClient: React.FC<TripsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const[deletingId, setDeletingId] = useState('');
    const t = useTranslations('Index');
    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success(t("reservationCanceled"));
            router.refresh();
        })
        .catch((error) =>{
            toast.error(error?.response?.data?.error);
        })
        .finally(() => {
            setDeletingId('');
        })
    }, [router]);
    return (
        <Container>
            <Heading
                title={t("trips")}
                subtitle={t("subtitleTrips")}
            />
            <div className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
            ">
                {reservations.map((reservation) => (
                    <ReservationCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId==reservation.id}
                        actionLabel={t("cancelReservation")}
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default TripsClient;