'use client';

import { useState, useMemo } from "react";
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

import React, { useEffect } from 'react';

interface AddressSelectProps {
    center?: number[]
}

const AddressSelect: React.FC<AddressSelectProps> = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: ["places"],
      });

      const [selected, setSelected] = useState<{ lat: number, lng: number } | null>(null);
      
      if(!isLoaded) return <div>Loading...</div>
      return <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
    </div>
}
     

const PlacesAutocomplete = ({ setSelected }: { setSelected: (location: { lat: number; lng: number }) => void }) => {
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete();
  
    const handleSelect = async (address: string) => {
      setValue(address, false);
      console.log("AYUDAAAAAAAAAA")
      clearSuggestions();
  
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelected({ lat, lng });
    };
  
    return (
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="combobox-input"
          placeholder="Search an address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    );
  };

  export default AddressSelect;