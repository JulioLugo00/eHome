'use client';

import { useCallback } from "react";
import { IconType } from "react-icons";

interface ReservationInputProps{
    label: string;
    description: string;
    selected: boolean;
    value: boolean;
    onClick: (value: boolean) => void;
}



const DiscountInput: React.FC<ReservationInputProps> = ({
    label,
    description,
    selected,
    value,
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
            <div>
                <div className="font-semibold">
                    {label}
                </div>
                <div>
                    {description}
                </div>
            </div>
            <div className="ml-auto">
                <label className="radio-container">
                    <input type="radio" name="firstGuest" checked={selected} className="radio-input" onClick={() => onClick(value)}/>
                    <span className="radio-custom"></span>
                </label>
            </div>
        </div>
    );
}


export default DiscountInput;