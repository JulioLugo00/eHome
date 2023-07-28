import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/[locale]/components/ClientOnly";
import EmptyState from "@/app/[locale]/components/EmptyState";
import getReservations from "@/app/actions/getReservations";
import EditDetails from "./EditDetails";

interface IParams{
    listingId?: string;
}

const DetailsPage = async ({params}: {params: IParams}) => {
    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();


    if(!listing){
        return(
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <EditDetails
                listing={listing}
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}

export default DetailsPage;