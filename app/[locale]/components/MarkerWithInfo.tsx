import React from 'react';
import { MarkerF } from "@react-google-maps/api";
import { useRouter } from 'next-intl/client';

interface MarkerListingProps {
  latitude: number;
  longitude: number;
  text: string;
  id: string;
 
}

const MarkerWithInfo: React.FC<MarkerListingProps> = ({ 
  latitude, longitude, text, id
}) => {
  const router = useRouter();

  const calculateScaledSize = (text: string | any[]) => {
    // Suponiendo que un texto base de 5 caracteres encaja en un icono de 30x30
    const baseTextLength = 8;
    const textLength = text.length;

    // Calcula un factor de escala basado en la longitud del texto
    return new window.google.maps.Size(baseTextLength*textLength, 24);
  };


  const markerIcon = {
    // Ruta a tu icono personalizado de marcador blanco
    url: "/images/priceMarker.png", 
    scaledSize: calculateScaledSize(text),
  };

  const markerLabel = {
    //text: `$${price} ${currency}`,
    text: text,
    color: "black", // Color de la letra
    fontSize: "12px",
    fontWeight: "bold",
  };

  return (
    <MarkerF 
      position={{ lat: latitude, lng: longitude }}
      icon={markerIcon}
      label={markerLabel}
      onClick={() => {
        router.push(`/listings/${id}`);
      }}
    />
  );
};

export default MarkerWithInfo;