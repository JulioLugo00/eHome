'use client';

import { useCallback } from "react";
import { IconType } from "react-icons";

interface DiscountInputProps{
    label: string;
    description: string;
    amount: number;
    selected: boolean;
    onClick: (value: number) => void;
}



const DiscountInput: React.FC<DiscountInputProps> = ({
    label,
    description,
    amount,
    selected,
    onClick
}) => {

    
    return (
        <div className="
        rounded-xl
        border-2
        p-4
        flex
        flex-row
        gap-3
        transition
        items-center
        ">
            <p>{amount}%</p>
            <div>
                <div className="font-semibold">
                    {label}
                </div>
                <div>
                    {description}
                </div>
            </div>
            <div className="ml-auto">
                <input type="checkbox" 
                className="form-checkbox h-5 w-5 text-pink-500 transition duration-150 ease-in-out"
                checked={selected}
                onClick={() => {
                        if(!selected){
                            onClick(amount)
                        }else{
                            onClick(0)
                        }
                    }}/>
            </div>
        </div>
    );
}


export default DiscountInput;