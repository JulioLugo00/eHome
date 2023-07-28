'use client';

interface CurrencyInputProps{
    label: string;
    acronym: string;
    symbol:string;
    selected?: boolean;
    onClick: (value: string) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
    label,
    acronym,
    symbol,
    selected,
    onClick
}) => {
    return (
        <div onClick={() => onClick(symbol)} className={`
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
                {label}
            </div>
            <div>
                {acronym} - {symbol}
            </div>
        </div>
    );
}

export default CurrencyInput;