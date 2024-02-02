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
import ConversationList from "./components/ConversationList";
import { User } from "@prisma/client";

interface ConversationClientProps {
  currentUser: any;
  conversations: any;
  users: SafeUser[];
}

const ConversationClient: React.FC<ConversationClientProps> = ({
  currentUser,
  conversations,
  users
}) => {;


  return (
  <div>
        <ConversationList users={users} initialItems={conversations} currentUser={currentUser}/>
  </div>
  );
};

export default ConversationClient;