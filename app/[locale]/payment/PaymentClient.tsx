'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import {useTranslations} from 'next-intl';
import { loadStripe } from "@stripe/stripe-js";
//import {useRouter} from 'next-intl/client';
import { useRouter } from "next/navigation";
import {format} from 'date-fns';
import Image from 'next/image'

interface PaymentClientProps {
  currentUser: any;
}
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const PaymentClient: React.FC<PaymentClientProps> = ({
  currentUser,
}) => {;
  const t = useTranslations('Index');
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/');
  };

  return (
    <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      height: '100vh',
      color: '#333',
    }}
  >
    <div
      style={{
        marginBottom: '20px',
      }}
    >
      {/* Un ejemplo utilizando un SVG directamente */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        fill="currentColor"
        className="bi bi-check-circle"
        viewBox="0 0 16 16"
        style={{
          color: '#4BB543',
        }}
      >
        <path d="M16 8A8 8 0 1 1 8 0a8 8 0 0 1 8 8zm-3.97-3.03a.75.75 0 0 0-1.07 0L7 11.067l-2.23-2.24a.75.75 0 0 0-1.07 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l4.5-4.5a.75.75 0 0 0 0-1.06z"/>
      </svg>
    </div>
    <h1
      style={{
        marginBottom: '0.5rem',
      }}
    >
      {t("thanks")}, {currentUser.name}
    </h1>
    <p
      style={{
        marginBottom: '1rem',
        fontSize: '1rem',
      }}
    >
      {t("reservationCreated")}
    </p>
    <p
      style={{
        marginBottom: '1rem',
        fontSize: '1rem',
      }}
    >
      {t("reservationEmail")}
    </p>
    <div>
    <button
        onClick={handleButtonClick}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {t("backToHome")}
      </button>
    </div>
  
  </div>
  );
};

export default PaymentClient;