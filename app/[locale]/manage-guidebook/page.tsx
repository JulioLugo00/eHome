import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/[locale]/components/ClientOnly";
import EmptyState from "@/app/[locale]/components/EmptyState";

import ManageGuidebookClient from "./ManageGuidebookClient";
import getGuidebooksByUser from "@/app/actions/getGuidebooksByUser";



const ManageGuidebook = async () => {
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
    const guidebooks = await getGuidebooksByUser(currentUser?.id);

    return(
        <ClientOnly>
            <ManageGuidebookClient
                currentUser={currentUser}
                guidebooks={guidebooks}
            />
        </ClientOnly>
    );
}

export default ManageGuidebook;