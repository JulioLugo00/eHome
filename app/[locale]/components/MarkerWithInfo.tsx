import React, { useState } from 'react';
import { Marker, InfoWindow } from "@react-google-maps/api";
import {useRouter} from 'next-intl/client';

interface MarkerListingProps {
  latitude: number;
  longitude: number;
  image: string;
  price: string;
  id: string;
  handleClose: any;
}

const MarkerWithInfo: React.FC<MarkerListingProps> = ({ 
    latitude, longitude, image, price, id, handleClose
 }) => {
  const [showInfo, setShowInfo] = useState(true);
  const router = useRouter();

  return (
    <>
      <Marker
        position={{ lat: latitude, lng: longitude }}
        icon={{
          url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        }}
        onClick={() => setShowInfo(!showInfo)}
      />

      {showInfo && (
        <InfoWindow 
          position={{ lat: latitude, lng: longitude }}
          onCloseClick={() => setShowInfo(false)}
        >
           <div onClick={() => {
                    router.push(`/listings/${id}`);
                    handleClose();
                }}>
            <img src={image} alt="Listing Image" width={50} />
            <p>${price}</p>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default MarkerWithInfo;