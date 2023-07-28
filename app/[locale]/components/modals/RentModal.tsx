'use client';

import useRentModal from "@/app/hooks/useRentModal";
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
import { useRouter } from "next/navigation";
import DiscountInput from "../inputs/DiscountInput";
import ReservationInput from "../inputs/ReservationInput";
import TypeInput from "../inputs/TypeInput";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineMeetingRoom } from "react-icons/md";
import {RiParentFill} from "react-icons/ri";
import {useTranslations} from 'next-intl';

enum STEPS {
    CATEGORY = 0,
    TYPE = 1,
    LOCATION = 2,
    INFO = 3,
    IMAGES = 4,
    DESCRIPTION = 5,
    FIRSTRESERVATION = 6,
    PRICE = 7,
    DISCOUNT = 8,
}

const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();
    const t = useTranslations('Index');
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            type: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: "",
            description: "",
            discount: 0,
            weekDiscount: 0,
            monthlyDiscount: 0,
            firstReservation: false,
        }
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');
    const discount = watch('discount');
    const weekDiscount = watch('weekDiscount');
    const monthlyDiscount = watch('monthlyDiscount');
    const firstReservation = watch('firstReservation');
    const type = watch('type');

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
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if(step != STEPS.DISCOUNT){
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/listings', data)
        .then(() => {
            toast.success('Property Created!');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
        })
        .catch(() => {
            toast.error('Something went wrong')
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const actionLabel = useMemo(() => {
        if(step == STEPS.DISCOUNT){
            return t('create');
        }

        return t('next');
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if(step == STEPS.CATEGORY){
            return undefined;
        }

        return t('back');
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title={t('titleCategory')} subtitle={t('subtitleCategory')}/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput 
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category == item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if(step == STEPS.TYPE){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title={t("titleType")} subtitle={t("subtitleType")}/>
                <div className="grid grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto">
                        <TypeInput 
                            onClick={(type) => setCustomValue('type', type)}
                            description={t("descriptionT1")}
                            selected={type=="1"}
                            label={t('type1')}
                            icon={AiOutlineHome}
                            option={"1"}
                        />
                        <TypeInput 
                            onClick={(type) => setCustomValue('type', type)}
                            description={t("descriptionT2")}
                            selected={type=="2"}
                            label={t('type2')}
                            icon={MdOutlineMeetingRoom}
                            option={"2"}
                        />
                        <TypeInput 
                            onClick={(type) => setCustomValue('type', type)}
                            description={t("descriptionT3")}
                            selected={type=="3"}
                            label={t('type3')}
                            icon={RiParentFill}
                            option={"3"}
                        />
                </div>
            </div>
        )
    }

    if(step == STEPS.LOCATION){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title={t("titleLocation")} subtitle={t("subtitleLocation")}/>
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map center={location?.latlng}/>
            </div>
        );
    }
    
    if(step == STEPS.INFO){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title={t("titleInfo")} subtitle={t("subtitleInfo")}/>
                <Counter title={t('guests')} subtitle={t('howGuests')} value={guestCount} onChange={(value) => setCustomValue('guestCount', value)}/>
                <hr />
                <Counter title={t("rooms")} subtitle={t('howRooms')} value={roomCount} onChange={(value) => setCustomValue('roomCount', value)}/>
                <hr />
                <Counter title={t("bathrooms")} subtitle={t('howBathrooms')} value={bathroomCount} onChange={(value) => setCustomValue('bathroomCount', value)}/>
            </div>
        );
    }

    if(step == STEPS.IMAGES){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title={t("titleImages")} subtitle={t("subtitleImages")}/>
                <ImageUpload onChange={(value) => setCustomValue('imageSrc', value)} value={imageSrc}/>
            </div>
        );
    }

    if(step == STEPS.DESCRIPTION){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title={t("titleDescription")} subtitle={t("subtitleDescription")}/>
                <Input 
                    id="title"
                    label={t("title")}
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr/>
                <Input 
                    id="description"
                    label={t("description")}
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if(step == STEPS.FIRSTRESERVATION){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title={t("titleFirstR")} subtitle={t("subtitleFirstR")}/>
                <div className="grid grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto">
                    <ReservationInput 
                        onClick={(firstReservation) => setCustomValue('firstReservation', firstReservation)}
                        description={t('descriptionAnyG')}
                        value={false}
                        selected={firstReservation==false}
                        label={t("anyGuest")}                 
                    />
                    <ReservationInput 
                        onClick={(firstReservation) => setCustomValue('firstReservation', firstReservation)}
                        description={t('descriptionExpG')}
                        value={true}
                        selected={firstReservation==true}
                        label={t("expGuest")}                 
                    />
                </div>
            </div>
        )
    }

    if(step == STEPS.PRICE){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title={t("titlePrice")} subtitle={t("subtitlePrice")}/>
                <Input
                    id="price"
                    label={t("price")}
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if(step == STEPS.DISCOUNT){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title={t("titleDiscounts")} subtitle={t("subtitleDiscounts")}/>
                <div className="grid grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto">
                        <DiscountInput 
                            onClick={(discount) => setCustomValue('discount', discount)}
                            description={t('descriptionD1')}
                            amount={20}
                            selected={discount==20}
                            label={t('discount1')}
                        />
                        <DiscountInput 
                            onClick={(weekDiscount) => setCustomValue('weekDiscount', weekDiscount)}
                            description={t('descriptionD2')}
                            amount={10}
                            selected={weekDiscount==10}
                            label={t('discount2')}
                        />
                        <DiscountInput 
                            onClick={(monthlyDiscount) => setCustomValue('monthlyDiscount', monthlyDiscount)}
                            description={t('descriptionD3')}
                            amount={18}
                            selected={monthlyDiscount==18}
                            label={t('discount3')}
                        />
                </div>
            </div>
        )
    }

    return (
        <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step == STEPS.CATEGORY ? undefined : onBack}
        title="eHome your home!"
        body={bodyContent}
        />
    );
}

export default RentModal;