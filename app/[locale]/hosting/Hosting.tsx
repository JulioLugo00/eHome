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
            </div>
        </Container>
    )
}

export default Hosting;