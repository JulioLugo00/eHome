'use client';

import {AiOutlineMenu} from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRentModal from '@/app/hooks/useRentModal';
import useTranslateModal from '@/app/hooks/useTranslateModal';
import { signOut } from 'next-auth/react';
import { SafeListing, SafeUser } from '@/app/types';
import {useRouter} from 'next-intl/client';
import {useTranslations} from 'next-intl';
import {TfiWorld} from 'react-icons/tfi';
import axios from 'axios';
import Link from 'next-intl/link';

interface UserMenuProps{
    currentUser?: SafeUser | null;
    listings?: SafeListing[];
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser,
    listings
}) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const translateModal = useTranslateModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onRent = useCallback(() => {
        if(!currentUser){
            return loginModal.onOpen();
        }

        // Open Rent Modal
        rentModal.onOpen();
    }, [currentUser, loginModal, rentModal]);

    const onTranslate = useCallback(() => {
        translateModal.onOpen();
    }, [currentUser, translateModal]);

    const t = useTranslations('Index');

    let view = (
        <div 
        onClick={() => router.push('/join')}
        className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
    >
        {t('e-homeHome')}
    </div>
    )

    let hosting = () => router.push('/hosting')

    if(currentUser){
        view= (
        <Link href="/hosting" prefetch={false}>
            <div 
                className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
            >
                {t('view')}
            </div>
        </Link>
        )
    }

    if(currentUser && listings?.length == 0){
        view= (
        <div 
            onClick={() => router.push('/join')}
            className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
            {t('e-homeHome')}
        </div>
        )
    }

    if(location.pathname.includes('/hosting')){
        view = (
            <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full"></div>
        )
    }

    return(
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                {view}
                <div 
                    onClick={onTranslate} 
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                        <TfiWorld size="15"/>
                </div>
                <div
                    onClick={toggleOpen}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image}/>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="
                    absolute
                    rounded-xl
                    shadow-md
                    w-[40vw]
                    md:w-3/4
                    bg-white
                    overflow-hidden
                    right-0
                    top-12
                    text-sm
                ">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                        <>
                            <MenuItem 
                            onClick={() => router.push("/trips")}
                            route='/trips'
                            label={t('my_trips')}/>

                            {/* <MenuItem 
                            onClick={() => router.push("/properties")}
                            route='/properties'
                            label={t('my_properties')}/>                         */}

                            {/* <MenuItem 
                            onClick={() => router.push("/reservations")}
                            route='/reservations'
                            label={t('my_reservations')}/> */}
                            
                            <MenuItem 
                            onClick={() => router.push("/favorites")}
                            route='/favorites'
                            label={t('my_favorites')}/>

                            <MenuItem 
                            onClick={rentModal.onOpen}
                            prefetch={true}
                            route={location.pathname.includes('/hosting') ? '/' : '/hosting'}
                            label={location.pathname.includes('/hosting') ? 'Switch to traveling' : t("view")}/>

                            <MenuItem 
                            onClick={() => router.push(`/users/${currentUser.id}`)}
                            route={`/users/${currentUser.id}`}
                            label={t('my_profile')}/>

                            <hr />                       
                            
                            <MenuItem 
                            onClick={() => signOut()}
                            route=''
                            modal={true}
                            label={t('logout')}/>
                        </>
                        ) : (
                        <>
                            <MenuItem 
                            onClick={loginModal.onOpen}
                            route=''
                            modal={true}
                            label={t("login")}/>
                            
                            <MenuItem 
                            onClick={registerModal.onOpen}
                            modal={true}
                            route=''
                            label={t("signup")}/>
                            
                        </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;