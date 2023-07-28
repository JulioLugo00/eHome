'use client';

import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";
import {useRouter} from 'next-intl/client';
import { SafeListing, SafeReservation, SafeUser } from "../../types";
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";

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

    const onCancelProperty = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/listings/${id}`)
        .then(() => {
            toast.success('Listing deleted');
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
            toast.success("Reservation cancelled");
            router.refresh();
        })
        .catch(() => {
            toast.error("Something went wrong");
        })
        .finally(() => {
            setDeletingId('');
        })
    }, [router]);


    return(
        <Container>
            <Heading
                title={`Welcome back, ${currentUser?.name}`}
                subtitle=""
            />

            <Heading 
                title="Properties"
                subtitle="List of your properties"
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
                        actionLabel="Delete property"
                        currentUser={currentUser}
                        deleteColor
                        editAction={() => router.push(`/hosting/listings/${property.id}`)}
                        editLabel="Edit property"
                    />
                ))}
            </div>

            <Heading 
                title="Reservations"
                subtitle="Bookings on your properties"
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
                        actionLabel="Cancel guest reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default Hosting;