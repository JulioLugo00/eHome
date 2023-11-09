import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../../actions/getCurrentUser";
import PropertiesClient from "./AdminClient";
import getListings from "../../actions/getListings";
import getUsers from "../../actions/getUsers";
import AdminClient from "./AdminClient";



const AdminPage = async () =>{
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

    const users = await getUsers();

    if(users.length == 0){
        return(
            <ClientOnly>
                <EmptyState
                    title="No users found"
                    subtitle="Looks like you have no users"
                />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <AdminClient 
                users={users}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default AdminPage;