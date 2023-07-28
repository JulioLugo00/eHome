'use client';

import { IconType } from "react-icons";
import {useTranslations} from 'next-intl';

interface CategoryInputProps{
    icon: IconType;
    label: string;
    selected?: boolean;
    onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
    icon: Icon,
    label,
    selected,
    onClick
}) => {
    const t = useTranslations('Index');
    return (
        <div onClick={() => onClick(label)} className={`
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
            <div className="font-semibold">
                {t(label)}
            </div>
        </div>
    );
}

export default CategoryInput;