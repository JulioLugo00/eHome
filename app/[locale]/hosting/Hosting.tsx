'use client';

import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";
import {useRouter} from 'next-intl/client';
import { SafeListing, SafeReservation, SafeUser } from "../../types";
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import {useTranslations} from 'next-intl';
import { differenceInDays } from "date-fns";
import ConfirmationModal from "../components/modals/ConfirmationModal";

interface HostingProps{
    reservations: SafeReservation[];
    properties: SafeListing[];
    currentUser?: SafeUser | null;
}

const Hosting: React.FC<HostingProps> =({
    reservations,
    properties,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
    const t = useTranslations('Index');
    const [reservationId, setReservationId] = useState('');
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const onCancelProperty = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/listings/${id}`)
        .then(() => {
            toast.success(t("propertyDeleted"));
            router.refresh();
        })
        .catch((error) =>{
            toast.error(error?.response?.data?.error);
        })
        .finally(() => {
            setDeletingId('');
        })
    }, [router]);

    const onEditProperty = () => {};

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

    const handleConfirmCancel = (id:string) => {
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

      const handleCancelCancel = () => {
        // Cierra el modal de confirmación
        setIsConfirmationModalOpen(false);
      };

    return(
        <Container>
            <Heading
                title={`${t("welcomeBack")}, ${currentUser?.name}`}
                subtitle=""
            />

            <Heading 
                title={t("properties")}
                subtitle={t("listProperties")}
            />

            <div className="
                mt-5
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
                mb-10
            ">
                {properties.map((property) => (
                    <ListingCard 
                        key={property.id}
                        data={property}
                        actionId={property.id}
                        onAction={onCancelProperty}
                        disabled={deletingId==property.id}
                        actionLabel={t("deleteProperty")}
                        currentUser={currentUser}
                        deleteColor
                        editAction={() => router.push(`/hosting/listings/${property.id}`)}
                        editLabel={t("editProperty")}
                    />
                ))}
            </div>

            <Heading 
                title={t("reservations")}
                subtitle={t("bookingsOnProperties")}
            />

            <div className="
                mt-5
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-5
                gap-8
                mb-10
            ">
                {reservations.map((reservation) =>(
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancelReservation}
                        disabled={deletingId == reservation.id}
                        actionLabel={t("cancelGuestReservation")}
                        currentUser={currentUser}
                    />
                ))}
                {isConfirmationModalOpen && (
        <ConfirmationModal
            isOpen={isConfirmationModalOpen}
            message="¿Estás seguro de que deseas cancelar la reserva?"
            onConfirm={handleConfirmCancel}
            onCancel={handleCancelCancel}
            reservationId={reservationId}
        />
    )}

            </div>
        </Container>
    )
}

export default Hosting;