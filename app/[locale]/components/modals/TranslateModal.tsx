'use client';

import useRentModal from "@/app/hooks/useRentModal";
import useTranslateModal from "@/app/hooks/useTranslateModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import {discounts} from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import DiscountInput from "../inputs/DiscountInput";
import ReservationInput from "../inputs/ReservationInput";
import TypeInput from "../inputs/TypeInput";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineMeetingRoom } from "react-icons/md";
import {RiParentFill} from "react-icons/ri";
import LanguageInput from "../inputs/LanguageInput";
import ModalTranslate from "./ModalTranslate";
import CurrencyInput from "../inputs/CurrencyInput";
import {useTranslations} from 'next-intl';
import {useRouter} from 'next-intl/client';

export const languages = [
    {
        label: 'English',
        region: 'United States',
        id: 'en'
    },
    {
        label: 'Spanish',
        region: 'Mexico',
        id: 'es'
    }
]

export const currency = [
    {
        label: 'United States dollar',
        acronym: 'USD',
        symbol: '$'
    },
    {
        label: 'Mexican peso',
        acronym: 'MXN',
        symbol: '$'
    },
    {
        label: 'Japanese yen',
        acronym: 'JPY',
        symbol: '¥'
    },
    {
        label: 'Canadian dollar',
        acronym: 'CAD',
        symbol: '$'
    },
]

enum STEPS {
    TRANSLATE = 0,
    CURRENCY = 1
}

const TranslateModal = () => {
    const router = useRouter();
    const translateModal = useTranslateModal();
    const [step, setStep] = useState(STEPS.TRANSLATE);
    const [isLoading, setIsLoading] = useState(false);
    const t = useTranslations('Index');
    const fetchExchangeRates = async () => {
        try {
          const response = await axios.get(`https://v6.exchangerate-api.com/v6/10dca534289014d47e35200d/latest/USD`);
          const data = response.data;
    
          // Store the data in localStorage
          localStorage.setItem('exchangeRates', JSON.stringify(data));
    
          // Handle the response data as needed
        } catch (error) {
          // Error handling
          console.error(error);
        }
      };

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({});

    const category = watch('category');

    const Map = useMemo(() => dynamic(() => import("../Map"), {
        ssr: false
    }), [location]);


    const setCustomValue = (id: string, value:any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    }

    const onBack = () => {
        setStep(0);
    };

    const onNext = () => {
        setStep(1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
            return onNext();
    }

    const actionLabel = useMemo(() => {
        return t('currency');
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        return t('language');
    }, [step]);

    let selectedTranslate = true;

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title={t('choose')+t('aM')+t('language')} subtitle={t("pick")}/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {languages.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <LanguageInput 
                            selected={category == item.label}
                            onClick={()=>{translateModal.onClose()}}
                            label={item.label}
                            region={item.region}
                            id={item.id}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if(step == STEPS.CURRENCY){
        selectedTranslate = false;
        bodyContent = (
            <div className="flex flex-col gap-8">
            <Heading title={t('choose')+t('aF')+t('currency')} subtitle={t('pick')}/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
                {currency.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CurrencyInput 
                            onClick={(category) => {
                                localStorage.setItem("currency", item.acronym)
                                fetchExchangeRates();
                                translateModal.onClose()
                                router.push('/');
                            }}
                            selected={category == item.label}
                            label={item.label}
                            acronym={item.acronym}
                            symbol={item.symbol}
                        />
                    </div>
                ))}
            </div>
        </div>
        )
    }


    return (
        <ModalTranslate
        isOpen={translateModal.isOpen}
        onClose={translateModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={onBack}
        title={t('translate')}
        body={bodyContent}
        selected={selectedTranslate}
        />
    );
}

export default TranslateModal;