import React, { useState } from 'react';
import { Marker, InfoWindow } from "@react-google-maps/api";
import {useRouter} from 'next-intl/client';

interface MarkerListingProps {
  latitude: number;
  longitude: number;

  price: string;
  id: string;
  handleClose: any;
}

const MarkerWithInfo: React.FC<MarkerListingProps> = ({ 
    latitude, longitude, price, id, handleClose
 }) => {
  const [showInfo, setShowInfo] = useState(true);
  const router = useRouter();

  return (
    <>


      {showInfo && (
        <InfoWindow 
          position={{ lat: latitude, lng: longitude }}
        >
           <div onClick={() => {
                    router.push(`/listings/${id}`);
                    handleClose();
                }}>
            <p>${price}</p>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default MarkerWithInfo;