'use client';

import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import {useRouter} from 'next-intl/client';
import {useTranslations} from 'next-intl';
import GMap from "../GMap";
import React, { useState, useEffect } from 'react';



interface ListingInfoProps{
    user: SafeUser;
    description: string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    category:{
        icon: IconType;
        label: string;
        description: string;
    }  | undefined
    longitude:  number | null;
    latitude: number | null;

}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    category,
    longitude,
    latitude
}) => {

    const router = useRouter();

    const [currentLocale, setCurrentLocale] = useState("es");
    const t = useTranslations('Index');
    const [translatedDescription, setTranslatedDescription] = useState<string | null>(null);
    
    useEffect(() => {
      // Traduce la descripción al montar el componente
      const extractedLocale = window.location.pathname.split('/')[1];
      const validLocales = ["es", "en"];
    
      if (validLocales.includes(extractedLocale)) {
          setCurrentLocale(extractedLocale);
      }

      fetch('/api/translate', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              text: description,
              targetLanguage: currentLocale, // El idioma de la URL
          }),
      })
      .then(response => response.text())
      .then(data => {
          setTranslatedDescription(data);
      })
      .catch(error => {
          console.error("Error translating description:", error);
      });
  }, [description]);

    return(
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div onClick={() => router.push(`/users/${user?.id}`)} className="
                    text-xl
                    font-semibold
                    flex
                    flex-row
                    items-center
                    gap-2
                    cursor-pointer
                ">
                    <div>{t('hostedBy')} {user?.name}</div>
                    <Avatar src={user?.image}/>
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div>
                        {guestCount} {t('guests').toLowerCase()}
                    </div>
                    <div>
                        {roomCount} {t('rooms').toLowerCase()}
                    </div>
                    <div>
                        {bathroomCount} {t('bathrooms').toLowerCase()}
                    </div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory 
                    icon={category.icon}
                    label={t(category.label)}
                    description={category.description}
                />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500">
            {translatedDescription || description} {/* Muestra la descripción traducida o la original si la traducción no está disponible */}
            </div>
            <hr />
            <GMap center={[latitude || 0, longitude || 0]} />
        </div>
    );
}

export default ListingInfo;