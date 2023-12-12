'use client';

import { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";


import React, { useEffect } from 'react';

interface GMapProps {
    center?: number[]
}
const GMap: React.FC<GMapProps> = ({
  center
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
      </GoogleMap>
    </>
  );
};

export default GMap;