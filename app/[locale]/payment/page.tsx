import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../../actions/getCurrentUser";
import PaymentClient from "./PaymentClient";
import axios from "axios";


const PaymentPage = async () =>{ 
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
            <PaymentClient 
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default PaymentPage;