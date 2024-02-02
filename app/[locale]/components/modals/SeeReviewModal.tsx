import React, { useState } from "react";
import {useTranslations} from 'next-intl';

interface SeeReviewModalProps {
    isOpen: boolean;
 
    reviews: any;
    onConfirm: () => void;
   
}

const SeeReviewModal: React.FC<SeeReviewModalProps> = ({
    isOpen,
    reviews,

    onConfirm,

}) => {

    const t = useTranslations('Index');

    const handleConfirmClick = () => {
        // Llama a la función onConfirm con el reservationId
        onConfirm();
    };

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ${
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
                <p className="text-lg">{t("reviewsProperty")}</p>

                <div className="mt-4">
                    <ul>
                        {reviews.map((review: { rating: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; body: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
                            <li key={index}>
                                <div>
                                    <p>{t("puntuation")}: {review.rating}</p>
                                    <p>{review.body}</p>
                                </div>
                                <hr className="my-4" /> {/* Separador entre reseñas */}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                        onClick={handleConfirmClick}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeeReviewModal;