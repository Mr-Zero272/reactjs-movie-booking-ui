import { createSlice } from '@reduxjs/toolkit';
const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
        name: '',
        title: '',
        children: '',
        data: { accept: false },
        closeBtn: false,
        acceptBtn: false,
    },
    reducers: {
        onAccept(state, action) {
            return {
                ...state,
                data: { ...state.data, accept: true },
                isOpen: false,
            };
        },
        initModal(state, action) {
            return {
                ...state,
                name: action.payload.name,
                title: action.payload.title,
                children: action.payload.children,
                data: { ...state.data, ...action.payload.data },
                closeBtn: action.payload.closeBtn,
                acceptBtn: action.payload.acceptBtn,
            };
        },
        showModal(state, action) {
            return {
                ...state,
                isOpen: true,
                data: action.payload,
            };
        },
        closeModal(state) {
            return {
                ...state,
                isOpen: false,
            };
        },
    },
});

export const modalAction = modalSlice.actions;
export default modalSlice;
