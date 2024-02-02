import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";

const useOtherUser = (conversation: FullConversationType | { users: User[] }, currentUser: any) => {

  const otherUser = useMemo(() => {
    const otherUser = conversation.users.filter((user) => user.email !== currentUser.email);
    return otherUser[0];
  }, [currentUser.id, conversation.users]);

  return otherUser;
};

export default useOtherUser;