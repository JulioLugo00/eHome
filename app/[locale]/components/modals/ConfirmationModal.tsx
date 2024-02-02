import React from "react";

interface ConfirmationModalProps {
    isOpen: boolean;
    message: string;
    onConfirm: (id: string) => void;
    onCancel: () => void;
    reservationId: string; // Cambiar a minúscula 'string' en lugar de 'String'
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    message,
    onConfirm,
    onCancel,
    reservationId,
}) => {
    const handleConfirmClick = () => {
        // Llama a la función onConfirm con el reservationId
        onConfirm(reservationId);
    };

    return (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
            <p className="text-lg">{message}</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 text-gray-500 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
                onClick={onCancel}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                onClick={handleConfirmClick}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      );
};

export default ConfirmationModal;