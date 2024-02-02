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
    
          <div className="  pt-5 grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
              gap-2">
            {guidebooks.map((guidebook: any, index: React.Key | null | undefined) => (
              <div className="overflow-hidden cursor-pointer" key={index}  onClick={() => router.push(`/manage-guidebook/${guidebook.id}`)}>
                <Image
                  alt="Guidebook cover"
                  width={300}
                  height={300}
                  className="object-cover h-full w-full hover:scale-110 transition"
           
                  src={guidebook.coverImage   || "/images/guidebookPlaceholder.png"}
                />
                <div className="relative bottom-10 left-0 w-full bg-opacity-50 bg-black text-white p-2">
                  {/* Truncamiento de texto con elipsis */}
                  <h3 className="truncate">{guidebook.title}</h3>
                  {/* O puedes usar ajuste de texto */}
                  {/* <h3 className="break-words">{guidebook.title}</h3> */}
                  {/* Aquí puedes añadir más detalles de cada guía si lo deseas */}
                </div>
              </div>
            ))}
            <div onClick={handleCreateGuidebook} className="relative cursor-pointer">
              <Image
                  alt="Guidebook cover"
                  width={300}
                  height={300}
                  className="object-cover h-full w-full"
                  src="/images/guidebookPlaceholder.png"
                />
              <h1 className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white " >Crear Guía</h1>
            </div>
          </div>
        </div>
      );
}

export default ManageGuidebookClient;