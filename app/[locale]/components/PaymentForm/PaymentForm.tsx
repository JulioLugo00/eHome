"use client";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React from "react";

interface PaymentFormProps {
  totalPrice: number;
}

export default function PaymentForm({ totalPrice }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cardElement = elements?.getElement("card");

    try {
      if (!stripe || !cardElement) return null;
      const { data } = await axios.post("/api/create-payment-intent", {
        data: { amount: totalPrice },
      });
      const clientSecret = data;

      await stripe?.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });
    } catch (error) {
      console.log(error);
    }
  };

    return (
      <form onSubmit={onSubmit} className="pt-3 mx-10">
        <CardElement />
        <button type="submit">Submit</button>
      </form>
    );  }

