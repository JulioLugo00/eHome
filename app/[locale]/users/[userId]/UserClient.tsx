'use client';

import Container from "@/app/[locale]/components/Container";
import ListingHead from "@/app/[locale]/components/listings/ListingHead";
import ListingInfo from "@/app/[locale]/components/listings/ListingInfo";
import ListingReservation from "@/app/[locale]/components/listings/ListingReservation";
import { categories } from "@/app/[locale]/components/navbar/Categories";
import UserAbout from "@/app/[locale]/components/users/UserAbout";
import UserCard from "@/app/[locale]/components/users/UserCard";
import UserInformation from "@/app/[locale]/components/users/UserInformation";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { Reservation, User } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";

interface UserClientProps{
    user: SafeUser;
    currentUser: SafeUser | null;
}

const UserClient: React.FC<UserClientProps> = ({
    user,
    currentUser
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    return(
        <Container>
            <div className="flex justify-evenly flex-row p-4 gap-6">
                <div className="flex flex-col gap-8" style={{ flexBasis: '25%' }}>
                    <UserCard 
                        data={user}
                    />
                    <UserInformation
                        data={user}
                    />
                </div>
                <div className="flex flex-col" style={{ flexBasis: '70%' }}>
                    <UserAbout 
                        data={user}
                    />
                </div>
            </div>
        </Container>
    );
}

export default UserClient;