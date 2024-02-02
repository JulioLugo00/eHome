'use client';

import { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker, MarkerF } from "@react-google-maps/api";


import React, { useEffect } from 'react';

interface GMapProps {
    center?: number[]
}
const GMap: React.FC<GMapProps> = ({
  center
}) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  if(!isLoaded) return <div>Loading...</div>
   
  return (
    <>
      <GoogleMap
        zoom={15}
        center={{ lat: center?.[0] ?? 19, lng: center?.[1] ?? -97 }}
        mapContainerClassName="map-container"
        onLoad={() => {
          console.log("Map loaded successfully");
          setMapLoaded(true);
        }}
      >
        {mapLoaded && center && (
  <MarkerF

    
    position={{ lat: center[0], lng: center[1] }}
    zIndex={999888888888} // Agrega un valor alto de z-index
  />
)}
      </GoogleMap>
    </>
  );
};

export default GMap;