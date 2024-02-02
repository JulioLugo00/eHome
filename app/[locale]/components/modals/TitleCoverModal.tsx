import React, { useState } from "react";
import Counter from "../inputs/Counter";
import Heading from "../Heading";
import { FaSubway,FaEye, FaHandshake, FaHome, FaPiggyBank, FaCalendarAlt, FaSuitcase,  FaMap, FaMapMarker, FaComments, FaChild  } from "react-icons/fa";
import AddressSelect, { AddressSelectValue } from "../inputs/AddressSelect";
import { CldUploadButton } from "next-cloudinary";
import axios from "axios";
import Image from "next/image";

interface TitleCoverModalProps {
    isOpen: boolean;
    guidebookId: string;

    onConfirm: ( ) => void;
    onCancel: () => void;
}

const TitleCoverModal: React.FC<TitleCoverModalProps> = ({
    isOpen,
    guidebookId,
    onConfirm,
    onCancel,

}) => {
    const [descriptionText, setDescriptionText] = useState("");
    const [image, setImage] = useState<string | null>(null);

    
    const handleUpload = (result: any) => {
      setImage(result.info.secure_url);
      return;
    }

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`/api/update-guidebook`, {
                guidebookId: guidebookId,
                title: descriptionText,
                coverImage: image,
            });
            onConfirm();
        } catch (error) {
            console.error(error);
        }
      onConfirm(); 
    } 

    return (
        <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } bg-black bg-opacity-50`}
    >
       <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">

            <Heading title={"Agrega una portada"} subtitle={""} />
            <h1><strong>Título de la guía</strong></h1>
            <textarea
                id="reviewText"
                name="reviewText"
                rows={1}
                value={descriptionText}
                onChange={(e) => setDescriptionText(e.target.value)}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300"
            />
            
            <div style={{ display: 'flex', alignItems: 'left', paddingTop: 20 }}>
                    {image && (
                        <div >
                            <Image
                                height="288"
                                width="288"
                                    
                                src={image || ""} 
                                alt="Photo" 
                                />
                        </div>
                    )}
                    <div 
                        style={{ marginLeft: image ? "10px" : "0" // Añade margen solo si hay imagen
                    }}>
                        
                        <CldUploadButton 
                        options={{ maxFiles: 1 }} 
                        onUpload={handleUpload} 
                        uploadPreset="hqdfzsel"
                        >
                            <div style={{
                                //backgroundColor: "green", // Establece el color de fondo a verde
                                borderRadius: "8px", // Establece las esquinas redondeadas
                                color: "black", // Establece el color del texto en blanco
                                padding: "10px 20px", // Ajusta el espacio interno del botón
                                cursor: "pointer", // Cambia el cursor al estilo "pointer" al pasar el ratón
                                border: "2px solid black",
                            }}>
                                {image ? "Cambiar foto" : "Añadir portada"}
                            </div>
                        </CldUploadButton>
                    </div>
            </div>
            <div className="flex justify-end mt-4">



            
            <button
              className="px-4 py-2  text-gray-500 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
              onClick={onCancel}
            >
              Cancelar
            </button>
            <div className="pl-5">
          <button
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                onClick={handleUpdate}
              >
                Guardar
          </button>
          </div>
          </div>
            </div>
        </div>
      );
};

export default TitleCoverModal;