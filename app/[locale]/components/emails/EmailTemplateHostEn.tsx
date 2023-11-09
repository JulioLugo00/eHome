import * as React from 'react';
import { format } from 'date-fns';

interface EmailTemplateHostEnProps {
  amount: number;
  userNameTraveler: string;
  userNameHost: string;
  titleListing: string;
  startDate: string;
  endDate: string;
  idReservation: string;
}

export const EmailTemplateHostEn: React.FC<Readonly<EmailTemplateHostEnProps>> = ({
  amount,
  userNameTraveler,
  userNameHost,
  titleListing,
  startDate,
  endDate,
  idReservation,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
  <h1 style={{ color: '#48BB78' }}>Hello, {userNameHost}!</h1>
  <p>A reservation has been made at your property: <strong style={{ color: '#48BB78' }}>{titleListing}</strong></p>
  <p>The reservation is from <strong>{format(new Date(startDate), 'PP')}</strong> to <strong>{format(new Date(endDate), 'PP')}</strong>.</p>
  <p>The total of the reservation is <strong>${amount}</strong>.</p>
  <p>The name of the traveler is <strong>{userNameTraveler}</strong>.</p>
  <p>The ID of the reservation is <strong>{idReservation}</strong>.</p>
  <p style={{ marginTop: '20px', color: '#555' }}>¡Gracias por ser un increíble anfitrión! 🏠</p>
</div>
);
