'use client';


import { SafeUser } from "@/app/types";
import React, { useState } from "react";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { id } from "date-fns/locale";
import Heading from "../../components/Heading";
import AddToGuideModal from "../../components/modals/AddToGuideModal";
import TitleCoverModal from "../../components/modals/TitleCoverModal";
import Image from "next/image";
import GMapGuidebook from "../../components/GMapGuidebook";

interface ManageGuidebookClientIdProps{
    currentUser: SafeUser | null;
    guidebook: any;
    zones: any;
    places: any;
    towns: any;
    advices: any;
}

const ManageGuidebookClientId: React.FC<ManageGuidebookClientIdProps> = ({
    currentUser,
    guidebook,
    zones,
    places,
    towns,
    advices
}) => {

    const router = useRouter();
const [isManageGuidebookModalOpen, setIsManageGuidebookModalOpen] = useState(false);
const [isTitleCoverModalOpen, setIsTitleCoverModalOpen] = useState(false);

const handleCancelAddToGuide = () => {
    // Cierra el modal de confirmación
    setIsManageGuidebookModalOpen(false);
};

const handleConfirmAddToGuide = () => {
    // Cierra el modal de confirmación
    setIsManageGuidebookModalOpen(false);
    router.refresh();
};

const handleCancelTitleCover = () => {
  // Cierra el modal de confirmación
  setIsTitleCoverModalOpen(false);
};

const handleConfirmTitleCover = () => {
  // Cierra el modal de confirmación
  setIsTitleCoverModalOpen(false);
  router.refresh();
};

return (
  <div >
    {isManageGuidebookModalOpen && (
      <AddToGuideModal
        guidebookId={guidebook.id}
        isOpen={isManageGuidebookModalOpen}
        onConfirm={handleConfirmAddToGuide}
        onCancel={handleCancelAddToGuide}
      />
    )}
    {isTitleCoverModalOpen && (
      <TitleCoverModal
        guidebookId={guidebook.id}
        isOpen={isTitleCoverModalOpen}
        onConfirm={handleConfirmTitleCover}
        onCancel={handleCancelTitleCover}
      />
    )}






    <div className="flex items-center justify-center">
      <div>
        <Heading title={guidebook?.title ?? ""} subtitle={""} />
        <div>
          <button className="rounded-lg border border-black hover:bg-gray-200 px-4 py-2 mt-4"
          onClick={() => setIsTitleCoverModalOpen(true)}
          >
            Editar título y portada
          </button>
          <button className="rounded-lg border border-black hover:bg-gray-200 px-4 py-2 mt-4">
            Seleccionar anuncios
          </button>
        </div>
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'row'}}>
    <div style={{ width: '50%', overflowY: 'auto' }}>


    {places.length > 0 && (
        <h1><strong>Lugares</strong></h1>
    )}
    <div>
      {places.map((place: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactFragment | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined; image: string | undefined; clasification: string | number | boolean | React.ReactFragment | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined; description: string | number | boolean | React.ReactFragment | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined; category: string | number | boolean | React.ReactFragment | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined; latitude: string | number | boolean | React.ReactFragment | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined; longitude: string | number | boolean | React.ReactFragment | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined; }) => (
        <div key={place.id}>
          <h2>{place.name}</h2>
          {place.image && (
            <img src={place.image} style={{ width: '100px', height: '100px' }} />
          )}
          <p>Clasificación: {place.clasification}</p>
          <p>Descripción: {place.description}</p>
          <p>Categoría: {place.category}</p>
          <p>Ubicación: {place.latitude}, {place.longitude}</p>
          <hr/>
        </div>
      ))}
    </div>

    {zones.length > 0 && (
        <h1><strong>Zonas</strong></h1>
    )}
    <div>
      {zones.map((zone: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactFragment | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactPortal | null | undefined; image: string | undefined; description: string | number | boolean | React.ReactFragment | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactPortal | null | undefined; latitude: string | number | boolean | React.ReactFragment | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactPortal | null | undefined; longitude: string | number | boolean | React.ReactFragment | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactPortal | null | undefined; } ) => (
        <div key={zone.id}>
          <h2>{zone.name}</h2>
          {zone.image && (
            <img src={zone.image} style={{ width: '100px', height: '100px' }} />
          )}
        
          <p>Descripción: {zone.description}</p>
          <p>Ubicación: {zone.latitude}, {zone.longitude}</p>
          <hr/>
         
        </div>
      ))}
    </div>
    
    {towns.length > 0 && (
        <h1><strong>Pueblos</strong></h1>
    )}
    <div>
      {towns.map((town: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactFragment | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactPortal | null | undefined; image: string | undefined; description: string | number | boolean | React.ReactFragment | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactPortal | null | undefined; latitude: string | number | boolean | React.ReactFragment | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactPortal | null | undefined; longitude: string | number | boolean | React.ReactFragment | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactPortal | null | undefined; } ) => (
        <div key={town.id}>
          <h2>{town.name}</h2>
          {town.image && (
            <img src={town.image} style={{ width: '100px', height: '100px' }} />
          )}
        
          <p>Descripción: {town.description}</p>
          <p>Ubicación: {town.latitude}, {town.longitude}</p>
          <hr/>
         
        </div>
      ))}
    </div>
    <div>
      {advices.map((advice: { id: React.Key | null | undefined; category: string | number | boolean | React.ReactFragment | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined; title: string | number | boolean | React.ReactFragment | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined; body: string | number | boolean | React.ReactFragment | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined; } ) => (
        <div key={advice.id}>
          <h2>{advice.category}</h2>
         
        
          <p>Descripción: {advice.title}</p>
          <p>Ubicación: {advice.body}</p>
          <hr/>
         
        </div>
      ))}
      </div>
      
    </div>
    <div className="hidden md:block" style={{ width: '30%', position: 'fixed', right: 0, top: 0, bottom: 80, overflowY: 'auto' }}> {/* Ajusta el ancho según sea necesario */}
                        {/* Componente del mapa, ocupando toda la altura de la pantalla */}
                        <GMapGuidebook center={[zones[0].latitude, zones[0].longitude]} zones={zones} towns={towns} places={places} />

    </div>
    </div>



   




    <div className="fixed bottom-4 right-4">
      <button
        className="rounded-lg border border-white bg-black hover:bg-gray-800 text-white px-4 py-2 focus:outline-none"
        onClick={() => setIsManageGuidebookModalOpen(true)}
      >
        Agregar a la guía
      </button>
    </div>
  </div>

);
}

export default ManageGuidebookClientId;