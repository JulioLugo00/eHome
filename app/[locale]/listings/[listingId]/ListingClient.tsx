'use client';

import Container from "@/app/[locale]/components/Container";
import ListingHead from "@/app/[locale]/components/listings/ListingHead";
import ListingInfo from "@/app/[locale]/components/listings/ListingInfo";
import ListingReservation from "@/app/[locale]/components/listings/ListingReservation";
import { categories } from "@/app/[locale]/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import {useRouter} from 'next-intl/client';
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";

/*const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  );
  */
const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface ListingClientProps{
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    reservations = [],
    currentUser
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();


    const disableDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });

            dates = [...dates, ...range];
        });

        return dates;
    }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [adultCount, setAdultCount] = useState(1);
    const [childrenCount, setChildrenCount] = useState(0);
    const [currentLocale, setCurrentLocale] = useState("es");


    useEffect(() => {
        const extractedLocale = window.location.pathname.split('/')[1];
        const validLocales = ["es", "en"];
        if (validLocales.includes(extractedLocale)) {
            setCurrentLocale(extractedLocale);
        }
    }, []);

    

    const onCreateReservation = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
        setIsLoading(true);
    /*
        try {
            
            // Llamar al API para iniciar el proceso de pago
            const response = await axios.post('/api/start-payment', { data: {price: totalPrice,
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                userHostName: listing.user.name,
                listingId: listing.id} });
            
                const { transactionId } = response.data;
                if (!transactionId) {
                    throw new Error('Transaction ID is missing in the response');
                }
                setDateRange(initialDateRange);
                router.push(`/payment/${transactionId}`);
                
        } catch (error) {
            console.error('Error starting payment:', error);
            toast.error('Something went wrong starting the payment');
        } finally {
            setIsLoading(false);
        }
       */

        /*
        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        }).then(() => {
            toast.success('Property reserved!');
            setDateRange(initialDateRange);
            router.push('/trips')
        }).catch(() => {
            toast.error('Something went wrong');
        }).finally(() => {
            setIsLoading(false);
        })
        

        axios.post('/api/email-traveler', {
            data: { 
                : currentLocale, amount: totalPrice, userNameTraveler: currentUser.name, userNameHost: listing.user.name, titleListing: listing.title, startDate:dateRange.startDate, endDate: dateRange.endDate, idReservation: idReservation},
        });
        axios.post('/api/email-host', {
            data: { language: currentLocale, amount: totalPrice, userNameTraveler: currentUser.name, userNameHost: listing.user.name, titleListing: listing.title, startDate:dateRange.startDate, endDate: dateRange.endDate, idReservation: idReservation},
        });
        */

        try {
            // Espera a que la reserva sea creada antes de continuar
            const reservationResponse = await axios.post('/api/reservations', {
              totalPrice,
              startDate: dateRange.startDate,
              endDate: dateRange.endDate,
              listingId: listing?.id,
            });
    
            if (reservationResponse.status === 201 || reservationResponse.status === 200) {
              console.log('Property reserved!');
    
              try {
                    // Ahora puedes obtener la reserva recién creada
                    const getReservationResponse = await axios.post('/api/getReservationByData', {
                    data: {
                        totalPrice: totalPrice,
                        startDate: dateRange.startDate,
                        endDate: dateRange.endDate,
                        listingId: listing?.id,
                        userId: currentUser.id
                    },
                    });
        
                    const idReservation = getReservationResponse.data.id;
                    axios.post('/api/email-traveler', {
                        data: { language: currentLocale, amount: totalPrice, userNameTraveler: currentUser.name, userNameHost: currentUser.id, titleListing: listing.title, startDate:dateRange.startDate, endDate: dateRange.endDate, idReservation: idReservation},
                });
                axios.post('/api/email-host', {
                    data: { language: currentLocale, amount: totalPrice, userNameTraveler: currentUser.name, userNameHost: currentUser.id, titleListing: listing.title, startDate:dateRange.startDate, endDate: dateRange.endDate, idReservation: idReservation},
                });
                toast.success("successPayment");

                router.push('/trips')

      } catch (getReservationError) {
        console.error('Error retrieving reservation:', getReservationError);
        toast.error('Something went wrong');
      }
    }
  } catch (reservationError) {
    console.error('Error creating reservation:', reservationError);
    toast.error('Something went wrong');
  } finally {
    setIsLoading(false);
  }
        
    }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

    useEffect(() => {
        if(dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);
            if(dayCount && listing.price){
                setTotalPrice(dayCount * listing.price);
            }else{
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);

    const category = useMemo(() => {
        return categories.find((item) => item.label == listing.category);
    }, [listing.category]);

    return(
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead 
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        id={listing.id}
                        currentUser={currentUser}
                        country={listing.country}
                        state={listing.state}
                    />
                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-7
                        md:gap-10
                        mt-6
                    ">
                        <ListingInfo 
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            longitude={listing.longitude}
                            latitude={listing.latitude}
                        />
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservation 
                                price={listing.price}
                                totalPrice={totalPrice}
                                adultCount={adultCount}
                                childrenCount={childrenCount}
                                onChangeAdult={(value) => setAdultCount(value)}
                                onChangeChildren={(value) => setChildrenCount(value)}
                                onChangeDate={(value) => setDateRange(value)}
                                clean={listing.category=='Modern'}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disableDates}
                                listing={listing}
                                userTraveler={currentUser}
                                userHost={listing.user}
                                image={listing.imageSrc[0]}
                            />

                            
                        </div>
                        
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default ListingClient;