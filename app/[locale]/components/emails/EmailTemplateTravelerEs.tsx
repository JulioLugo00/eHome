import * as React from 'react';
import { format } from 'date-fns';

interface EmailTemplateTravelerEsProps {
  amount: number;
  userNameTraveler: string;
  userNameHost: string;
  titleListing: string;
  startDate: string;
  endDate: string;
  idReservation: string;
}

export const EmailTemplateTravelerEs: React.FC<Readonly<EmailTemplateTravelerEsProps>> = ({
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
    <p>¡Tu reservación en <strong style={{ color: '#48BB78' }}>{titleListing}</strong> ha sido realizada con éxito!</p>
    <p>La estancia es del <strong>{format(new Date(startDate), 'PP')}</strong> al <strong>{format(new Date(endDate), 'PP')}</strong>.</p>
    <p>El total de tu reservación es de <strong>${amount}</strong>.</p>
    <p>Si tienes alguna pregunta, tu anfitrión <strong>{userNameHost}</strong> estará encantado de ayudarte.</p>
    <p>El ID de la reservación es <strong>{idReservation}</strong>.</p>
    <p style={{ marginTop: '20px', color: '#555' }}>Esperamos que tengas una excelente estancia 🏡</p>
  </div>
);
