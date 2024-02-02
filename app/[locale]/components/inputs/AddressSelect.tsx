import React, { useEffect, useState } from "react";
import {useTranslations} from 'next-intl';
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "@reach/combobox/styles.css";

export type AddressSelectValue = {
  latlng: number[];
  cityGMap?: string;
  name?: string;
};

interface AddressSelectProps {
  value?: AddressSelectValue;
  onChange: (value: AddressSelectValue) => void;
  center?: number[];
}

const AddressSelect: React.FC<AddressSelectProps> = ({ value, onChange }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(
    value ? { lat: value.latlng[0], lng: value.latlng[1] } : null
  );

  useEffect(() => {
    if (value) {
      setSelected({ lat: value.latlng[0], lng: value.latlng[1] });
    }
  }, [value]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="places-container">
      <PlacesAutocomplete onChange={onChange} />
    </div>
  );
};

const PlacesAutocomplete = ({
  onChange
}: {
  onChange: (value: AddressSelectValue) => void;
}) => {
  const { ready, value: inputValue, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete();

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address });
    
    let cityGMap = ""

    console.log("resultados", results)

    for (let i = 0; i < results[0].address_components.length; i++) {
      if (results[0].address_components[i].types.includes('locality')) {
          cityGMap = results[0].address_components[i].long_name;  // o .short_name si prefieres la versión corta
      }
    }
    const hastaLaPrimeraComa = address.split(',')[0];

    const { lat, lng } = await getLatLng(results[0]);
    onChange({ latlng: [lat, lng], cityGMap: cityGMap, name: hastaLaPrimeraComa});
  };

  const t = useTranslations('Index');

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder={t("searchAddress")}
      />
      {status === "OK" && (
        <ul>
          {data.map(({ place_id, description }) => (
            <li key={place_id} onClick={() => handleSelect(description)}>
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressSelect;