import EmptyState from "../../components/EmptyState";
import ClientOnly from "../../components/ClientOnly";

import getCurrentUser from "../../../actions/getCurrentUser";
import PropertiesClient from "./../AdminClient";
import getListings from "../../../actions/getListings";
import getUsers from "../../../actions/getUsers";
import AdminClient from "./../AdminClient";
import AdminClientUser from "./AdminClientUser";
import getUserById from "@/app/actions/getUserById";
import getReservations from "@/app/actions/getReservations";


interface IParams {
    userId?: string;
  }
  
  const AdminClientUserPage = async ({ params }: { params: IParams }) => {
    const user = await getUserById(params);
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

    if(!user){
        return(
            <ClientOnly>
                <EmptyState 
                    title="No user found"
                    subtitle="Looks like this user doesn't exist"
                />
            </ClientOnly>
        )
    }

    const listings = await getListings({
        userId: user.id
    });

    const reservations = await getReservations({
        userId: user.id
    });

    if(listings.length == 0 || reservations.length == 0){
        return(
            <ClientOnly>
                <EmptyState
                    title="No listings or reservations found"
                    subtitle="Looks like this user doesn't have listings or reservations"
                />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <AdminClientUser 
                reservations={reservations}
                properties={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default AdminClientUserPage;