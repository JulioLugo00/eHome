import EmptyState from "../../components/EmptyState";
import ClientOnly from "../../components/ClientOnly";

import getCurrentUser from "../../../actions/getCurrentUser";
import getReservations from "../../../actions/getReservations";
import getReservationById from "@/app/actions/getReservationById";
import TripDetailsClient from "./TripDetailsClient";


interface IParams {
    reservationId?: string;
}
  
const TripDetailsPage = async ({ params }: { params: IParams }) => {
    const reservation = await getReservationById(params);
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState 
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        )
    }
    //Comenta esta parte de abajo para que no te de error   
    const reservations = await getReservations({
        userId: currentUser.id
    });

    if(reservations.length == 0){
        return(
            <ClientOnly>
                <EmptyState
                    title="No trips found"
                    subtitle="Looks like you havent reserved any trips"
                />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <TripDetailsClient 
                reservation={reservation}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default TripDetailsPage;