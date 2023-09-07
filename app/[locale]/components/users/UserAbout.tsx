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
import {MdOutlineWorkOutline,MdOutlineFreeBreakfast, MdOutlineGTranslate,MdRoomService, MdLocationPin, MdOutlinePets} from "react-icons/md";
import {FcIdea} from "react-icons/fc";
import {BiTime, BiBookOpen, BiMusic} from "react-icons/bi";
import {FaBirthdayCake, FaHeart, FaLightbulb} from "react-icons/fa";
import {useTranslations} from 'next-intl';
import useProfileModal from '@/app/hooks/useProfileModal';
import useLoginModal from '@/app/hooks/useLoginModal';

interface UserAboutProps{
    data: SafeUser;
}

const UserAbout: React.FC<UserAboutProps> = ({
    data
}) => {
    const router = useRouter();
    const t = useTranslations('Index');
    const profileModal = useProfileModal();
    const loginModal = useLoginModal();

    const onProfile = useCallback(() => {
        if (!data) {
            return loginModal.onOpen();
        }

        profileModal.onOpen();
    }, [data, loginModal, profileModal]);


    return(
        <div>

{data.createdProfile ? (
                
                <div className="flex flex-col border border-gray-300 rounded-lg p-4 gap-6">
            <div className="font-bold text-xl">{t('about')} {data.name}</div>
            <div className="flex flex-row justify-evenly">
                <div className="flex flex-col gap-3" style={{ flexBasis: '50%' }}>
                    <div className="flex flex-row gap-3 items-center">
                        <MdOutlineWorkOutline/>
                        <div>{t('work')}: {data.work}</div>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <FaLightbulb/>
                        <div>{t('fun')}: {data.funFact}</div>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <MdOutlinePets/>
                        <div>{t('Pets')}: {data.pets}</div>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <BiTime/>
                        <div>{t('spend')}: {data.spendTime}</div>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <BiBookOpen/>
                        <div>{t('biografhy')}: {data.biography}</div>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <MdLocationPin/>
                        <div>{t('live')} {data.liveIn}</div>
                    </div>
                </div>
                <div className="flex flex-col gap-3" style={{ flexBasis: '50%' }}>
                    <div className="flex flex-row gap-3 items-center">
                        <BiMusic/>
                        <div>{t('song')}: {data.song}</div>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <MdRoomService/>
                        <div>{t('guestA')}: {data.guestAttention}</div>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <FaBirthdayCake/>
                        <div>{t('born')}: {new Date(data.birthdate).toLocaleDateString('es-ES')}</div>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <FaHeart/>
                        <div>{t('obsessed')}: {data.obsessed}</div>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <MdOutlineGTranslate/>
                        <div>{t('speaks')}: {data.languages}</div>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <MdOutlineFreeBreakfast/>
                        <div>{t('breakfast')}: {data.breakfast}</div>
                    </div>
                </div>
            </div>
            <div>{data.description}</div>
            <div 
                    onClick={onProfile}
                    className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-neutral-100
                        bg-[#21c560]
                        transition
                        cursor-pointer
                        w-28
                    "
                >
                    Editar perfil
            </div>
        </div>
                
                
               
            ) : (
             
                <div>
                    <div>
                        Es hora de crear tu perfil
                    </div>
                    <div>
                        Tu perfil de eHome es una parte importante de todas las reservaciones. Crea el tuyo para que los demás anfitriones y huéspedes te conozcan mejor.
                    </div>
                    <div 
                    onClick={onProfile}
                    className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-neutral-100
                        bg-[#21c560]
                        transition
                        cursor-pointer
                        w-28
                    "
                >
                    Crear perfil
                </div>
                </div>
            )}
        </div>
    )
}

export default UserAbout;