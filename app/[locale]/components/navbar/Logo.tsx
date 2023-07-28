'use client';
import Image from "next/image";
import {useRouter} from "next-intl/client";
import Link from 'next-intl/link';

const Logo = () => {
    const router = useRouter();

    return(
        <div>
            <Link href={location.pathname.includes('/hosting') ? '/hosting' : '/'} prefetch={false}>
                <Image
                    alt="Logo" 
                    className="hidden md:block cursor-pointer"
                    height="100"
                    width="100"
                    src="/images/logo.png"
                />
            </Link>
        </div>
    );
}

export default Logo;