import React, { useState } from "react";
import CounterReview from "../inputs/CounterReview";
import {useTranslations} from 'next-intl';

interface CreateReviewModalProps {
    isOpen: boolean;
    onConfirm: (reviewCount: number, textCount: string ) => void;
    onCancel: () => void;
    reservationId: string; // Cambiar a minúscula 'string' en lugar de 'String'
}

const CreateReviewModal: React.FC<CreateReviewModalProps> = ({
    isOpen,

    onConfirm,
    onCancel,
    reservationId,
}) => {
    const [reviewCount, setReviewCount] = useState(5);
    const [reviewText, setReviewText] = useState("");
    const t = useTranslations('Index');

    const handleConfirmClick = () => {
        // Llama a la función onConfirm con el reservationId
        onConfirm(reviewCount,reviewText);
    };

    return (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
        
          <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
            <p className="text-lg">{t("createReview")}</p>
            <CounterReview
                    title={t("puntuation")}
                    subtitle={""}
                    value={reviewCount}
                    onChange={(value) => setReviewCount(value)}
                />
             <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700">
                {t("textReview")}
              </label>
              <textarea
                id="reviewText"
                name="reviewText"
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300"
              />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 text-gray-500 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
                onClick={onCancel}
              >
                {t("cancel")}
              </button>
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                onClick={handleConfirmClick}
              >
                {t("confirm")}
              </button>
            </div>
          </div>
        </div>
      );
};

export default CreateReviewModal;