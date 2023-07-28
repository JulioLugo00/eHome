'use client';

import { useCallback, useEffect, useState } from "react";
import {IoMdClose} from 'react-icons/io';
import Button from "../Button";

interface ModalTranslateProps{
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title ?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    selected?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const ModalTranslate: React.FC<ModalTranslateProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    selected,
    disabled,
    secondaryAction,
    secondaryActionLabel
}) => {
    const [showModal, setShowModal] =  useState(isOpen);
    let selectedTranslate = true; 

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if(disabled){
            return;
        }

        setShowModal(false);
        setTimeout(() =>{
            onClose();
        }, 300)
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if(disabled){
            return;
        }
        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if(disabled || !secondaryAction){
            return;
        }
        secondaryAction();
    }, [disabled, secondaryAction]);

    if(!isOpen){
        return null;
    }



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
                            <div className="relative px-6 flex-auto pb-6">
                            <div className="flex flex-col gap-2 py-2">
                                <div
                                        className="
                                            flex
                                            flex-row
                                            items-center
                                            gap-4
                                            w-full
                                        ">
                                        {secondaryAction && secondaryActionLabel && (
                                            <p onClick={handleSecondaryAction} className={`hidden md:block text-sm font-semibold py-3 px-2 rounded-full hover:bg-neutral-100 transition cursor-pointer ${selected ? "underline" : ""}`}>
                                                {secondaryActionLabel}
                                            </p>
                                        )}
                                        <p onClick={handleSubmit} className={`hidden md:block text-sm font-semibold py-3 px-2 rounded-full hover:bg-neutral-100 transition cursor-pointer ${selected ? "" : "underline"}`}>
                                            {actionLabel}
                                        </p>
                                    </div>
                                </div>
                                {body}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalTranslate;