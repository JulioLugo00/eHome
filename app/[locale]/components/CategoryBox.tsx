'use-client';

import { useSearchParams } from "next/navigation";
import {useRouter} from 'next-intl/client';
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";
import {useTranslations} from 'next-intl';

interface CategoryBoxProps {
    icon: IconType,
    label: string;
    selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    icon: Icon,
    label,
    selected
}) => {
    const router = useRouter();
    const params = useSearchParams();
    const t = useTranslations('Index');

    const handleClick = useCallback(() => {
        let currentQuery = {}; // Se inicializa el query
        if(params){  // Verificamos que no existan parametros previos
            currentQuery = qs.parse(params.toString());  // Agregamos los parametros a la Query
        }

        const updatedQuery: any = {
            ... currentQuery,
            category: label    // Agregamos category a la query
        }

        if (params?.get('category') == label){     // Si la categoria seleccionada ya esta previamente seleccionada
            delete updatedQuery.category;          // La eliminamos del query
        }

        const url = qs.stringifyUrl({     // Creamos la nueva url para el router
            url: '/',
            query: updatedQuery
        }, {skipNull: true});

        router.push(url);
    }, [label, params, router]);

    return(
        <div onClick={handleClick} className={`
            flex
            flex-col
            items-center
            justify-center
            gap-2
            p-3
            border-b-2
            hover:text-neutral-800
            transition
            cursor-pointer
            ${selected ? 'border-b-neutral-800' : 'border-transparent'}
            ${selected ? 'text-neutral-800' : 'text-neutral-500'}
        `}>
            <Icon size={26} />
            <div className="font-medium text-sm">
                {t(label)}
            </div>
        </div>
    );
}

export default CategoryBox;