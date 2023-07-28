'use client';

import Container from "@/app/[locale]/components/Container";
import Heading from "@/app/[locale]/components/Heading";
import SubHeading from "@/app/[locale]/components/SubHeading";
import InputEdit from "@/app/[locale]/components/inputs/InputEdit";
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
import {AiOutlineArrowRight, AiOutlineArrowLeft} from 'react-icons/ai';

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface EditPricingProps{
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser: SafeUser | null;
}

const EditPricing: React.FC<EditPricingProps> = ({
    listing,
    reservations = [],
    currentUser
}) => { 
    const router = useRouter();
    return(
        <Container>
            <div className="flex flex-col gap-4">
                <Heading title="Precios y disponibilidad" subtitle="Modifica los precios y la disponibilidad de tu propiedad"/>
                <hr/>
                <SubHeading title="Precios"/>
                <hr/>
                <InputEdit title="Precio por noche" value="Tú decides los precios que quieres establecer para tu anuncio." value2={`$${listing.price.toString()}`} onClick={() => {}}/>
                <hr/>
                <InputEdit title="Moneda de los anuncios" value={localStorage.getItem('currency')!} onClick={() => {}}/>
                <hr/>
                <SubHeading title="Descuentos"/>
                <hr/>
                <InputEdit title="Descuento semanal" value={listing.weekDiscount?.toString() + '%'} onClick={() => {}}/>
                <hr/>
                <InputEdit title="Descuento mensual" value={listing.monthlyDiscount?.toString() + '%'} onClick={() => {}}/>
                <hr/>
                <InputEdit title="Descuentos para reservaciones anticipadas" value={'Sin especificar'} onClick={() => {}}/>
                <hr/>
                <InputEdit title="Descuento de última hora" value={'Sin especificar'} onClick={() => {}}/>
                <hr/>
                <SubHeading title="Gastos adicionales"/>
                <hr/>
                <InputEdit title="Tarifa de limpieza" value={'Sin cargos de limpieza'} onClick={() => {}}/>
                <hr/>
                <InputEdit title="Tarifa para mascotas" value={'En este momento no se admiten mascotas'} onClick={() => {}}/>
                <hr/>
                <InputEdit title="Tarifa por huésped adicional" value={'Sin especificar'} onClick={() => {}}/>
                <hr/>
                <InputEdit title="Precio por noche en fin de semana" value={'Sin especificar'} onClick={() => {}}/>
                <hr/>
                <SubHeading title="Impuestos"/>
                <hr/>
                <SubHeading title="Duración del viaje"/>
                <hr/>
                <InputEdit title="Estancia mínima" value={'Sin específicar'} onClick={() => {}}/>
                <hr/>
                <InputEdit title="Estancia máxima" value={'Sin específicar'} onClick={() => {}}/>
                <hr/>
                <InputEdit title="Duraciones de viaje personalizadas" value={'Ninguno'} onClick={() => {}}/>
                <hr/>
                <SubHeading title="Disponibilidad del calendario"/>
                <hr/>
                <InputEdit title="Preaviso" value={'El mismo día, hasta las 9:00'} onClick={() => {}}/>
                <hr/>
                <InputEdit title="Tiempo de preparación" value={'Ninguno'} onClick={() => {}}/>
                <hr/>
                <InputEdit title="Margen de disponibilidad" value={'12 meses de anticipación'} onClick={() => {}}/>
                <hr/>
                <InputEdit title="Días de llegada restringidos" value={'Sin especificar'} onClick={() => {}}/>
                <hr/>
                <SubHeading title="Sincronización del calendario" edit onClick={() => {}}/>
                <hr/>
                <SubHeading title="Preferencias para compartir" edit onClick={() => {}}/>
                <hr/>
                <div className="flex flex-row justify-between items-center">
                    <div className="text-sm font-semibold py-3 px-4 rounded-md hover:bg-neutral-100 underline transition cursor-pointer flex flex-row items-center gap-2" onClick={() => {router.push(`/hosting/listings/${listing.id}`)}}>
                        <AiOutlineArrowLeft />
                        Regresar 
                    </div>
                    <div className="text-sm font-semibold py-3 px-4 rounded-md hover:bg-neutral-100 underline transition cursor-pointer flex flex-row items-center gap-2" onClick={() => {router.push(`/hosting/listings/${listing.id}/rules`)}}>
                        Políticas y Reglas
                        <AiOutlineArrowRight/>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default EditPricing;