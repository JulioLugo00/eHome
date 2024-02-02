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
import Sidebar from "../components/sidebar/Sidebar";
import UserList from "../components/UserList";
import getUsers from "@/app/actions/getUsers";
import { SafeUser } from "@/app/types";

interface ChatClientProps {
  currentUser: any;
  users: SafeUser[];
}

const ChatClient: React.FC<ChatClientProps> = ({
  currentUser,
  users,
}) => {;
  const t = useTranslations('Index');
  const router = useRouter();

  return (
  <div>
        <UserList items={users}/>
  </div>
  );
};

export default ChatClient;