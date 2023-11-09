'use client';

import { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import MarkerWithInfo from './MarkerWithInfo';


import React, { useEffect } from 'react';

interface GMapListingsProps {
    center?: number[],
    listings?: any
    handleClose: any
}
const GMapListings: React.FC<GMapListingsProps> = ({
  center,
  listings,
  handleClose
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });
  
  if(!isLoaded) return <div>Loading...</div>
   
  return (
    <>
      <GoogleMap
        zoom={10}
        center={center ? { lat: center[0], lng: center[1] } : { lat: 44, lng: -80 }}
        mapContainerClassName="map-container"
      >
        {center && <Marker position={{ lat: center[0], lng: center[1] }}/>}
        {listings && listings.map((listing: { latitude: any; longitude: any; imageSrc: string[]; price: any; id: any}, index: React.Key | null | undefined) => (
         
                      <MarkerWithInfo key={index} id={listing.id} latitude={listing.latitude} longitude={listing.longitude} image={listing.imageSrc[0]} price={listing.price} handleClose={handleClose} />
                  ))}
        
      </GoogleMap>
    </>
  );
};

export default GMapListings;