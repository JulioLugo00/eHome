'use client';


import { SafeUser } from "@/app/types";
import React from "react";
import Heading from "../components/Heading";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { id } from "date-fns/locale";
import Image from "next/image";

interface ManageGuidebookClientProps{
    currentUser: SafeUser | null;
    guidebooks: any;
}

const ManageGuidebookClient: React.FC<ManageGuidebookClientProps> = ({
    currentUser,
    guidebooks,
}) => {

    const router = useRouter();

    const handleCreateGuidebook = async () => {
        // Realiza la llamada a la API para crear la guía
        const response = await axios.post('/api/create-guidebook');

        if (response) {
          // Si la llamada a la API fue exitosa, obtén la respuesta
          const idGuidebook = response.data.id;
      
          // Redirige a la página de gestión de guías con el ID de la guía recién creada
          router.push(`/manage-guidebook/${idGuidebook}`);
        } else {
          // Maneja el caso en que la llamada a la API no sea exitosa
          toast.error('Error al crear la guía');
        }
      };

      return (
        <div>
          <Heading
            title={"Tus guias"}
            subtitle={"Las guias son una forma de compartir recomendaciones con tus huéspedes."}
          />
    
          <div className=" py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-7 2xl:grid-cols-8 gap-8">
            {guidebooks.map((guidebook: any, index: React.Key | null | undefined) => (
              <div key={index} className="relative cursor-pointer rounded-lg overflow-hidden" onClick={() => router.push(`/manage-guidebook/${guidebook.id}`)}>
                <Image
                  alt="Guidebook cover"
                  layout="fill"
                  objectFit="cover"
           
                  src={guidebook.coverImage   || "/images/guidebookPlaceholder.png"}
                />
                <div className="absolute bottom-0 left-0 w-full bg-opacity-50 bg-black text-white p-2">
                  {/* Truncamiento de texto con elipsis */}
                  <h3 className="truncate">{guidebook.title}</h3>
                  {/* O puedes usar ajuste de texto */}
                  {/* <h3 className="break-words">{guidebook.title}</h3> */}
                  {/* Aquí puedes añadir más detalles de cada guía si lo deseas */}
                </div>
              </div>
            ))}
            <div className="relative cursor-pointer rounded-lg overflow-hidden">
              <Image
                  alt="Guidebook cover"
                  height="200"
                  width="200"
                  src="/images/guidebookPlaceholder.png"
                />
            <button className="rounded-lg border border-white hover:bg-gray-200 px-1 py-1 mt-4 absolute bottom-1 right-3  text-white p-2" onClick={handleCreateGuidebook}>Crear Guía</button>
            </div>
          </div>
        </div>
      );
}

export default ManageGuidebookClient;