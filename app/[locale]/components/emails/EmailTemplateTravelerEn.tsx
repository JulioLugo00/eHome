import * as React from 'react';
import { format } from 'date-fns';

interface EmailTemplateTravelerEnProps {
  amount: number;
  userNameTraveler: string;
  userNameHost: string;
  titleListing: string;
  startDate: string;
  endDate: string;
  idReservation: string;
}

export const EmailTemplateTravelerEn: React.FC<Readonly<EmailTemplateTravelerEnProps>> = ({
  amount,
  userNameTraveler,
  userNameHost,
  titleListing,
  startDate,
  endDate,
  idReservation,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
    <h1 style={{ color: '#48BB78' }}>Hello, {userNameTraveler}!</h1>
    <p>Your reservation at <strong style={{ color: '#48BB78' }}>{titleListing}</strong> has been made successfully!</p>
    <p>The stay is from <strong>{format(new Date(startDate), 'PP')}</strong> to <strong>{format(new Date(endDate), 'PP')}</strong>.</p>
    <p>The total of your reservation is <strong>${amount}</strong>.</p>
    <p>If you have any questions, your host <strong>{userNameHost}</strong> will be happy to help you.</p>
    <p>The ID of the reservation is <strong>{idReservation}</strong>.</p>
    <p style={{ marginTop: '20px', color: '#555' }}>We hope you have a great stay 🏡</p>
  </div>
);
