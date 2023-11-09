'use client';

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputSimpleProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors;
    defaultValue?: string;
}

const InputSimple: React.FC<InputSimpleProps> = ({
    id,
    label,
    type = "text",
    disabled,
    formatPrice,
    register,
    required,
    errors,
    defaultValue
}) => {
    return (
        <div className="w-full relative">
            <label>{label}</label>
            <input 
                id={id}
                disabled={disabled}
                {...register(id, {required})}
                type={type}
                className={`
                    peer
                    w-full
                    p-1
                    
                    font-light
                    bg-white
                    border-2
                    rounded-md
                    outline-none
                    transition
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    ${formatPrice ? 'pl-9':'pl-4'}
                    ${errors[id] ? 'border-rose-500':'border-neutral-300'}
                    ${errors[id] ? 'focus:border-rose-500':'focus:border-black'}
                `}
            />
         
        </div>
    );
}

export default InputSimple;