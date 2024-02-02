import React, { useState } from "react";
import Counter from "../inputs/Counter";
import Heading from "../Heading";
import { FaSubway,FaEye, FaHandshake, FaHome, FaPiggyBank, FaCalendarAlt, FaSuitcase,  FaMap, FaMapMarker, FaComments, FaChild  } from "react-icons/fa";
import AddressSelect, { AddressSelectValue } from "../inputs/AddressSelect";
import { CldUploadButton } from "next-cloudinary";
import axios from "axios";
import Image from "next/image";

interface AddToGuideModalProps {
    isOpen: boolean;
    guidebookId: string;

    onConfirm: ( ) => void;
    onCancel: () => void;
}

const AddToGuideModal: React.FC<AddToGuideModalProps> = ({
    isOpen,
    guidebookId,
    onConfirm,
    onCancel,

}) => {
    const [descriptionText, setDescriptionText] = useState("");
    const [categoryText, setCategoryText] = useState("");
    const [titleText, setTitleText] = useState("");
    const [address, setAddress] = useState<AddressSelectValue>();
    const [image, setImage] = useState<string | null>(null);
    const [classification, setClassification] = useState("");
    const categories1 = [
      { text: "Cómo moverse", Icon: FaSubway },
      { text: "No te lo pierdas", Icon: FaEye },
      { text: "Aduanas y cultura", Icon: FaHandshake },
      { text: "Formas de ahorrar", Icon: FaPiggyBank },

    ];

    const categories2 = [

      { text: "Reserva antes de ir", Icon: FaCalendarAlt },
      { text: "Qué empacar", Icon: FaSuitcase },
      { text: "Frases útiles", Icon: FaComments },
      { text: "Viajar con niños", Icon: FaChild },
    ];
    

    
  const buttonStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100px', // Ancho fijo
    height: '100px', // Alto fijo
    margin: '10px',
    border: '1px solid #ccc', // Opcional: bordes para ver los límites de los botones
  };

  const iconStyle = {
    border: '1px solid black', // Borde negro para el icono
    borderRadius: '50%', // Hace que el icono sea circular
    padding: '4px', // Espaciado alrededor del icono
    display: 'flex', // Asegura que el icono esté centrado en el botón
    alignItems: 'center',
    justifyContent: 'center'
  };


    const handleClassificationChange = (event: { target: { value: any; }; }) => {
      setClassification(event.target.value);
    };
    
    const handleUpload = (result: any) => {
      setImage(result.info.secure_url);
      return;
    }

    const handleConfirmPlace = async () => {
      await axios.post('/api/create-place', {
        name: address?.name, // Proporciona el nombre del lugar
        description: descriptionText, // Proporciona la descripción del lugar
        category: categoryText, // Proporciona la categoría del lugar
        classification: classification, // Proporciona la clasificación del lugar
        image: image, // Proporciona la imagen del lugar
        latitude: address?.latlng[0], // Proporciona la latitud del lugar
        longitude: address?.latlng[1], // Proporciona la longitud del lugar
        guidebookId: guidebookId, // Proporciona el ID de la guía
    });
    onConfirm();
    }

    const handleConfirmZone = async () => {
      await axios.post('/api/create-zone', {
        name: address?.name, // Proporciona el nombre del lugar
        description: descriptionText, // Proporciona la descripción del lugar
        image: image, // Proporciona la imagen del lugar
        latitude: address?.latlng[0], // Proporciona la latitud del lugar
        longitude: address?.latlng[1], // Proporciona la longitud del lugar
        guidebookId: guidebookId, // Proporciona el ID de la guía
      });
      onConfirm(); 
    }

    const handleConfirmTown = async () => {
      await axios.post('/api/create-town', {
        name: address?.name, // Proporciona el nombre del lugar
        description: descriptionText, // Proporciona la descripción del lugar
        image: image, // Proporciona la imagen del lugar
        latitude: address?.latlng[0], // Proporciona la latitud del lugar
        longitude: address?.latlng[1], // Proporciona la longitud del lugar
        guidebookId: guidebookId, // Proporciona el ID de la guía
      });
      onConfirm(); 
    } 

    const handleConfirmAdvice = async () => {
      await axios.post('/api/create-advice', {
        category: categoryText, // Proporciona la categoría del lugar
        title: titleText, // Proporciona la descripción del lugar
        body: descriptionText, // Proporciona la imagen del lugar
        
        guidebookId: guidebookId, // Proporciona el ID de la guía
      });
      onConfirm(); 
    } 

    enum OPTIONS {
      SELECT = 0,
      PLACES1 = 1,
      PLACES2 = 2,
      ZONES1 = 3,
      ZONES2 = 4,
      TOWNS1 = 5,
      TOWNS2 = 6,
      ADVICES = 7,
  }

  const [option, setOption] = useState(OPTIONS.SELECT);

  let bodyContent = (
    <div
    className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ${
      isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    } bg-black bg-opacity-50`}
  >
    <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
      <Heading title={"Agrega más información a tu guía"} subtitle={""} />
      <div>
     
      <div
  onClick={() => setOption(OPTIONS.PLACES1)}
  className="flex items-center cursor-pointer"
>
  <FaMapMarker className="mr-2" />
  <div>
    <h1>
      <strong>Lugares</strong>
    </h1>
    <h1>¿A qué lugares deberían ir los viajeros?</h1>
  </div>
</div>
<hr/>
        <div onClick={() => setOption(OPTIONS.ZONES1)} className="flex items-center cursor-pointer">
        <FaMap className="mr-2"/>
        <div>
          <h1>
            <strong>Zonas</strong>
          </h1>
          <h1>¿Cómo es la zona?</h1>
        </div>
        </div>
        <hr/>
        <div onClick={() => setOption(OPTIONS.TOWNS1)} className="flex items-center cursor-pointer">

        <FaHome className="mr-2"/>
        <div>
          <h1>
             <strong>Una ciudad o pueblo</strong>
          </h1>
          <h1>
            Utiliza esta opción para mostrar tu ciudad o recomendar una cercana
          </h1>
        </div>
        </div>
        <hr/>
        <div onClick={() => setOption(OPTIONS.ADVICES)} className="flex items-center cursor-pointer">
        <FaEye className="mr-2" /> 
        <div>
          <h1>
           <strong>Consejos para la ciudad</strong>
          </h1>
          <h1>¿Qué es importante que sepan los viajeros?</h1>
        </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="px-4 py-2 text-gray-500 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
            onClick={onCancel}
          >
            Cancelar
          </button>

        </div>
      </div>
    </div>
  </div>
);

if(option==OPTIONS.PLACES1){
  bodyContent = (
    <div
    className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ${
      isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    } bg-black bg-opacity-50`}
  >
     <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
          
          <h1>Busca un lugar por nombre o dirrección</h1>
          <div className="pb-1.5">
          <AddressSelect
                value={address}
                onChange={(value) => setAddress(value as AddressSelectValue)}
            />
            </div>
          <button
            className="px-4 py-2 text-gray-500 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                onClick={() => setOption(OPTIONS.PLACES2)}
              >
                Continuar
          </button>
          </div>
      </div>
  )
}

if(option==OPTIONS.ZONES1){
  bodyContent = (
    <div
    className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ${
      isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    } bg-black bg-opacity-50`}
  >
     <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
      
          <h1>Busca una zona por nombre</h1>
          <div className="pb-1.5">
          <AddressSelect
                value={address}
                onChange={(value) => setAddress(value as AddressSelectValue)}
          />
          </div>
          <button
            className="px-4 py-2 text-gray-500 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                onClick={() => setOption(OPTIONS.ZONES2)}
              >
                Continuar
          </button>
          </div>
      </div>
  )
}

if(option==OPTIONS.TOWNS1){
  bodyContent = (
    <div
    className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ${
      isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    } bg-black bg-opacity-50`}
  >
     <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">

          <h1>Busca una ciudad o un pueblo</h1>
          <div className="pb-1.5">
          <AddressSelect
                value={address}
                onChange={(value) => setAddress(value as AddressSelectValue)}
            />
            </div>
          <button
            className="px-4 py-2 text-gray-500 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                onClick={() => setOption(OPTIONS.TOWNS2)}
              >
                Continuar
          </button>
          </div>
      </div>
  )
}

if(option==OPTIONS.PLACES2){
  bodyContent = (
    <div
    className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ${
      isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    } bg-black bg-opacity-50`}
  >
     <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
     <div style={{ display: 'flex', alignItems: 'left' }}>
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
        <div style={{
       
       marginLeft: image ? "10px" : "0" // Añade margen solo si hay imagen
        }}>
        <Heading title={address?.name|| ""} subtitle={""} />
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
        {image ? "Cambiar foto" : "Añadir foto"}
        </div>
      </CldUploadButton>
      </div>
      </div>

          <h1><strong>¿Por qué recomiendas este lugar?</strong></h1>
          <h1>Escribe un consejo que ayude a los viajeros a aprovechar al máximo su visita</h1>
          <textarea
              id="reviewText"
              name="reviewText"
              rows={4}
              value={descriptionText}
              onChange={(e) => setDescriptionText(e.target.value)}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300"
            />

          <h1><strong>Clasifica este lugar</strong></h1>
          <h1>Organiza tus recomendaciones por tema para que los viajeros encuentren lo que buscan con más facilidad"</h1>
          <div>
          <label>
        <input 
          type="radio" 
          value="Gastronomía" 
          checked={classification === "Gastronomía"} 
          onChange={handleClassificationChange}
        />
        Gastronomía
      </label>
      </div>
      <div>
      <label>
        <input 
          type="radio" 
          value="Lugares emblemáticos" 
          checked={classification === "Lugares emblemáticos"} 
          onChange={handleClassificationChange}
        />
        Lugares emblemáticos
      </label>
      </div>

          <h1><strong>Crea una categoría</strong></h1>
          <h1>Ejemplo: "Excelente lugar para divertirte"</h1>
          <textarea
              id="reviewText"
              name="reviewText"
              rows={4}
              value={categoryText}
              onChange={(e) => setCategoryText(e.target.value)}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300"
            />
          
          <button
            className="px-4 py-2 text-gray-500 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
            onClick={onCancel}
          >
            Cancelar
          </button>
      
          <button
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                onClick={handleConfirmPlace}
              >
                Guardar
          </button>
          </div>
      </div>
  )
}


  if(option==OPTIONS.ZONES2){
    bodyContent = (
      <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } bg-black bg-opacity-50`}
    >
       <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
       <div style={{ display: 'flex', alignItems: 'left' }}>
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
        <div style={{
       
       marginLeft: image ? "10px" : "0" // Añade margen solo si hay imagen
        }}>
        <Heading title={address?.name || ""} subtitle={""} />
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
        {image ? "Cambiar foto" : "Añadir foto"}
        </div>
      </CldUploadButton>
      </div>
      </div>
      

            <h1><strong>¿Cómo es esta zona?</strong></h1>
            <h1>Los viajeros quieren conocer el ambiente y las caracteristicas unicas de la zona</h1>
            <textarea
                id="reviewText"
                name="reviewText"
                rows={4}
                value={descriptionText}
                onChange={(e) => setDescriptionText(e.target.value)}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300"
              />
            <button
              className="px-4 py-2 text-gray-500 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
              onClick={onCancel}
            >
              Cancelar
            </button>
          <button
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                onClick={handleConfirmZone}
              >
                Guardar
          </button>
            </div>
        </div>
    )
  }

  if(option==OPTIONS.TOWNS2){
    bodyContent = (
      <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } bg-black bg-opacity-50`}
    >
       <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
       <div style={{ display: 'flex', alignItems: 'left' }}>
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
        <div style={{
       
       marginLeft: image ? "10px" : "0" // Añade margen solo si hay imagen
        }}>
        <Heading title={address?.name || ""} subtitle={""} />
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
        {image ? "Cambiar foto" : "Añadir foto"}
        </div>
      </CldUploadButton>
      </div>
      </div>
            <h1><strong>¿Cómo es esta ciudad o este pueblo?</strong></h1>
            <h1>A los viajeros les encanta saber qué hace de cada sitio un lugar tan especial</h1>
            <textarea
                id="reviewText"
                name="reviewText"
                rows={4}
                value={descriptionText}
                onChange={(e) => setDescriptionText(e.target.value)}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300"
              />
            <button
              className="px-4 py-2 text-gray-500 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
              onClick={onCancel}
            >
              Cancelar
            </button>
          <button
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                onClick={handleConfirmTown}
              >
                Guardar
          </button>
            </div>
        </div>
    )
  }

  if(option==OPTIONS.ADVICES){
    bodyContent = (
      <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } bg-black bg-opacity-50`}
    >
       <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
       <Heading title="¿Sobre qué es tu consejo?" subtitle={""} />
       <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {categories1.map((category, index) => (
          <div key={index}>
            <button onClick={() => setCategoryText(category.text)} style={{display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '140px', // Ancho fijo
    height: '100px', // Alto fijo
    margin: '2px',
   }}>
              <category.Icon style={iconStyle} size={30} />
              <div>{category.text}</div>
            </button>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {categories2.map((category, index) => (
          <div key={index}>
            <button onClick={() => setCategoryText(category.text)} style={{display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '140px', // Ancho fijo
    height: '100px', // Alto fijo
    margin: '2px',
    }}>
              <category.Icon style={iconStyle} size={30} />
              <div>{category.text}</div>
            </button>
          </div>
        ))}
      </div>
            <h1><strong>Comparte tu consejo</strong></h1>
            <h1>Por ejemplo: "Evita los cubos de hielo en las bebidas"</h1>
            <textarea
                id="titleText"
                name="titleText"
                rows={4}
                value={titleText}
                onChange={(e) => setTitleText(e.target.value)}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300"
            />

            <h1><strong>Agrega información</strong></h1>
            <h1>Ofrece a los viajeros consejos rapidos y fáciles"</h1>
            <textarea
                id="reviewText"
                name="reviewText"
                rows={4}
                value={descriptionText}
                onChange={(e) => setDescriptionText(e.target.value)}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300"
            />
            <button
              className="px-4 py-2 text-gray-500 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                onClick={handleConfirmAdvice}
              >
                Guardar
          </button>
            </div>
        </div>
    )
  }

    return (
        bodyContent
      );
};

export default AddToGuideModal;