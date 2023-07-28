'use client';
import Image from "next/image";
import {useRouter} from "next-intl/client";
import Link from 'next-intl/link';
import { IoIosArrowDown } from "react-icons/io";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRentModal from "@/app/hooks/useRentModal";

const HostMenu = () => {
    const router = useRouter();
    const rentModal = useRentModal();
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, []);

    return(
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                    <div 
                        onClick={() => {}} 
                        className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                            Today
                    </div>
                    <div 
                        onClick={() => {}} 
                        className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                            Inbox
                    </div> 
                    <div 
                        onClick={() => {}} 
                        className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                            Calendar
                    </div>
                    <div 
                        onClick={() => {}} 
                        className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                            Insights
                    </div>
                    <div 
                        onClick={() => {}} 
                        className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                            Today
                    </div>
                    <div 
                        onClick={toggleOpen} 
                        className="p-4 text-sm font-semibold px-4 py-3 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:bg-neutral-100 transition">
                            Menu
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
                        label={'Listings'}/>
                        
                        <MenuItem 
                        onClick={() => {}}
                        modal={true}
                        route=''
                        label={'Reservations'} />
                        <MenuItem 
                        onClick={() => {
                            toggleOpen();
                            rentModal.onOpen();
                        }}
                        modal={true}
                        route=''
                        label={'Create a new listing'} />
                        <hr />
                        <MenuItem 
                        onClick={() => {}}
                        modal={true}
                        route=''
                        label={'Guidebooks'} />
                        <MenuItem 
                        onClick={() => {}}
                        modal={true}
                        route=''
                        label={'Transaction history'} />
                        <MenuItem 
                        onClick={() => {}}
                        modal={true}
                        route=''
                        label={'Explore hosting resources'} />
                                                <MenuItem 
                        onClick={() => {}}
                        modal={true}
                        route=''
                        label={'Connect with Hosts near you'} />
                        
                    </>
                </div>
            </div>
            )}
        </div>
    );
}

export default HostMenu;