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
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from "date-fns";
import {useRouter} from 'next-intl/client';
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";
import Heading from "../../components/Heading";
import ListingCard from "../../components/listings/ListingCard";
import {useTranslations} from 'next-intl';
import { format } from 'date-fns';
import GMap from "../../components/GMap";
import useCreateReviewModal from "@/app/hooks/useCreateReviewModal";
import CreateReviewModal from "../../components/modals/CreateReviewModal";
import ConfirmationModal from "../../components/modals/ConfirmationModal";

interface HostingProps{
    reservation?: SafeReservation | null;
    currentUser?: SafeUser | null;
}

const Hosting: React.FC<HostingProps> =({
    reservation,
    currentUser
}) => {
    const router = useRouter();
    const t = useTranslations('Index');
    const createReviewModal = useCreateReviewModal();
    const [isCreateReviewModalOpen, setIsCreateReviewModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const handleGoToConversation = () => {
        if (reservation) {
          router.push(`/conversations/${reservation.conversationId}`);
        }
      };

    const handleCancelCreateReview = () => {
        // Cierra el modal de crear reseña
        setIsCreateReviewModalOpen(false);
    };

    const handleCancelCancelation = () => {
        // Cierra el modal de confirmación
        setIsConfirmationModalOpen(false);
    };


    const onCancelReservation = useCallback(( ) => {
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
        
        setIsConfirmationModalOpen(true); 
    }, [router]);


    const handleConfirmCancelation = (id:string) => {
        // Cierra el modal de confirmación
        setIsConfirmationModalOpen(false);
      
        // Continúa con la cancelación de la reserva
        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success(t("reservationCanceled"));
            router.push('/trips');
            router.refresh();
        })
        .catch(() => {
            toast.error(t("somethingWentWrong"));
        })
    };


    const handleConfirmCreateReview = async (reviewCount: number, textCount: string) => {
        try {
            const response = await axios.post('/api/create-review', {
                userId: currentUser?.id, // Proporciona el ID del usuario
                listingId: reservation?.listingId, // Proporciona el ID de la lista
                body: textCount, // Proporciona el texto de la reseña
                rating: reviewCount, // Proporciona la calificación
            });
            
            await axios.post("/api/update-isReviewed", {
                data: { reservationId: reservation?.id},
                });
    
            setIsCreateReviewModalOpen(false);
            router.refresh();
            // handle response...
        } catch (error) {
            // handle error...
        }
    }

    /*
    const onCancelReservation = useCallback(() => {
        if(!reservation || !reservation.id){
            return;
        }

        axios.delete(`/api/reservations/${reservation.id}`)
        .then(() => {
            toast.success(t("reservationCanceled"));
            router.push('/trips');
            router.refresh();
        })
        .catch(() => {
            toast.error(t("somethingWentWrong"));
        })
        
    }, [router]);
    */
     
    const onCreateReviewModal = useCallback(() => {
        setIsCreateReviewModalOpen(true);
    }, [ createReviewModal]);

    return(
        <Container>
            {  isCreateReviewModalOpen && (
            <CreateReviewModal
                isOpen={isCreateReviewModalOpen}
                onConfirm={handleConfirmCreateReview}
                onCancel={handleCancelCreateReview}
                reservationId={reservation?.id ?? ''}
            />
            )}

            {isConfirmationModalOpen && (
            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                message="¿Estás seguro de que deseas cancelar la reserva?"
                onConfirm={handleConfirmCancelation}
                onCancel={handleCancelCancelation}
                reservationId={reservation?.id ?? ''}
            />
            )}
                <div style={{ display: 'flex', flexDirection: 'row'}}>
                    <div className={"lg:w-1/2"}style={{  overflowY: 'auto' }}>
                        <Heading
                            title={`Reservación en ${reservation?.listing?.title}`}
                            subtitle=""
                        />
                        <div >
                            <h1><strong>{t("id_reservation")}: </strong>{reservation?.id}</h1>
                            <h1><strong>{t("cost")}: </strong>{reservation?.totalPrice} {reservation?.currency}</h1>
                            <h1><strong>{t("dateReservation")}: </strong>{reservation?.startDate && format(new Date(reservation?.startDate), 'PP')} - {reservation?.endDate && format(new Date(reservation?.endDate), 'PP')}</h1>
                            <h1><strong>{t("descriptionProperty")}: </strong>{reservation?.listing?.description}</h1>
                            <img src={reservation?.listing?.imageSrc[0]} alt="" height={400} width={400} style={{
                                border: '1px solid #ddd', // Borde gris claro
                                borderRadius: '8px', // Bordes redondeados
                            }}/>
                            
                            <h1><strong>{t("number_of_guests")}: </strong>{reservation?.listing?.guestCount}</h1>
                            <h1><strong>{t("number_of_rooms")}: </strong>{reservation?.listing?.roomCount}</h1>
                            <h1><strong>{t("number_of_bathrooms")}: </strong>{reservation?.listing?.bathroomCount}</h1>
                            <h1><strong>{t("longitude")}: </strong>{reservation?.listing?.longitude}</h1>
                            <h1><strong>{t("latitude")}: </strong>{reservation?.listing?.latitude}</h1>
                            <h1>{reservation?.listing?.country}, {reservation?.listing?.state}, {reservation?.listing?.city}</h1>
                            <h1>{reservation?.listing?.address}</h1>

                            <button style={{
                                backgroundColor: "green", // Establece el color de fondo a verde
                                borderRadius: "8px", // Establece las esquinas redondeadas
                                color: "white", // Establece el color del texto en blanco
                                padding: "10px 20px", // Ajusta el espacio interno del botón
                                cursor: "pointer", // Cambia el cursor al estilo "pointer" al pasar el ratón
                                marginRight: "10px",
                            }} onClick={handleGoToConversation}>{t("go_to_conversation")}</button>

                            {!reservation?.isReviewed &&  
                                <button style={{
                                    backgroundColor: "green", // Establece el color de fondo a verde
                                    borderRadius: "8px", // Establece las esquinas redondeadas
                                    color: "white", // Establece el color del texto en blanco
                                    padding: "10px 20px", // Ajusta el espacio interno del botón
                                    cursor: "pointer", // Cambia el cursor al estilo "pointer" al pasar el ratón
                                    paddingLeft: "20px",
                                }} onClick={onCreateReviewModal}>{"Crear reseña"}</button>
                            }
                            <div>
                                <button style={{
                                    backgroundColor: "red", // Establece el color de fondo a verde
                                    borderRadius: "8px", // Establece las esquinas redondeadas
                                    color: "white", // Establece el color del texto en blanco
                                    padding: "10px 20px", // Ajusta el espacio interno del botón
                                    cursor: "pointer", // Cambia el cursor al estilo "pointer" al pasar el ratón
                                    marginRight: "10px",
                                    marginTop: "10px",
                                }} onClick={onCancelReservation}>{t("cancelReservation")}</button>
                            </div>
                        </div>

                    </div>
                    {/* Es necesario especificar el tamaño del gmap para que se muestre correctamente, tambien posiblemente position ya sea fixed, relative o absolute */}
                    <div className="hidden lg:block" style={{ width: '50%', position: 'fixed', right: 0, top: 0, bottom: 0, overflowY: 'auto' }}> {/* Ajusta el ancho según sea necesario */}
                        {/* Componente del mapa, ocupando toda la altura de la pantalla */}
                        <GMap center={[reservation?.listing.latitude || 0, reservation?.listing.longitude || 0]} />
                    </div>
                </div>
                <div className="block lg:hidden w-full" style={{ height: '300px', position: 'relative' }}>
                <GMap center={[reservation?.listing.latitude || 0, reservation?.listing.longitude || 0]} />
    </div>
        </Container>
    )
}

export default Hosting;