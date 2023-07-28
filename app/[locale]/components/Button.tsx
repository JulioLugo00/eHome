'use client';

import { IconType } from "react-icons";

interface ButtonProps {
    label: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onEdit?: () => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
    color?: string;
    deleteColor?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon,
    color: Color,
    onEdit,
    deleteColor
}) => {
    return(
        <button
            onClick={onClick ? onClick : onEdit}
            disabled={disabled}
            className={`
                relative
                disabled:opacity-70
                disabled:cursor-not-allowed
                rounded-lg
                hover:opacity-80
                transition
                w-full
                ${(deleteColor) ? 'bg-red-500' : ((outline) ? 'bg-white': 'bg-green-500')}
                ${(deleteColor) ? 'border-red-500' : ((outline)? 'border-black': 'border-green-500')}
                ${outline ? 'text-black': 'text-white'}
                ${small ? 'py-1' : 'py-3'}
                ${small ? 'text-sm' : 'text-md'}
                ${small ? 'font-light' : 'font-semibold'}
                ${small ? 'border-[1px]' : 'border-2'}
            `}
        >
            {Icon && (
                <Icon 
                    size={24}
                    className="
                        absolute
                        left-4
                        top-3
                    "
                    color={Color}
                />
            )}
            {label}
        </button>
    );
}

export default Button;