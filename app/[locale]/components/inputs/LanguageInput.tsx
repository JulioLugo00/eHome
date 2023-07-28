'use client';

import Link from 'next-intl/link';


interface LanguageInputProps{
    label: string;
    region: string;
    id:string;
    onClick: () => void;
    selected?: boolean;
}

const LanguageInput: React.FC<LanguageInputProps> = ({
    label,
    region,
    id,
    onClick,
    selected,
}) => {
    return (
        <Link href='/' locale={id} onClick={onClick}>
            <div className={`
                rounded-xl
                border-2
                p-4
                flex
                flex-col
                hover:border-black
                transition
                cursor-pointer
                items-center
                justify-center
                ${selected ? 'border-black' : 'border-neutral-200'}
            `}>
                <div className="font-semibold">
                    <h1>{label}</h1>
                </div>
                <div>
                    {region}
                </div>
            </div>
        </Link>
    );
}

export default LanguageInput;