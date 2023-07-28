import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../../actions/getCurrentUser";
import getReservations from "../../actions/getReservations";
import Cli from "@angular/cli";
import getListings from "@/app/actions/getListings";
import Hosting from "./Hosting";

const HostingPage = async () =>{
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

    const listings = await getListings({
        userId: currentUser.id
    });

    if(listings.length == 0){
        return(
            <ClientOnly>
                <EmptyState
                    title="You don't have properties"
                    subtitle="Please create a property"
                />
            </ClientOnly>
        )
    }

    const properties = await getListings({
        userId: currentUser.id
    });

    const reservations = await getReservations({
        authorId: currentUser.id
    });

    
    return(
        <ClientOnly>
            <Hosting 
                reservations={reservations}
                properties={properties}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}

export default HostingPage;