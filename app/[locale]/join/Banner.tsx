'use client';

import Container from "../components/Container";
import {AiOutlineCalendar, AiOutlineGlobal} from 'react-icons/ai';
import {GiReceiveMoney} from 'react-icons/gi';
import {MdOutlineReviews} from 'react-icons/md';
import {BiSupport} from 'react-icons/bi';
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useCallback } from "react";
import { SafeUser } from "@/app/types";

interface BannerProps{
    currentUser?: SafeUser | null;
}

const Banner: React.FC<BannerProps> = ({currentUser}) => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();

    const onRent = useCallback(() => {
        if(!currentUser){
            return loginModal.onOpen();
        }

        // Open Rent Modal
        rentModal.onOpen();
    }, [currentUser, loginModal, rentModal]);

    const beneficios = [
        {
          icono: (<AiOutlineCalendar></AiOutlineCalendar>), // Reemplaza 'icono1.png' con el nombre de tu imagen de icono
          texto: 'Gestión de reservas simplificada',
        },
        {
          icono: (<AiOutlineGlobal></AiOutlineGlobal>), // Reemplaza 'icono2.png' con el nombre de tu imagen de icono
          texto: 'Alcance global de inquilinos',
        },
        {
          icono: (<GiReceiveMoney></GiReceiveMoney>), // Reemplaza 'icono3.png' con el nombre de tu imagen de icono
          texto: 'Mayor rentabilidad de tu propiedad',
        },
        {
          icono: (<MdOutlineReviews></MdOutlineReviews>), // Reemplaza 'icono4.png' con el nombre de tu imagen de icono
          texto: 'Evaluaciones y reseñas positivas',
        },
        {
          icono: (<BiSupport></BiSupport>), // Reemplaza 'icono5.png' con el nombre de tu imagen de icono
          texto: 'Asistencia al cliente 24/7',
        },
      ];

    const testimonios = [
        {
        nombre: 'Juan Pérez',
        testimonio:
            'Publicar mi casa en e-home ha sido una excelente decisión. Los huéspedes que se han alojado en mi propiedad han dejado reseñas positivas destacando la comodidad y las instalaciones de la casa. Gracias a las buenas evaluaciones, mi reputación como anfitrión ha mejorado, lo que ha llevado a un aumento en las reservas y un flujo constante de inquilinos satisfechos.',
        imagen: '/images/pedro.png'
        },
        {
        nombre: 'María Gómez',
        testimonio:
            'Desde que empecé a utilizar e-home para rentar mi propiedad, he recibido evaluaciones sobresalientes de mis huéspedes. Sus comentarios sobre la limpieza y la ubicación de la casa han atraído a más inquilinos interesados. Estoy muy contenta con la plataforma y cómo ha impactado positivamente en mi reputación como anfitriona.',
        imagen: '/images/ana.png'
        },
        // Puedes agregar más testimonios aquí si lo deseas
    ];

    return(
        <div>
            <div className="bg-green-500 text-white py-8">
                <Container>
                    <div className="flex flex-row items-center">
                        <div className="w-1/2">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
                                ¡Alquila tu casa en e-Home y disfruta de grandes beneficios!
                            </h1>
                            <h2 className="text-md md:text-lg lg:text-xl"> 
                                Darse de alta es gratis y en menos de 15 minutos - empieza hoy mismo
                            </h2>
                            <ul className="mt-8 text-md md:text-lg lg:text-xl">
                                {beneficios.map((beneficio, index) => (
                                <li key={index} className="flex items-center mb-4 gap-5">
                                    {beneficio.icono}
                                    <span>{beneficio.texto}</span>
                                </li>
                                ))}
                            </ul>
                        </div>
                        <div className="w-1/2">
                            <div className="rounded-lg overflow-hidden shadow-lg">
                                <img 
                                    src="https://hips.hearstapps.com/hmg-prod/images/la-moraleja-sothevies-copia-1659264338.jpg?crop=1.00xw:0.758xh;0,0.235xh&resize=1200:*"
                                    className="mx-auto"
                                    alt="Banner destacado"
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <div className="mt-5">
                <Container>
                    <div className="container mx-auto flex flex-col md:flex-row items-center">
                        <div className="md:w-2/3 md:order-2 text-center ml-5">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                Gestión de reservas
                            </h2>
                            <p className="text-xl mb-4">
                                El sistema de reservas de e-home es fácil de usar y permite a los propietarios aceptar o rechazar reservas según su disponibilidad. Con nuestro calendario, podrás ver de manera clara las fechas ocupadas y disponibles, lo que te ayudará a organizar mejor tus reservas y maximizar la rentabilidad de tu propiedad.
                            </p>
                            <p className="text-xl">
                                ¡Confía en e-home para una gestión eficiente de tus reservas y brinda a tus inquilinos una experiencia inolvidable!
                            </p>
                            </div>
                        <div className="md:w-1/3 md:order-1">
                            <img
                            src="/images/calendar.png"
                            alt="Calendario de reservas"
                            className="w-80 h-auto"
                            />
                        </div>
                    </div>
                </Container>
            </div>
            <div className="bg-green-50 py-8">
                <Container>
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 md:order-2">
                            <div className="rounded-lg overflow-hidden shadow-lg">
                                <img
                                src="https://www.seekpng.com/png/detail/26-262107_pin-world-map-online-pin-world-map-online.png"
                                alt="Mapa del mundo con marcadores"
                                className="w-full h-auto"
                                />
                            </div>
                        </div>
                        <div className="md:w-1/2 md:order-1 text-center pr-10">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                Alcance global
                            </h2>
                            <p className="text-xl mb-4">
                                Muestra cómo e-home conecta propietarios e inquilinos de todo el mundo. Nuestra plataforma ofrece una amplia selección de casas disponibles en diferentes países, lo que te brinda la oportunidad de explorar lugares increíbles y experimentar nuevas culturas desde la comodidad de una casa acogedora.
                            </p>
                            <p className="text-xl">
                                ¡Descubre oportunidades únicas de alojamiento en cualquier parte del planeta gracias a e-home!
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
            <div className="py-8">
                <Container>
                    <div className="container mx-auto flex flex-col md:flex-row items-center">
                        <div className="md:w-1/3 md:order-1">
                                    <img
                                    src="https://i.pinimg.com/564x/20/51/60/2051608ec032dceb2d239ae53f3b81e5.jpg"
                                    alt="Mapa del mundo con marcadores"
                                    className="w-80 h-auto"
                                    />
                        </div>
                        <div className="md:w-2/3 md:order-2 text-center">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            Rentabilidad mejorada
                        </h2>
                        <p className="text-xl mb-4">
                            Muestra cómo la tasa de ocupación y los ingresos pueden aumentar al publicar una casa en e-home. Nuestra plataforma cuenta con un gran número de usuarios en búsqueda de alojamiento, lo que te brinda una mayor visibilidad y la posibilidad de atraer más inquilinos interesados en tu propiedad.
                        </p>
                        <p className="text-xl">
                            ¡Aprovecha el potencial de e-home para mejorar la rentabilidad de tu propiedad y obtener ingresos adicionales!
                        </p>
                        </div>
                    </div>
                </Container>
            </div>
            <div className="py-8 bg-green-50">
                <div className="container mx-auto">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
                    Evaluaciones y reseñas
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonios.map((testimonio, index) => (
                        <div key={index} className="p-4 bg-white rounded-lg shadow-lg">
                            <div className="flex items-center mb-4">
                                <img
                                    src={testimonio.imagen}
                                    alt={`Imagen de ${testimonio.nombre}`}
                                    className="w-40 h-auto rounded-full mr-4"
                                />
                                <div>
                                    <p className="text-lg mb-4">{testimonio.testimonio}</p>
                                    <p className="text-base font-bold">{testimonio.nombre}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
            <div className="py-12">
                <Container>
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="text-center md:text-left">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                                Asistencia al cliente
                                </h2>
                                <p className="text-xl mb-4">
                                Estamos aquí para ayudarte en cualquier momento. Nuestro equipo de soporte altamente capacitado está disponible las 24 horas, los 7 días de la semana para brindarte asistencia en cualquier duda o problema que puedas tener. Ya sea que necesites ayuda con la configuración de tu cuenta, la resolución de problemas técnicos o simplemente tengas preguntas sobre cómo mejorar tus publicaciones, estamos listos para ayudarte en cada paso del camino.
                                </p>
                                <p className="text-xl">
                                Confía en e-home para garantizar que tu experiencia como anfitrión sea exitosa y sin complicaciones. ¡Estamos comprometidos a brindarte un excelente servicio al cliente!
                                </p>
                            </div>
                            <div>
                                <img
                                src="https://cibergestion.com/wp-content/uploads/2022/12/5127314-scaled.jpg"
                                alt="Equipo de soporte de e-home"
                                className="w-full h-auto rounded-lg shadow-md"
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <div className="py-8">
                <Container>
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                        ¿Listo para ser anfitrión?
                        </h2>
                        <p className="text-xl mb-6">
                        Publica tu casa en e-home y comienza a recibir a inquilinos de todo el mundo. Únete a nuestra comunidad de anfitriones satisfechos y disfruta de los beneficios de ser parte de e-home.
                        </p>
                        <a
                        onClick={onRent}
                        className="bg-green-500 text-white py-3 px-8 rounded-lg shadow-md font-semibold hover:bg-blue-200 transition duration-300 cursor-pointer"
                        >
                        Publica tu casa
                        </a>
                    </div>
                </Container>
            </div>
        </div>

    );
}

export default Banner;