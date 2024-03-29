'use client';

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterReviewProps{
    title: string;
    subtitle?: string;
    value: number;
    onChange: (value: number) => void;
    styleEdit?: boolean;
}

const CounterReview: React.FC<CounterReviewProps> = ({
    title,
    subtitle,
    value,
    styleEdit,
    onChange,

}) => {
    const onAdd = useCallback(() => {
        onChange(value + 1);
    }, [value, onChange]);

    const onReduce = useCallback(() => {
        if(value == 1){
            return;
        }
        onChange(value - 1);
    }, [value, onChange]);

    return(
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
                <div className={styleEdit ? "text-md font-semibold" : "font-medium"}>{title}</div>
                <div className="font-light text-gray-600">{subtitle}</div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <div 
                    onClick={onReduce} 
                    className={`
                        ${styleEdit ? 'w-8' : 'w-10'}
                        ${styleEdit ? 'h-8' : 'h-10'}
                        rounded-full
                        border-[1px]
                        border-neutral-400
                        flex
                        items-center
                        justify-center
                        text-neutral-600
                        cursor-pointer
                        hover:border-black
                        hover:text-black
                        transition
                `}>
                    <AiOutlineMinus />
                </div>
                <div className={`font-light ${styleEdit ? 'text-lg' : 'text-xl'} text-neutral-600`}>
                    {value}
                </div>
                {value < 5 ? <div 
                    onClick={onAdd} 
                    className={`
                        ${styleEdit ? 'w-8' : 'w-10'}
                        ${styleEdit ? 'h-8' : 'h-10'}
                        rounded-full
                        border-[1px]
                        border-neutral-400
                        flex
                        items-center
                        justify-center
                        text-neutral-600
                        cursor-pointer
                        hover:border-black
                        hover:text-black
                        transition
                `}>
                    <AiOutlinePlus />
                </div> : <div 
                    className={`
                        ${styleEdit ? 'w-8' : 'w-10'}
                        ${styleEdit ? 'h-8' : 'h-10'}
                 
                       
                   
                `}>
                </div> }
                
            </div>
        </div>
    );
};

export default CounterReview;