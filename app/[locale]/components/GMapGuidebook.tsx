'use client';

import { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker, MarkerF } from "@react-google-maps/api";
import MarkerWithInfo from './MarkerWithInfo';


import React, { useEffect } from 'react';

interface GMapGuidebookProps {
    center?: number[],
    listings?: any,
    zones?: any
    places?: any
    towns?: any
}
const GMapGuidebook: React.FC<GMapGuidebookProps> = ({
  center,
  zones,
  places,
  towns
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });
  
  if(!isLoaded) return <div>Loading...</div>
   
  return (
    <>
      <GoogleMap
        zoom={15}
        center={center ? { lat: center[0], lng: center[1] } : { lat: 44, lng: -80 }}
        mapContainerClassName="map-container"
      >
        {center && <MarkerF visible={false} position={{ lat: center[0], lng: center[1] }}/>}
        {places && places.map((place: { id: string; latitude: number; longitude: number; name: string; }) => (
                      <MarkerWithInfo  id={place.id} latitude={place.latitude} longitude={place.longitude} text={place.name}/>
        ))}
        {places && zones.map((place: { id: string; latitude: number; longitude: number; name: string; }) => (
                      <MarkerWithInfo  id={place.id} latitude={place.latitude} longitude={place.longitude} text={place.name}/>
        ))}
        {places && towns.map((place: { id: string; latitude: number; longitude: number; name: string; }) => (
                      <MarkerWithInfo  id={place.id} latitude={place.latitude} longitude={place.longitude} text={place.name}/>
        ))}
        
      </GoogleMap>
    </>
  );
};

export default GMapGuidebook;