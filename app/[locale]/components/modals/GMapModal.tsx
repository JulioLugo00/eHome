'use client';

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import {discounts} from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import DiscountInput from "../inputs/DiscountInput";
import BooleanInput from "../inputs/BooleanInput";
import ReservationInput from "../inputs/ReservationInput";
import TypeInput from "../inputs/TypeInput";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineMeetingRoom } from "react-icons/md";
import {RiParentFill} from "react-icons/ri";
import {useTranslations} from 'next-intl';
import GMap from "../GMap";
import AddressSelect from "../inputs/AddressSelect";
import ImageUploader from "../inputs/ImageUploader";
import CountryStateCityInput from "../inputs/CountryStateCityInput";
import InputSimple from "../inputs/InputSimple";
import { title } from "process";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface GMapModalProps {
    latitud: number;
    longitud: number;

}

const GMapModal: React.FC<GMapModalProps> = ({
    latitud,
    longitud

}) => {
    const t = useTranslations('Index');

    const [showModal, setShowModal] =  useState(true);
    const handleClose = () => {
        setShowModal(false);
    }
    const coordenadas = [latitud,longitud];

    let body = (
        <div className="flex flex-col gap-8">
 
            <GMap center={coordenadas}/>
    
        </div>
    );

    return(
        <>
            <div
            className="
                justify-center
                items-center
                flex
                overflow-x-hidden
                overflow-y-auto
                fixed
                inset-0
                z-50
                outline-none
                focus:outline-none
                bg-neutral-800/70
            ">
                <div
                    className="
                        relative
                        w-full
                        md:w-4/6
                        lg:w-3/6
                        xl:w-2/5
                        my-6
                        mx-auto
                        h-full
                        lg:h-auto
                        md:h-auto
                    "
                >
                    {/* CONTENT */}
                    <div
                    className={`
                        translate
                        duration-300
                        h-full
                        ${showModal ? 'translate-y-0': 'translate-y-full'}
                        ${showModal ? 'opacity-100': 'opacity-0'}
                    `}>
                        <div
                            className="
                                translate
                                h-full
                                lg:h-auto
                                md:h-auto
                                border-0
                                rounded-lg
                                shadow-lg
                                relative
                                flex
                                flex-col
                                w-full
                                bg-white
                                outline-none
                                focus:outline-none
                            "
                        >
                            {/* HEADER */}
                            <div
                                className="
                                    flex
                                    items-center
                                    p-6
                                    rounded-t
                                    justify-center
                                    relative
                                    border-b-[1px]
                                "
                            >
                                <button
                                    onClick={handleClose}
                                    className="
                                        p-1
                                        border-0
                                        hover:opacity-70
                                        transition
                                        absolute
                                        left-9
                                    "
                                >
                                    <IoMdClose size={18} />
                                </button>
                                <div className="text-lg font-semibold">
                                    {title}
                                </div>
                            </div>
                            {/* BODY */}
                            <div className="relative p-6 flex-auto">
                                {body}
                            </div>
                            {/* FOOTER */}
                            <div className="flex flex-col gap-2 p-6">
                                <div
                                    className="
                                        flex
                                        flex-row
                                        items-center
                                        gap-4
                                        w-full
                                    "
                                >
                                    
                                        <Button 
                                          label={"Cancelar"}
                                        />
                                
                                    <Button 
                                       label={"Confirmar"}
                                    />
                                </div>
                        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}




export default GMapModal;