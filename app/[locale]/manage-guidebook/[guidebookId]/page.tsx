import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/[locale]/components/ClientOnly";
import EmptyState from "@/app/[locale]/components/EmptyState";

import ManageGuidebookClientId from "./ManageGuidebookClientId";
import getGuidebook from "@/app/actions/getGuidebook";
import getPlaces from "@/app/actions/getPlaces";
import getZones from "@/app/actions/getZones";
import getTowns from "@/app/actions/getTowns";
import getAdvices from "@/app/actions/getAdvices";

interface IParams{
    guidebookId?: string;
}


const ManageGuidebookId = async ({params}: {params: IParams}) => {
    const currentUser = await getCurrentUser();
    const guidebook = await getGuidebook(params);
    const places = await getPlaces(params.guidebookId || '');
    const zones = await getZones(params.guidebookId || '');
    const towns = await getTowns(params.guidebookId || '');
    const advices = await getAdvices(params.guidebookId || '');


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
            <ManageGuidebookClientId
                currentUser={currentUser} guidebook={guidebook}
                places={places} zones={zones} towns={towns} advices={advices}        
             />
        </ClientOnly>
    );
}

export default ManageGuidebookId;