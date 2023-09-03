import { createSlice } from '@reduxjs/toolkit';

const modalLoginSlice = createSlice({
    name: 'modalLogin',
    initialState: { isOpen: false },
    reducers: {
        openModal(state) {
            state.isOpen = true;
        },
        closeModal(state) {
            state.isOpen = false;
        },
    },
});

export const modalLoginActions = modalLoginSlice.actions;
export default modalLoginSlice;
