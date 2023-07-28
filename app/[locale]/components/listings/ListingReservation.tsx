'use client';

import {Range} from 'react-date-range';
import Calendar from '../inputs/Calendar';
import Button from '../Button';
import { MoneyValue } from '../currency/MoneyValue';
import {useTranslations} from 'next-intl';

interface ListingReservationProps{
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    clean: boolean;
    disabled?: boolean;
    disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    dateRange,
    totalPrice,
    clean,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates
}) => {

    let tarifaServicio = (totalPrice*16.3/100);
    let tarifaClean = totalPrice*10/100
    let total = totalPrice + tarifaServicio;
    let Clean = (<div></div>);
    const t = useTranslations('Index');
    const currency = localStorage.getItem("currency");

    if(localStorage.getItem("exchangeRates")){
        let change = JSON.parse(localStorage.getItem("exchangeRates")!);
        let moneda =  localStorage.getItem("currency")!
        total = total * parseInt(change.conversion_rates[moneda])
        tarifaServicio = tarifaServicio * parseInt(change.conversion_rates[moneda])
        tarifaClean = tarifaClean * parseInt(change.conversion_rates[moneda])
        totalPrice = totalPrice * parseInt(change.conversion_rates[moneda])
        price = price *  parseInt(change.conversion_rates[moneda])
    }

    if(clean) {
        Clean = (
            <div className="
            p-4
            flex
            flex-row
            items-center
            justify-between
            text-md
            underline
            text-neutral-500
        ">
            <div>{t('cleaningFee')}</div>
            <MoneyValue value={tarifaClean} currency={currency ? currency : "USD"} decimals={1}/>
        </div>)
        total = total + tarifaClean;
    }

    

    return(
        <div className="
            bg-white
            rounded-xl
            border-[1px]
            border-neutral-200
            overflow-hidden
        ">
            <div className="flex flex-row items-center gap-1 p-4">
                <div className="text-2xl font-semibold">
                    <MoneyValue value={price} currency={currency ? currency : "USD"} decimals={1}/>
                </div>
                <div className="font-light text-neutral-600">
                    {t('night')}
                </div>
            </div>
            <hr />
            <Calendar 
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => onChangeDate(value.selection)}
            />
            <hr />

            <div className="p-4">
                <Button 
                    disabled={disabled}
                    label={t('reserve')}
                    onClick={onSubmit}
                />
            </div>
            <hr/>
            {Clean}
            <div className="
                p-4
                flex
                flex-row
                items-center
                justify-between
                text-md
                underline
                text-neutral-500
            ">
                <div>{t('eHomeFee')}</div>
                <MoneyValue value={tarifaServicio} currency={currency ? currency : "USD"} decimals={1}/>
            </div>



            <div className="
                p-4
                flex
                flex-row
                items-center
                justify-between
                font-semibold
                text-lg
            ">
                <div>
                    {t('total')}
                </div>
                <div>
                    <MoneyValue value={total} currency={currency ? currency : "USD"} decimals={1}/>
                </div>
            </div>
        </div>
    )
}

export default ListingReservation;