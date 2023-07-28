'use client';

import { useCallback } from "react";
import {ImCross, ImCheckmark} from "react-icons/im";

interface InputTickProps{
    title: string;
    subtitle?: string;
    value: number;
    onChange: (value: number) => void;
}

const InputTick: React.FC<InputTickProps> = ({
    title,
    subtitle,
    value,
    onChange
}) => {
    const onTick = useCallback(() => {
        onChange(1);
    }, [value, onChange]);

    const onCross = useCallback(() => {
        onChange(2);
    }, [value, onChange]);

    return(
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
                <div className={"text-md font-semibold"}>{title}</div>
                {subtitle && (<div className="font-light text-gray-600">{subtitle}</div>)}
            </div>
            <div className="flex flex-row items-center gap-4">
                <div 
                    onClick={onTick} 
                    className={`
                        w-8
                        h-8
                        rounded-full
                        border-[1px]
                        border-neutral-400
                        flex
                        items-center
                        justify-center
                        text-neutral-600
                        cursor-pointer
                        hover:opacity-80
                        transition
                        ${value == 1 ? 'bg-green-500' : ''}
                        ${value == 1 ? 'border-green-500' : ''}
                        ${value == 1 ? 'text-white' : ''}
                `}>
                    <ImCheckmark size="12"/>
                </div>
                <div 
                    onClick={onCross} 
                    className={`
                        w-8
                        h-8
                        rounded-full
                        border-[1px]
                        border-neutral-400
                        flex
                        items-center
                        justify-center
                        text-neutral-600
                        cursor-pointer
                        hover:opacity-80
                        transition
                        ${value == 2 ? 'bg-red-500' : ''}
                        ${value == 2 ? 'border-red-500' : ''}
                        ${value == 2 ? 'text-white' : ''}
                `}>
                    <ImCross size="10"/>
                </div>
            </div>
        </div>
    );
};

export default InputTick;