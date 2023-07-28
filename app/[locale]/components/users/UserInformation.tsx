'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { Listing, Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import {format} from 'date-fns';
import Image from 'next/image'
import HeartButton from "../HeartButton";
import Button from "../Button";
import {ImCross, ImCheckmark} from "react-icons/im";
import {useTranslations} from 'next-intl';


interface UserInformationProps{
    data: SafeUser;
}

const UserCard: React.FC<UserInformationProps> = ({
    data
}) => {
    const router = useRouter();
    const t = useTranslations('Index');
    return(
        <div className="flex flex-col border border-gray-300 rounded-lg p-4 gap-6">
            <div className="font-bold text-xl">{data.name}{t('confirmedInf')}</div>
            <div className="flex flex-row items-center gap-4">
                <ImCross size={10}/>
                <div className="text-md">{t('identity')}</div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <ImCheckmark size={10}/>
                <div className="text-md">{t('emailA')}</div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <ImCross size={10}/>
                <div className="text-md">{t('phone')}</div>
            </div>
            <div className="text-sm font-semibold underline">{t("learnIdentity")}</div>
        </div>
    )
}

export default UserCard;