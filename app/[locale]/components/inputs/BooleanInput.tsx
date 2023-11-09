'use client';

import { useCallback, useState } from "react";
import { IconType } from "react-icons";

interface BooleanInputProps{
    label: string;
    initialValue: boolean;
    onClick: (value: boolean) => void;
}

const BooleanInput: React.FC<BooleanInputProps> = ({
    label,
    initialValue,
    onClick
}) => {
    const [checked, setChecked] = useState(initialValue);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.checked;
        setChecked(newValue);
        onClick(newValue);
    };

    
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

            <div className="font-semibold">
                {label}
            </div>
            <div className="ml-auto">
                <input 
                type="checkbox" 
                className="form-checkbox h-5 w-5 text-pink-500 transition duration-150 ease-in-out"
                checked={checked}
                onChange={handleChange}
                />
            </div>
        </div>
    );
}

export default BooleanInput;