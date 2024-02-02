import getConversationById from "@/app/actions/getConversationsById";
import getMessages from "@/app/actions/getMessages";

import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";
import EmptyStateChat from "../../components/EmptyStateChat";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ConversationList from "../components/ConversationList";
import getConversations from "@/app/actions/getConversations";
import getUsers from "@/app/actions/getUsers";

interface IParams {
  conversationId: string;
}

const ChatId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);
  const currentUser = await getCurrentUser();
  const conversations = await getConversations();
  const users = await getUsers();
  

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyStateChat />
        </div>
      </div>
    )
  }

  return ( <div>
    
    <div>
  <ConversationList users={users}initialItems={conversations} currentUser={currentUser} />
    </div>
    <div className="lg:pl-80 h-full">
      
      <div className="h-full flex flex-col">
      
        <Header conversation={conversation} currentUser={currentUser}/>
        <Body  initialMessages={messages}  currentUser={currentUser}/>
        <Form  />
       
      </div>
    </div>
    
  </div>
  );
}

export default ChatId;