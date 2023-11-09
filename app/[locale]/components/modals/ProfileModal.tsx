'use client';

import useProfileModal from "@/app/hooks/useProfileModal";
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
import BooleanInput from "../inputs/BooleanInput";
import ReservationInput from "../inputs/ReservationInput";
import TypeInput from "../inputs/TypeInput";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineMeetingRoom } from "react-icons/md";
import {RiParentFill} from "react-icons/ri";
import {useTranslations} from 'next-intl';
import getCurrentUser from "@/app/actions/getCurrentUser";
import { useSession } from 'next-auth/react';
import { SafeUser } from "@/app/types";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Importa los estilos del DatePicker

enum STEPS {
    WORK = 0,
    FUNFACT = 1,
    PETS = 2,
    SPENDTIME = 3,
    BIOGRAPHY = 4,
    LIVEIN = 5,
    SONG = 6,
    GUESTATTENTION = 7,
    BIRTHDATE = 8,
    OBSESSED = 9,
    LANGUAGES = 10,
    BREAKFAST = 11,
    DESCRIPTION = 12
}

interface ProfileModalProps{
    userId?: { userId: string; } | { userId?: undefined; };
    currentUser: SafeUser | null;
}

const ProfileModal:React.FC<ProfileModalProps> = ({
    userId,
    currentUser
}) => {
    const router = useRouter();
    const profileModal = useProfileModal();
    const t = useTranslations('Index');
    const [step, setStep] = useState(STEPS.WORK);
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
            work: '',
            funFact: '',
            pets: '',
            spendTime: '',
            biography: '',
            liveIn: '',
            song: '',
            guestAttention: '',
            birthdate: null,
            obsessed: '',
            languages: '',
            breakfast: '',
            description: '',
            createdProfile: true,
        }
    });

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

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if(step != STEPS.DESCRIPTION){
            return onNext();
        }

        setIsLoading(true);

        if (typeof userId?.userId === 'string') {
            

            try {
                const response = await axios.put(`/api/users/${userId?.userId}`, data);
                if (response.status === 200) {
                  toast.success('Perfil actualizado');
                router.refresh();
                reset();
                setStep(STEPS.WORK);
                profileModal.onClose();
                  // Realiza cualquier acción adicional que necesites después de la actualización
                } else {
                  toast.error('Error al actualizar el perfil');
                }
              } catch (error) {
                toast.error('Error al actualizar el perfil');
              } finally {
                setIsLoading(false);
              }
        }
    }

    const actionLabel = useMemo(() => {
        if(step == STEPS.DESCRIPTION){
            return t('create');
        }

        return t('next');
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if(step == STEPS.WORK){
            return undefined;
        }

        return t('back');
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title={t("titleWork")} subtitle={t("subtitleWork")}/>
            <Input 
                id="work"
                label={t("work")}
                disabled={isLoading}
                register={register}
                errors={errors}
            />
        </div>
    )

    if(step == STEPS.FUNFACT){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title={t("titleFunFact")} subtitle={t("subtitleFunFact")}/>
                <Input 
                    id="funFact"
                    label={t("fun")}
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                />
            </div>
        )
    }

    if(step == STEPS.PETS){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title={t("titlePets")} subtitle={t("subtitlePets")}/>
                <Input 
                    id="pets"
                    label={t("Pets")}
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                />
            </div>
        )
    }

    if(step == STEPS.SPENDTIME){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title={t("titleSpendTime")} subtitle={t("subtitleSpendTime")}/>
                <Input 
                    id="spendTime"
                    label={t("spend")}
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                />
            </div>
        )
    }

    if(step == STEPS.BIOGRAPHY){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title={t("titleBiography")} subtitle={t("subtitleBiography")}/>
                <Input 
                    id="biography"
                    label={t("biografhy")}
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                />
            </div>
        )
    }

    if(step == STEPS.LIVEIN){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title={t("titleLiveIn")} subtitle={t("subtitleLiveIn")}/>
                <Input 
                    id="liveIn"
                    label={t("live")}
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                />
            </div>
        )
    }

    if(step == STEPS.SONG){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title={t("titleSong")} subtitle={t("subtitleSong")}/>
                <Input 
                    id="song"
                    label={t("song")}
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                />
            </div>
        )
    }

    if(step == STEPS.GUESTATTENTION){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title={t("titleGuestAttention")} subtitle={t("subtitleGuestAttention")}/>
                <Input 
                    id="guestAttention"
                    label={t("guestA")}
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                />
            </div>
        )
    }

    if(step == STEPS.BIRTHDATE){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title={t("titleBirthdate")} subtitle={t("subtitleBirthdate")}/>
                <DatePicker
                    id="birthdate"
                    selected={watch("birthdate")}
                    onChange={(date) => setCustomValue("birthdate", date)}
                    dateFormat="dd/MM/yyyy"
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText="Select a date"
                    disabled={isLoading}
                    className="input"
/>
            </div>
        )
    }

    if(step == STEPS.OBSESSED){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title={t("titleObsessed")} subtitle={t("subtitleObsessed")}/>
                <Input 
                    id="obsessed"
                    label={t("obsessed")}
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                />
            </div>
        )
    }

    if(step == STEPS.LANGUAGES){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title={t("titleLanguages")} subtitle={t("subtitleLanguages")}/>
                <Input 
                    id="languages"
                    label={t("subtitleLanguages")}
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                />
            </div>
        )
    }

    if(step == STEPS.BREAKFAST){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title={t("titleBreakfast")} subtitle={t("subtitleBreakfast")}/>
                <Input 
                    id="breakfast"
                    label={t("subtitleBreakfast")}
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                />
            </div>
        )
    }

    if(step == STEPS.DESCRIPTION){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title={"¿Quién eres?"} subtitle={"Cuentanos un poco de ti"}/>
                <Input 
                    id="description"
                    label={"Descripción"}
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                />
            </div>
        )
    }

    return (
        <Modal
        isOpen={profileModal.isOpen}
        onClose={profileModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step == STEPS.WORK ? undefined : onBack}
        title="eHome your home!"
        body={bodyContent}
        />
    );
}

export default ProfileModal;