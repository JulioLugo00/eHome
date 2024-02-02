import { create } from 'zustand';

interface CreateReviewModalStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useCreateReviewModal = create<CreateReviewModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));

export default useCreateReviewModal;