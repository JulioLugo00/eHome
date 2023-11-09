'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { Carousel } from "react-responsive-carousel";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

interface ListingHeadProps{
    title: string;
    imageSrc: string[];
    id: string;
    currentUser?: SafeUser | null;
    country: string;
    state: string;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    imageSrc,
    id,
    currentUser,
    state,
    country
}) => {
    const {getByValue} = useCountries();
  
    return(
        <>
            <Heading 
                title={title}
                subtitle={`${state}, ${country}`}
            />
            <div className="
                w-full
                h-[60vh]
                overflow-hidden
                relative
            ">
               <Carousel>
                {imageSrc.map((src, index) => (
                <div key={index}>
                <Image 
    src={src} 
    alt={`Listing ${index}`} 
    width={300} // Set a default value for now
    height={300} // Set a default value for now
    className="object-contain h-full w-full"
/>
        </div>
    ))}
</Carousel>
                <div className="absolute top-5 right-5">
                    <HeartButton 
                        listingId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </>
    )
}

export default ListingHead;