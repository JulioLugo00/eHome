'use client';

interface SubHeadingProps {
    title: string,
    edit?: boolean,
    subtitle ?: string;
    center ?: boolean;
    onClick?: () => void;
}

const SubHeading: React.FC<SubHeadingProps> = ({
    title,
    edit,
    subtitle,
    onClick,
    center
}) => {
    return(
    <div className="flex flex-row justify-between items-center">
        <div className={center ? 'text-center' : 'text-start'}>
            <div className="text-xl font-bold">
                {title}
            </div>
            {subtitle && (
            <div className="font-light text-neutral-500 mt-2">
                {subtitle}
            </div>
            )}
        </div>
        {edit && onClick && (
            <div onClick={() => onClick()} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 underline transition cursor-pointer">
                Edit
            </div>
        )}
    </div>
    );
}

export default SubHeading;