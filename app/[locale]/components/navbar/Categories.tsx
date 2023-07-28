'use-client';

import Container from "../Container";
import {TbBeach, TbPool} from 'react-icons/tb';
import {MdOutlineVilla, MdApartment, MdPets} from 'react-icons/md';
import {IoDiamond} from 'react-icons/io5';
import {GiModernCity} from 'react-icons/gi';
import {BsHouseDoorFill} from 'react-icons/bs';
import {AiFillShop} from 'react-icons/ai';
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import {useTranslations} from 'next-intl';

export const categories = [
    {
        label: 'Apartment',
        icon: MdApartment,
        description: 'This property is an apartment'
    },
    {
        label: 'House',
        icon: BsHouseDoorFill,
        description: 'This property is a house'
    },
    {
        label: 'Shop',
        icon: AiFillShop,
        description: 'This property is a shop'
    },
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach!'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is modern'
    },
    {
        label: 'City',
        icon: GiModernCity,
        description: 'This property is is in the city!'
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This is property has a beautiful pool!'
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: 'This property is brand new and luxurious!'
    },
    {
        label: 'Pets',
        icon: MdPets,
        description: 'This property allows pets!'
    },
]

export const discounts = [
    {
        label: 'Promotion for new ad',
        amount: 20,
        description: 'Offer 20% on your first 3 reservations'
    },
    {
        label: 'Discount per week',
        amount: 10,
        description: 'For stays of 7 nights or more'
    },
    {
        label: 'Monthly discount',
        amount: 18,
        description: 'For stays of 28 nights or more'
    }
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname == '/' || pathname == '/es';

    if(!isMainPage){
        return null;
    }

    return(
        <Container>
            <div className="
                pt-4
                flex
                flex-row
                items-center
                justify-between
                overflow-x-auto
            ">
                {categories.map((item) => (
                    <CategoryBox 
                        key={item.label}
                        label={item.label}
                        selected={category == item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    );
}

export default Categories;