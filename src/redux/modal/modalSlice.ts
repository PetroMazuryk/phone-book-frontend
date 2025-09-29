import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalType = 'edit' | 'confirmDelete' | 'add' | null;

interface ModalState {
  openModal: ModalType;
  modalProps?: any;
}

const initialState: ModalState = {
  openModal: null,
  modalProps: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ type: ModalType; props?: any }>
    ) => {
      state.openModal = action.payload.type;
      state.modalProps = action.payload.props || null;
    },
    closeModal: (state) => {
      state.openModal = null;
      state.modalProps = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
