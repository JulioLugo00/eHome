'use client';

import Container from "@/app/[locale]/components/Container";
import Heading from "@/app/[locale]/components/Heading";
import SubHeading from "@/app/[locale]/components/SubHeading";
import InputEdit from "@/app/[locale]/components/inputs/InputEdit";
import InputTick from "@/app/[locale]/components/inputs/InputTick";
import ListingHead from "@/app/[locale]/components/listings/ListingHead";
import ListingInfo from "@/app/[locale]/components/listings/ListingInfo";
import ListingReservation from "@/app/[locale]/components/listings/ListingReservation";
import { categories } from "@/app/[locale]/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import {useRouter} from 'next-intl/client';
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {AiOutlineArrowRight, AiOutlineArrowLeft} from 'react-icons/ai';

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface EditRulesProps{
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser: SafeUser | null;
}

const EditRules: React.FC<EditRulesProps> = ({
    listing,
    reservations = [],
    currentUser
}) => { 
    const router = useRouter();

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
            pets: 1,
            events: 0,
            smoke: 2,
            photos: 0
        }
    });

    

    const pets = watch('pets');
    const events = watch('events')
    const smoke = watch('smoke')
    const photos = watch('photos')


    const setCustomValue = (id: string, value:any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    }

    return(
        <Container>
            <div className="flex flex-col gap-4">
                <Heading title="Políticas y Reglas" subtitle="Modifica las políticas y reglas de tu propiedad"/>
                <hr/>
                <SubHeading title="Políticas"/>
                <hr/>
                <InputEdit title="Política de cancelación" value={'Sin específicar'} onClick={() => {}}/>
                <hr/>
                <InputEdit title="Reservación inmediata" value={'Reservación inmediata activada'} onClick={() => {}}/>
                <hr/>
                <SubHeading title="Reglas de la casa"/>
                <hr/>
                <InputTick title="Admiten mascotas" value={pets} onChange={(value) => setCustomValue('pets', value)}/>
                <hr/>
                <InputTick title="Se permiten eventos" value={events}onChange={(value) => setCustomValue('events', value)}/>
                <hr/>
                <InputTick title="Esta permitido fumar, vapear y utilizar cigarrillos electrónicos" value={smoke} onChange={(value) => setCustomValue('smoke', value)}/>
                <hr/>
                <InputTick title="Fotografía y video comercial autorizados" value={photos} onChange={(value) => setCustomValue('photos', value)}/>
                <hr/>
                <InputEdit title="Horas de silencio" value={'Sin especificar'} onClick={() => {}}/>
                <hr/>
                <InputEdit title="Margen de llegada" value={'Sin especificar'} onClick={() => {}}/>
                <hr/>
                <InputEdit title="Hora de salida" value={'Sin especificar'} onClick={() => {}}/>
                <hr/>
                <InputEdit title="Número de participantes" value={'Sin especificar'} onClick={() => {}}/>
                <hr/>
                <InputEdit title="Reglas adicionales" value={'Sin especificar'} onClick={() => {}}/>
                <hr/>
                <SubHeading title="Requisitos para los huéspedes"/>
                <hr/>
                <InputEdit title="Foto de perfil obligatoria" value={'Sin especificar'} onClick={() => {}}/>
                <hr/>
                <SubHeading title="Leyes y normas"/>
                <hr/>
                <InputEdit title="Legislación local" onClick={() => {}}/>
                <hr/>
                <InputEdit title="Uso principal del anuncio" value="El espacio está pensado principalmente para los huéspedes" onClick={() => {}}/>
                <hr/>
                <div className="flex flex-row justify-between items-center">
                    <div className="text-sm font-semibold py-3 px-4 rounded-md hover:bg-neutral-100 underline transition cursor-pointer flex flex-row items-center gap-2" onClick={() => {router.push(`/hosting/listings/${listing.id}`)}}>
                        <AiOutlineArrowLeft />
                        Regresar 
                    </div>
                    <div className="text-sm font-semibold py-3 px-4 rounded-md hover:bg-neutral-100 underline transition cursor-pointer flex flex-row items-center gap-2" onClick={() => {router.push(`/hosting/listings/${listing.id}/info-guests`)}}>
                        Información para los huéspedes
                        <AiOutlineArrowRight/>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default EditRules;