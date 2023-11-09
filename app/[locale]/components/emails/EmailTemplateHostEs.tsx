import * as React from 'react';
import { format } from 'date-fns';

interface EmailTemplateHostEsProps {
  amount: number;
  userNameTraveler: string;
  userNameHost: string;
  titleListing: string;
  startDate: string;
  endDate: string;
  idReservation: string;
}

export const EmailTemplateHostEs: React.FC<Readonly<EmailTemplateHostEsProps>> = ({
  amount,
  userNameTraveler,
  userNameHost,
  titleListing,
  startDate,
  endDate,
  idReservation,
  
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
  <h1 style={{ color: '#48BB78' }}>¡Hola, {userNameHost}!</h1>
  <p>Se ha realizado una reservación en tu propiedad: <strong style={{ color: '#48BB78' }}>{titleListing}</strong></p>
  <p>La reservación es del <strong>{format(new Date(startDate), 'PP')}</strong> al <strong>{format(new Date(endDate), 'PP')}</strong>.</p>
  <p>El total de la reservación es de <strong>${amount}</strong>.</p>
  <p>El nombre del viajero es <strong>{userNameTraveler}</strong>.</p>
  <p>El ID de la reservación es <strong>{idReservation}</strong>.</p>
  <p style={{ marginTop: '20px', color: '#555' }}>¡Gracias por ser un increíble anfitrión! 🏠</p>
</div>
);
