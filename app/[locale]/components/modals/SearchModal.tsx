    'use client';

import qs from "query-string";
import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import {useRouter} from 'next-intl/client';
import {usePathname} from 'next-intl/client';
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import { formatISO, set } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import {useTranslations} from 'next-intl';
import GMap from "../GMap";
import CountryInput, { CountryValue } from "../inputs/CountryInput";
import AddressSelect, { AddressSelectValue } from "../inputs/AddressSelect";
import getListings from "@/app/actions/getListings";
import GMapListings from "../GMapListings";
import { SafeListing } from "@/app/types";
import axios from "axios";

enum STEPS{
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModal = () => {
    const t = useTranslations('Index');
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();
    const [address, setAddress] = useState<AddressSelectValue>();
    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);

    const [listings, setListings] = useState<SafeListing[]>([]);

    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const onBack = useCallback(() => {
        setStep((value) => value-1);
    }, []);

    const handleCloseModal = () => {
        searchModal.onClose();
    }

    const onNext = useCallback(() => {
        setStep((value) => value+1);
    }, []);

    const onSubmit = useCallback(async () => {
        if(step != STEPS.INFO){
            return onNext();
        }

        let currentQuery = {};

        if(params){
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ... currentQuery,
            cityGMap: address?.cityGMap,
            guestCount,
            roomCount,
            bathroomCount
        };

        if(dateRange.startDate){
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if(dateRange.endDate){
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url:'/',
            query: updatedQuery
        }, {skipNull: true});

        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url);

    }, [step, searchModal, router, guestCount, roomCount, bathroomCount, dateRange, onNext, params, address]);

    const actionLabel = useMemo(() => {
        if(step == STEPS.INFO){
            return t('search');
        }

        return t('next');
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if(step == STEPS.LOCATION){
            return undefined;
        }

        return t('back');
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title={t('titleWhere')}
                subtitle={t('subtitleWhere')}
            />
            <AddressSelect
                value={address}
                onChange={(value) => setAddress(value as AddressSelectValue)}
            />
        </div>
    )

    if(step == STEPS.DATE){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title={t('titleDate')}
                    subtitle={t('subtitleDate')}
                />
                <Calendar
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        )
    }

    if(step == STEPS.INFO){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title={t('titleSInfo')}
                    subtitle={t('subtitleSInfo')}
                />
                <Counter
                    title={t('guests')}
                    subtitle={t('guestsNeed')}
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)}
                />
                <Counter
                    title={t('rooms')}
                    subtitle={t('roomsNeed')}
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)}
                />
                <Counter
                    title={t('bathrooms')}
                    subtitle={t('bathroomsNeed')}
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value)}
                />
            </div>
        )
    }

    return(
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title={t('filters')}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step == STEPS.LOCATION ? undefined : onBack}
            body={bodyContent}
        />
    );
}

export default SearchModal;