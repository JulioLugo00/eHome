import EmptyState from "../../components/EmptyState";
import ClientOnly from "../../components/ClientOnly";

import getCurrentUser from "../../../actions/getCurrentUser";
import ReservationClient from "./CheckoutClient";
import getPendingReservationById from "@/app/actions/getPendingReservationById";

interface IParams {
    pendingReservationId?: string;
}

const CheckoutPage = async ({ params }: { params: IParams }) => {
    const pendingReservation = await getPendingReservationById(params);
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

    return(
        <ClientOnly>
            <ReservationClient
                currentUser={currentUser}
                pendingReservation={pendingReservation}
            />
        </ClientOnly>
    )
}

export default CheckoutPage;