'use client';

import { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker, MarkerF } from "@react-google-maps/api";
import MarkerWithInfo from './MarkerWithInfo';


import React, { useEffect } from 'react';

interface GMapListingsProps {
    center?: number[],
    listings?: any

}
const GMapListings: React.FC<GMapListingsProps> = ({
  center,
  listings,

}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });
  
  if(!isLoaded) return <div>Loading...</div>
  let currency = localStorage.getItem("currency");


  if(currency === null){
    currency = "USD";
  }
   
  return (
    <>
      <GoogleMap
        zoom={13}
        center={center ? { lat: center[0], lng: center[1] } : { lat: 44, lng: -80 }}
        mapContainerClassName="map-container"
      >
        {center && <MarkerF visible={false} position={{ lat: center[0], lng: center[1] }}/>}
        {listings && listings.map((listing: { latitude: any; longitude: any; imageSrc: string[]; price: any; id: any}) => (
         
                      <MarkerWithInfo  id={listing.id} latitude={listing.latitude} longitude={listing.longitude} text={listing.price+" "+ currency} />
                  ))}
        
      </GoogleMap>
    </>
  );
};

export default GMapListings;