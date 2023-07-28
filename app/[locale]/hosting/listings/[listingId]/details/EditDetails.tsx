'use client';

import Container from "@/app/[locale]/components/Container";
import Heading from "@/app/[locale]/components/Heading";
import SubHeading from "@/app/[locale]/components/SubHeading";
import Counter from "@/app/[locale]/components/inputs/Counter";
import InputEdit from "@/app/[locale]/components/inputs/InputEdit";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import {useRouter} from 'next-intl/client';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useCountries from "@/app/hooks/useCountries";
import Carrousel from "@/app/[locale]/components/inputs/Carrousel";
import CardInput from "@/app/[locale]/components/inputs/CardInput";
import {AiOutlineArrowRight, AiOutlineArrowLeft} from 'react-icons/ai';
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface EditDetailsProps{
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser: SafeUser | null;
}

const EditDetails: React.FC<EditDetailsProps> = ({
    listing,
    reservations = [],
    currentUser
}) => { 

    const router = useRouter();

    const {getByValue} = useCountries();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            type: '',
            location: null,
            guestCount: listing.guestCount,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: "",
            description: "",
            discount: 0,
            weekDiscount: 0,
            monthlyDiscount: 0,
            firstReservation: false,
        }
    });

    const initialShowStates = Array(12).fill(false);
    const [showCardInputs, setShowCardInputs] = useState(initialShowStates);

    const handleInputEditClick = (index: number) => {
        const newShowStates = [...showCardInputs];
        newShowStates[index] = !newShowStates[index];
        setShowCardInputs(newShowStates);
    }


    const onSave = (data:any, index?: number) => {
        axios.put('/api/listings/'+listing.id, data)
        .then(() => {
            toast.success('Property Updated!');
            router.refresh();
            reset();
            if(index || index == 0){
                handleInputEditClick(index);
            }
        })
        .catch(() => {
            toast.error('Something went wrong')
        })
    }

    
    return(
        <Container>
            <div className="flex flex-col gap-4">
                <Heading title="Información del alojamiento" subtitle="Modifica los detalles de tu propiedad"/>
                <hr/>
                <SubHeading title="Fotos"/>
                <Carrousel image={listing.imageSrc}/>     {/* FALTA COMPLETAR */}
                <hr/>
                <SubHeading title="Información básica del anuncio"/>
                {!showCardInputs[0] && (
                <InputEdit title="Título del anuncio" value={listing.title} onClick={() => {handleInputEditClick(0)}}/>
                )}
                {showCardInputs[0] && (
                    <CardInput 
                        id="title"
                        index={0}
                        label="Título del anuncio"
                        value={listing.title}
                        cancelAction={() => {handleInputEditClick(0)}}
                        onSave={onSave}
                        instructions={'El título de tu anuncio debe destacar lo más especial de tu alojamiento. Consulta las pautas para los títulos de los anuncios.'}
                    />
                )}
                <hr/>
                {!showCardInputs[1] && (
                <InputEdit title="Descripción del alojamiento" value={listing.description} onClick={() => {handleInputEditClick(1)}}/>
                )}
                {showCardInputs[1] && (
                    <CardInput 
                        id="description"
                        label="Descripción del alojamiento"
                        value={listing.description}
                        onSave={onSave}
                        index={1}
                        cancelAction={() => {handleInputEditClick(1)}}
                        instructions={'Ofrece a los huéspedes una idea de cómo es quedarse en tu espacio, incluida la razón por la que les encantará quedarse allí.'}
                    />
                )}
                <hr/>
                <Counter title="Número de participantes" value={listing.guestCount} styleEdit onChange={(value) => {
                                                                                                onSave({'guestCount': value});
                                                                                                }}/>
                <hr/>
                {!showCardInputs[2] && (
                <InputEdit title="Enlace personalizado" value={false ? listing.id : 'Sin especificar'} onClick={() => {handleInputEditClick(2)}}/>
                )}
                {showCardInputs[2] && (
                    <CardInput 
                        id="link"
                        label="Enlace personalizado"
                        value={'Sin especificar'}  // FALTA EN LA BASE DE DATOS
                        cancelAction={() => {handleInputEditClick(2)}}
                        onSave={onSave}
                        index={2}
                        instructions={'Un enlace único y fácil de recordar puede ayudarte a compartir tu anuncio en tarjetas presentación, sitios web o redes sociales. P. ej.: e-home.mx/h/habitacion-privada-centro-barcelona. Revisa nuestra política para enlaces personalizados'}
                    />
                )}
                <hr/>
                {!showCardInputs[3] && (
                <InputEdit title="Idiomas" value={false ? listing.id : 'Sin especificar'} onClick={() => {handleInputEditClick(3)}}/>
                )}
                {showCardInputs[3] && (      // CAMBIAR TIPO DE INPUT
                    <CardInput 
                        id="languages"
                        label="Idiomas"
                        value={'Sin especificar'}  // FALTA EN LA BASE DE DATOS
                        cancelAction={() => {handleInputEditClick(3)}}
                        onSave={onSave}
                        index={3}
                        instructions={'Escribe los detalles de algunos ajustes en un idioma diferente al predeterminado. A los huéspedes se les muestran traducciones automáticas para los idiomas que no agregues aquí.'}
                    />
                )}
                <hr/>
                {!showCardInputs[4] && (
                <InputEdit title="Estado del anuncio" value={true ? 'Publicado - Los viajeros pueden reservar y encontrar tu lugar' : 'No publicado - Los viajeros no pueden reservar ni encontrar tu alojamiento en los resultados de búsqueda'} onClick={() => {handleInputEditClick(4)}}/>
                )}
                {showCardInputs[4] && (        // CAMBIAR TIPO DE INPUT
                    <CardInput 
                        id="state"
                        label="Estado del anuncio"
                        value={'Publicado - Los viajeros pueden reservar y encontrar tu lugar'}  // FALTA EN LA BASE DE DATOS
                        cancelAction={() => {handleInputEditClick(4)}}
                        onSave={onSave}
                        index={4}
                        instructions={'¿Qué significan los diferentes estados?'}
                    />
                )}
                <hr/>
                <SubHeading title="Servicios"/>  {/* FALTA COMPLETAR */ }
                <hr/>
                <SubHeading title="Ubicación"/>
                <hr/>
                {!showCardInputs[5] && (
                <InputEdit title="Dirección" value={`${getByValue(listing.locationValue)?.region}, ${getByValue(listing.locationValue)?.label}`} onClick={() => {handleInputEditClick(5)}}/>
                )}
                {showCardInputs[5] && (        // CAMBIAR TIPO DE INPUT
                    <CardInput 
                        id="location"
                        label="Dirección"
                        value={`${getByValue(listing.locationValue)?.region}, ${getByValue(listing.locationValue)?.label}`}  
                        cancelAction={() => {handleInputEditClick(5)}}
                        onSave={onSave}
                        index={5}
                        instructions={'Indica la ubicación de la propiedad'}
                    />
                )}
                <hr/>
                {!showCardInputs[6] && (
                <InputEdit title="Descripción de la zona" value={'Sin especificar'} onClick={() => {handleInputEditClick(6)}}/>
                )}
                {showCardInputs[6] && (        
                    <CardInput 
                        id="descriptionLocation"
                        label="Descripción de la zona"
                        value={`Sin especificar`}          // FALTA EN LA BASE DE DATOS
                        cancelAction={() => {handleInputEditClick(6)}}
                        onSave={onSave}
                        index={6}
                        instructions={'Comparte algunos aspectos destacados sobre el barrio.'}
                    />
                )}
                <hr/>
                {!showCardInputs[7] && (
                <InputEdit title="Cómo moverse por la zona" value={'Sin especificar'} onClick={() => {handleInputEditClick(7)}}/>
                )}
                {showCardInputs[7] && (        
                    <CardInput 
                        id="transportLocation"
                        label="Cómo moverse por la zona"
                        value={`Sin especificar`}          // FALTA EN LA BASE DE DATOS
                        cancelAction={() => {handleInputEditClick(7)}}
                        onSave={onSave}
                        index={7}
                        instructions={'Informa a los huéspedes cómo pueden moverse por el barrio y cómo se maneja el estacionamiento.'}
                    />
                )}
                <hr/>
                {!showCardInputs[8] && (
                <InputEdit title="Compartir la ubicación" value={'Ubicación general'} onClick={() => {handleInputEditClick(8)}}/>
                )}
                {showCardInputs[8] && (    // CAMBIAR TIPO DE INPUT
                    <CardInput 
                        id="puntualLocation"
                        label="Compartir la ubicación"
                        value={`Sin especificar`}          // FALTA EN LA BASE DE DATOS
                        cancelAction={() => {handleInputEditClick(8)}}
                        onSave={onSave}
                        index={8}
                        instructions={'Elija cómo se muestra la ubicación de su anuncio a los huéspedes antes de reservar.'}
                    />
                )}
                <hr/>
                {!showCardInputs[9] && (
                <InputEdit title="Vistas panorámicas" onClick={() => {handleInputEditClick(9)}}/>
                )}
                {showCardInputs[9] && (    // CAMBIAR TIPO DE INPUT
                    <CardInput 
                        id="puntualLocation"
                        label="Vistas panorámicas"
                        value={`Sin especificar`}          // FALTA EN LA BASE DE DATOS
                        cancelAction={() => {handleInputEditClick(9)}}
                        onSave={onSave}
                        index={9}
                        instructions={'Vistas tan increíbles que sorprenderán a todos los huéspedes.'}
                    />
                )}
                <hr/>
                <SubHeading title="Propiedad y habitaciones"/>
                <hr/>
                {!showCardInputs[10] && (
                <InputEdit title="Tipo de propiedad" value={listing.type} onClick={() => {handleInputEditClick(10)}}/>
                )}
                {showCardInputs[10] && (   // CAMBIAR TIPO DE INPUT
                    <CardInput 
                        id="type"
                        label="Tipo de propiedad"
                        value={listing.type}
                        cancelAction={() => {handleInputEditClick(10)}}
                        onSave={onSave}
                        index={10}
                        instructions={'Selecciona el tipo de propiedad que más se parezca a tu alojamiento para que los huéspedes se hagan una idea de cómo será su estancia y para que tu anuncio aparezca en las búsquedas correctas.'}
                    />
                )}
                <hr/>
                {!showCardInputs[11] && (
                <InputEdit title="Habitaciones y espacios" 
                           value={`Recámaras: ${listing.roomCount}`} value2={`Baños: ${listing.bathroomCount}`}
                           onClick={() => {handleInputEditClick(11)}}/>
                )}
                {showCardInputs[11] && (   // CAMBIAR TIPO DE INPUT
                    <CardInput 
                        id="spaces"
                        label="Habitaciones y espacios"
                        value={listing.roomCount.toString()}
                        cancelAction={() => {handleInputEditClick(11)}}
                        onSave={onSave}
                        index={11}
                        instructions={'Agrega todas las habitaciones que pueden usar los huéspedes, incluidas las áreas compartidas'}
                    />
                )}
                <hr/>
                <InputEdit title="Categorías" value={listing.type} onClick={() => {}}/>    {/* FALTA COMPLETAR */}
                <hr/>
                <SubHeading title="Accesibilidad" edit onClick={() => {}}/>                 {/* FALTA COMPLETAR */}
                <hr/>
                <SubHeading title="Seguridad de los huéspedes" edit onClick={() => {}}/>       {/* FALTA COMPLETAR */}
                <hr/>
                <div className="flex flex-row justify-between items-center ">
                    <div className="text-sm font-semibold py-3 px-4 rounded-md hover:bg-neutral-100 underline transition cursor-pointer flex flex-row items-center gap-2" onClick={() => {router.push(`/hosting/listings/${listing.id}`)}}>
                        <AiOutlineArrowLeft />
                        Regresar 
                    </div>
                    <div className="text-sm font-semibold py-3 px-4 rounded-md hover:bg-neutral-100 underline transition cursor-pointer flex flex-row items-center gap-2" onClick={() => {router.push(`/hosting/listings/${listing.id}/pricing`)}}>
                        Precios y disponibilidad   
                        <AiOutlineArrowRight/>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default EditDetails;