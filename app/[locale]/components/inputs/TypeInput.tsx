'use client';

import { useCallback } from "react";
import { IconType } from "react-icons";

interface TypeInputProps{
    icon: IconType;
    label: string;
    description: string;
    selected: boolean;
    option: string;
    onClick: (value: string) => void;
}



const TypeInput: React.FC<TypeInputProps> = ({
    icon: Icon,
    label,
    description,
    selected,
    option,
    onClick
}) => {

    
    return (
        <div onClick={() => onClick(option)} className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-row
        gap-3
        hover:border-black
        transition
        cursor-pointer
        items-center
        ${selected ? 'border-black' : 'border-neutral-200'}
    `}>
            <Icon size={30}/>
            <div>
                <div className="font-semibold">
                    {label}
                </div>
                <div>
                    {description}
                </div>
            </div>
        </div>
    );
}


export default TypeInput;