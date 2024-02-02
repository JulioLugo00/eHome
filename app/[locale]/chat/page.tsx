import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../../actions/getCurrentUser";
import ChatClient from "./ChatClient";
import axios from "axios";
import getUsers from "@/app/actions/getUsers";


const ChatPage = async () =>{ 
    const currentUser = await getCurrentUser();
    const users = await getUsers();
    
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
            <ChatClient
                currentUser={currentUser}
                users={users}

            />
        </ClientOnly>
    )
}

export default ChatPage;