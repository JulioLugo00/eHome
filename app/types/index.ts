import { Listing, Reservation, User, Conversation, Message } from "@prisma/client";

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};

export type SafeListing = Omit<
    Listing,
    "createdAt"
> & {
    createdAt: string;
};

export type SafeReservation = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "listing"
>&{
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing;
};

export type FullMessageType = Message & {
    sender: User, 
    seen: User[]
  };
  
  export type FullConversationType = Conversation & { 
    users: User[]; 
    messages: FullMessageType[]
  };