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
import ConfirmationModal from "../components/modals/ConfirmationModal";
import { differenceInDays } from "date-fns";
import CreateReviewModal from "../components/modals/CreateReviewModal";

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
    const [reservationId, setReservationId] = useState('');
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    
    const t = useTranslations('Index');

    const handleCancelCancelation = () => {
        // Cierra el modal de confirmación
        setIsConfirmationModalOpen(false);
    };

    const handleConfirmCancelation = (id:string) => {
        // Cierra el modal de confirmación
        setIsConfirmationModalOpen(false);
      
        // Continúa con la cancelación de la reserva
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
    };

    const onCancelReservation = useCallback((id:string, reservation: SafeReservation) => {
        if(reservation?.startDate){
            const date = new Date()
            const startDate = new Date(reservation?.startDate) 
            const daysDifference = differenceInDays(startDate, date);
            if(reservation.confirmed === false){
                toast.error("No se te cobrarán penalizaciones por cancelar la reserva, ya que no ha sido confirmada por el anfitrión.");
            }
            else if(daysDifference < 2){
                toast.error("Se te cobrará una penalización por cancelar la reserva de 50% del total de la reserva. (" + Math.round(reservation.totalPrice * 0.5)  + reservation.currency + " ) ");
            }
            else if (daysDifference < 30){
                toast.error("Se te cobrará una penalización por cancelar la reserva de 25% del total de la reserva. (" + Math.round(reservation.totalPrice * 0.25)  + reservation.currency + " )");
            }
            else{
                toast.success("Se te cobrará una penalización por cancelar la reserva de 10% del total de la reserva. (" + Math.round(reservation.totalPrice * 0.1)  + reservation.currency + " )"); 
            }
        }
        setReservationId(reservation.id);
        setIsConfirmationModalOpen(true); 
    }, [router]);

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

            {isConfirmationModalOpen && (
            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                message="¿Estás seguro de que deseas cancelar la reserva?"
                onConfirm={handleConfirmCancelation}
                onCancel={handleCancelCancelation}
                reservationId={reservationId}
            />
            )}

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
                        onAction={onCancelReservation}
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