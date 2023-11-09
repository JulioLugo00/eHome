'use client';

import { useRouter } from "next/navigation";

import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, SafeUser } from "../../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {useTranslations} from 'next-intl';
import UserCardAdmin from "../components/users/UserCardAdmin";

interface PropertiesClientProps{
    users: SafeUser[];
    currentUser?: SafeUser|null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
    users,
    currentUser
}) => {
    const router = useRouter();
    const[deletingId, setDeletingId] = useState('');
    const t = useTranslations('Index');
    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/users/${id}`)
        .then(() => {
            toast.success(t("userDeleted"));
            router.refresh();
        })
        .catch((error) =>{
            toast.error(error?.response?.data?.error);
        })
        .finally(() => {
            setDeletingId('');
        })
    }, [router]);
    return (
        <Container>
            <Heading
                title={t("users")}
                subtitle={t("listUsers")}
            />
            <div className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
            ">
                {users.map((user) => (
                    <UserCardAdmin
                        key={user.id}
                        data={user}
                        actionId={user.id}
                        onAction={onCancel}
                        disabled={deletingId==user.id}
                        actionLabel={t("deleteUser")}
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default PropertiesClient;