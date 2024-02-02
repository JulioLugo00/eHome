import * as React from 'react';
import { format } from 'date-fns';

interface EmailConfirmEnProps {
  amount: number;
  userNameTraveler: string;
  userNameHost: string;
  titleListing: string;
  startDate: string;
  endDate: string;
  idReservation: string;
}

export const EmailConfirmEn: React.FC<Readonly<EmailConfirmEnProps>> = ({
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
    <p>Your reservation at <strong style={{ color: '#48BB78' }}>{titleListing}</strong> has been confirmed!</p>

  </div>
);
