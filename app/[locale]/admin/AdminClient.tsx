'use client';

import { useRouter } from "next/navigation";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, SafeUser } from "../../types";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {useTranslations} from 'next-intl';
import UserCardAdmin from "../components/users/UserCardAdmin";

interface PropertiesClientProps{
    users: SafeUser[];
    currentUser?: SafeUser|null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
    users,
    currentUser
}) => {
    const router = useRouter();
    const[deletingId, setDeletingId] = useState('');
    const t = useTranslations('Index');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    let change = JSON.parse(localStorage.getItem("exchangeRates")!);
    let currency = localStorage.getItem("currency");

    const handleYearChange = (event: any) => {
      setSelectedYear(event.target.value);
    };

    const [selectedYear2, setSelectedYear2] = useState(new Date().getFullYear().toString());

    const [selectedMonth, setSelectedMonth] = useState('1'); // Inicializa con el mes actual o el que prefieras

    const handleMonthChange = (event: any) => {
      setSelectedMonth(event.target.value);
    };

    const handleYearChange2 = (event: any) => {
      setSelectedYear2(event.target.value);
    };

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/users/${id}`)
        .then(() => {
            toast.success(t("userDeleted"));
            router.refresh();
        })
        .catch((error) =>{
            toast.error(error?.response?.data?.error);
        })
        .finally(() => {
            setDeletingId('');
        })
    }, [router]);

    interface ChartData {
        labels: string[];
        datasets: Array<{
          label: string;
          data: number[];
          backgroundColor: string;
        }>;
      }

      const [chartData, setChartData] = useState<ChartData>({
        labels: [],
        datasets: [
          {
            label: "", // Add this line
            data: [],
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
        ],
      });

      const [chartData2, setChartData2] = useState<ChartData>({
        labels: [],
        datasets: [
          {
            label: "", // Add this line
            data: [],
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
        ],
      });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const reservations = await axios.post('/api/reservations-by-month', {
                  data: { year: selectedYear},
              });
        
                interface Reservation {
                    createdAt: string;
                    totalPrice: number;
                    currency: string;
                    // include other properties as needed
                  }
                  
                // Inicializa un objeto con todos los meses del año
    const sumByMonth = Array.from({ length: 12 }, (_, i) => 0);

    // Suma los precios por mes
    reservations.data.forEach((reservation: Reservation) => {
        const month = new Date(reservation.createdAt).getMonth(); // Meses van de 0 a 11
        if(currency === null) {	
          currency = "USD";
        }
        if(currency === reservation.currency) {
          sumByMonth[month] += reservation.totalPrice;
        }
        else{
          const reservationCurrencyConversion = parseInt(change.conversion_rates[reservation.currency]);
          const reservationInDollars = reservation.totalPrice / reservationCurrencyConversion;
  
          sumByMonth[month] += reservationInDollars * parseInt(change.conversion_rates[currency]);
        }
    });

    // Prepara los datos para el gráfico
    const resultsByMonth = sumByMonth.map((total, month) => ({
        month: month + 1, // Convertir a mes real (1 a 12)
        total,
    }));

      setChartData({
        labels: resultsByMonth.map(item => `Mes ${item.month}`),
        datasets: [
          {
            label: "Total Ingresos",
            data: resultsByMonth.map(item => item.total),
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
        ],
      });
                
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [selectedYear]);

    //Tabla 2
    useEffect(() => {
      const fetchData = async () => {
          try {
              const reservations = await axios.post('/api/reservations-by-day', {
                data: { year: selectedYear, month: Number(selectedMonth)},
            });
      
              interface Reservation {
                  createdAt: string;
                  totalPrice: number;
                  currency: string;
                  // include other properties as needed
                }
                
              // Inicializa un objeto con todos los meses del año
  let sumByDay: number[];
  if (selectedMonth === "1" || selectedMonth === "3" || selectedMonth === "5" || selectedMonth === "7" || selectedMonth === "8" || selectedMonth === "10" || selectedMonth === "12") {
    // Crear fecha de inicio y fin para el año
 
    sumByDay = Array.from({ length: 31 }, (_, i) => 0);
  }   else if (selectedMonth === "4" || selectedMonth === "6" || selectedMonth === "9" || selectedMonth === "11") {
    // Crear fecha de inicio y fin para el año

    sumByDay = Array.from({ length: 30 }, (_, i) => 0);
  }   else  {
    // Crear fecha de inicio y fin para el año

    sumByDay = Array.from({ length: 28 }, (_, i) => 0);
  } 
        
  // Suma los precios por mes
  reservations.data.forEach((reservation: Reservation) => {
      const day = new Date(reservation.createdAt).getDay(); // Meses van de 0 a 11
      if(currency === null) {	
        currency = "USD";
      }
      if(currency === reservation.currency) {
        sumByDay[day] += reservation.totalPrice;
      }
      else{
        const reservationCurrencyConversion = parseInt(change.conversion_rates[reservation.currency]);
        const reservationInDollars = reservation.totalPrice / reservationCurrencyConversion;

        sumByDay[day] += reservationInDollars * parseInt(change.conversion_rates[currency]);
      }
  });

  // Prepara los datos para el gráfico
  const resultsByDay = sumByDay.map((total, day) => ({
      day: day + 1, // Convertir a mes real (1 a 12)
      total,
  }));

    setChartData2({
      labels: resultsByDay.map(item => `Dia ${item.day}`),
      datasets: [
        {
          label: "Total Ingresos",
          data: resultsByDay.map(item => item.total),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
      ],
    });
              
          } catch (error) {
              console.error(error);
          }
      };

      fetchData();
  }, [selectedYear2, selectedMonth]);

    

    return (
        <Container>
<div>
<label htmlFor="month-year" className="mr-2">Año:</label>
        <select value={selectedYear} onChange={handleYearChange}>
          {/* Generar opciones de años */}
          {Array.from({ length: 10 }).map((_, index) => {
            const year = new Date().getFullYear() + index;
            return <option key={year} value={year}>{year}</option>;
          })}
        </select>
      </div>
<div className="w-full h-[60vh] mx-auto">
  <Bar data={chartData} />
</div>

<div>
  <label htmlFor="month-year" className="mr-2">Año:</label>
        <select value={selectedYear2} onChange={handleYearChange2}>
          {/* Generar opciones de años */}
          {Array.from({ length: 10 }).map((_, index) => {
            const year = new Date().getFullYear() + index;
            return <option key={year} value={year}>{year}</option>;
          })}
        </select>
      </div>
{/* Select Box para seleccionar el mes */}
<div>
<label htmlFor="month-select" className="mr-2">Mes:</label>
      <select value={selectedMonth} onChange={handleMonthChange}>
        {Array.from({ length: 12 }).map((_, index) => {
          const month = index + 1; // Los meses van de 1 a 12
          return <option key={month} value={month}>{month}</option>;
        })}
      </select>
    </div>

      <div className="w-full h-[60vh] mx-auto">
  <Bar data={chartData2} />
</div>

            <Heading
                title={t("users")}
                subtitle={t("listUsers")}
            />
            <div className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
            ">
                {users.map((user) => (
                    <UserCardAdmin
                        key={user.id}
                        data={user}
                        actionId={user.id}
                        onAction={onCancel}
                        disabled={deletingId==user.id}
                        actionLabel={t("deleteUser")}
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default PropertiesClient;