'use client';
import { useState } from "react";

interface CardInputProps{
    id: string;
    label: string;
    type?: string;
    value: string;
    instructions?: string;
    cancelAction: () => void;
    onSave: (data:any, index:number) => void;
    index: number;
}

const CardInput: React.FC<CardInputProps> = ({
    id,
    label,
    value,
    instructions,
    type,
    cancelAction,
    onSave,
    index
}) => {
    const [initialValue, setInitialValue] = useState(value);
    const [disabledValue, setDisabledValue] = useState(true);

    return(
        <div className="w-full relative p-6 border-2 rounded-md">
            <p className="text-md font-bold mb-1">{label}</p>
            <p className="text-sm mb-5">{instructions}</p>
            <input 
                id={id}
                defaultValue={initialValue}
                onChange={(e) => {
                    setInitialValue(e.target.value);
                    setDisabledValue(false);
                }}
                placeholder=" "
                type={type}
                className={`
                    peer
                    w-full
                    p-4
                    mb-5
                    font-light
                    bg-white
                    border-2
                    rounded-md
                    outline-none
                    transition
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    pl-4
                    border-neutral-300'
                    focus:border-black'
                `}
            />
            <hr className="mb-5"/>
            <div className="flex flex-row justify-between items-center">
                <p onClick={cancelAction} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-md hover:bg-neutral-100 underline transition cursor-pointer">Cancelar</p>
                <button 
                    onClick={() => onSave({[id]: initialValue}, index)} 
                    disabled={disabledValue} 
                    className={`
                        rounded-lg
                        text-white
                        border-green-500
                        border-2
                        px-2
                        py-1
                        ${disabledValue ? 'bg-gray-300' : 'bg-green-500'}
                        ${disabledValue ? 'border-gray-200' : 'border-green-500'}
                        ${disabledValue ? 'cursor-not-allowed' : 'cursor-pointer'}
                    `}> Guardar </button>
            </div>
        </div>
    );
}

export default CardInput;