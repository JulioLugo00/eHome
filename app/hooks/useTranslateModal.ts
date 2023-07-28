import { create } from 'zustand';

interface TranslateModalStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useTranslateModal = create<TranslateModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));

export default useTranslateModal;