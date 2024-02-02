import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/[locale]/components/ClientOnly";
import EmptyState from "@/app/[locale]/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";
import getReviewsById from "@/app/actions/getReviewsById";

interface IParams{
    listingId?: string;
}

const ListingPage = async ({params}: {params: IParams}) => {
    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();
    const reviews = await getReviewsById(listing?.id ?? "")


    if(!listing){
        return(
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <ListingClient
                listing={listing}
                reservations={reservations}
                currentUser={currentUser}
                reviews={reviews}
            />
        </ClientOnly>
    );
}

export default ListingPage;