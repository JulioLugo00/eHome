'use client';

import {signIn} from 'next-auth/react';
import axios from 'axios';
import { AiFillFacebook } from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import { useCallback, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import {toast} from 'react-hot-toast';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import {useTranslations} from 'next-intl';

const LoginModal = () => {
    const router = useRouter();

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const t = useTranslations('Index');

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ... data,
            redirect: false,
        })
        .then((callback) => {
            setIsLoading(false);

            if(callback?.ok){
               toast.success('Logged in');
               router.refresh();
               loginModal.onClose();
            }

            if(callback?.error){
                toast.error(callback.error);
            }
        })
    }

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title={t('welcomeback')}
                subtitle={t('loginA')}
            />
            <Input
                id="email"
                label={t('email')}
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                type="password"
                label={t('password')}
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button 
                outline
                label={t('google')}
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button 
                outline
                label={t('facebook')}
                icon={AiFillFacebook}
                onClick={() => signIn('facebook')}
                color="#4267B2"
            />
            <div
                className="
                    text-neutral-500
                    text-center
                    mt-4
                    font-light
                "
            >
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>
                        {t('firsttime')}
                    </div>
                    <div
                        onClick={toggle}
                        className="text-neutral-800 cursor-pointer hover:underline"
                    >
                        {t('createA')}
                    </div>
                </div>
            </div>
        </div>
    );

    return(
        <Modal 
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title = {t('login')}
            actionLabel={t("continue")}
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default LoginModal;