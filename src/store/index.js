import { configureStore } from '@reduxjs/toolkit';
import modalLoginSlice from './modal-login-slice';

const store = configureStore({
    reducer: {
        loginModal: modalLoginSlice.reducer,
    },
});

export default store;
