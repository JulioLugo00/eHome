'use client';
import Image from "next/image";
import {useRouter} from "next-intl/client";
import Link from 'next-intl/link';
import { IoIosArrowDown } from "react-icons/io";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRentModal from "@/app/hooks/useRentModal";
import {useTranslations} from 'next-intl';

const HostMenu = () => {
    const router = useRouter();
    const rentModal = useRentModal();
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations('Index');
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, []);

    return(
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                    <div 
                        onClick={() => {}} 
                        className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                            {t('today')}
                    </div>
                    <div 
                        onClick={() => {}} 
                        className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                            {t('inbox')}
                    </div> 
                    <div 
                        onClick={() => {}} 
                        className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                            {t('calendar')}
                    </div>
                    <div 
                        onClick={() => {}} 
                        className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                            {t('insights')}
                    </div>
                    <div 
                        onClick={toggleOpen} 
                        className="p-4 text-sm font-semibold px-4 py-3 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:bg-neutral-100 transition">
                            {t('menu')}
                        <IoIosArrowDown />
                    </div>
            </div>
            {isOpen && (
                <div className="
                absolute
                rounded-xl
                w-[40vw]
                md:w-1/3
                bg-white
                overflow-hidden
                right-[-100px] //Ajustar dimension
                top-12
                text-sm
                shadow-2xl
                ">
                <div className="flex flex-col cursor-pointer">
                    <>
                        <MenuItem 
                        onClick={() => {}}
                        route=''
                        modal={true}
                        label={t('listings')}/>
                        
                        <MenuItem 
                        onClick={() => {}}
                        modal={true}
                        route=''
                        label={t('reservations')} />
                        <MenuItem 
                        onClick={() => {
                            toggleOpen();
                            rentModal.onOpen();
                        }}
                        modal={true}
                        route=''
                        label={t("createListing")} />
                        <hr />
                        <MenuItem 
                        onClick={() => {router.push('/manage-guidebook')}}
                        modal={true}
                        route=''
                        label={t("guidebooks")} />
                        <MenuItem 
                        onClick={() => {}}
                        modal={true}
                        route=''
                        label={t('transactionHistory')} />
                        <MenuItem 
                        onClick={() => {}}
                        modal={true}
                        route=''
                        label={t("exploreHostingResources")} />
                                                <MenuItem 
                        onClick={() => {}}
                        modal={true}
                        route=''
                        label={t("connectHosts")} />
                        
                    </>
                </div>
            </div>
            )}
        </div>
    );
}

export default HostMenu;