import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../../actions/getCurrentUser";
import getUsers from "@/app/actions/getUsers";
import ConversationClient from "./ConversationClient";
import getConversations from "@/app/actions/getConversations";
import useConversation from "@/app/hooks/useConversation";


const ConversationPage = async () =>{ 
    const currentUser = await getCurrentUser();
    const users = await getUsers();
    const conversation = await getConversations();

    console.log(users, '&TEST_USERS in ConversationPage')

  
    
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
      <ConversationClient
          currentUser={currentUser}
          conversations={conversation}
          users={users}

      />
  </ClientOnly>
    )
}

export default ConversationPage;