'use-client';

interface InputEditProps{
    title: string;
    value?: string;
    value2?: string;
    type?: string;
    number?: number;
    onClick: () => void;
}

const InputEdit: React.FC<InputEditProps> = ({
    title, value, value2, type, onClick
}) => {
    return(
        <div className={'text-start flex flex-row justify-between items-center'}>
            <div>
                <div className="text-md font-semibold">
                    {title}
                </div>
                {value && (
                <div className="text-sm font-light text-neutral-500 mt-2">
                    {value}
                </div>
                )}
                {value2 && (
                <div className="text-sm font-light text-neutral-500 mt-2">
                    {value2}
                </div>
                )}
            </div>
            <div onClick={() => onClick()} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 underline transition cursor-pointer">
                Edit
            </div>
        </div>
    )
}

export default InputEdit;
