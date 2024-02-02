import * as React from 'react';
import { format } from 'date-fns';

interface EmailConfirmEsProps {
  amount: number;
  userNameTraveler: string;
  userNameHost: string;
  titleListing: string;
  startDate: string;
  endDate: string;
  idReservation: string;
}

export const EmailConfirmEs: React.FC<Readonly<EmailConfirmEsProps>> = ({
  amount,
  userNameTraveler,
  userNameHost,
  titleListing,
  startDate,
  endDate,
  idReservation,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
    <h1 style={{ color: '#48BB78' }}>¡Hola, {userNameTraveler}!</h1>
    <p>¡Tu reservación en <strong style={{ color: '#48BB78' }}>{titleListing}</strong> ha sido confirmada!</p>
    <p style={{ marginTop: '20px', color: '#555' }}>Esperamos que tengas una excelente estancia 🏡</p>
  </div>
);
