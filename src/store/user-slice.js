import { createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
    name: 'user',
    initialState: {
        status: 'logout',
        username: '',
    },
    reducers: {
        setUserStatus(state, action) {
            return {
                ...state,
                status: action.payload,
            };
        },
        setUsername(state, action) {
            return {
                ...state,
                username: action.payload,
            };
        },
        setUserNecessaryInfo(state, action) {
            return {
                ...state,
                status: action.payload.status,
                username: action.payload.username,
            };
        },
        clearUserInfo(state) {
            localStorage.setItem('token', '');
            return {
                ...state,
                status: 'logout',
                username: '',
            };
        },
        logout(state) {
            localStorage.setItem('token', '');
            return {
                ...state,
                status: 'logout',
                username: '',
            };
        },
    },
});

export const userActions = userSlice.actions;
export default userSlice;
