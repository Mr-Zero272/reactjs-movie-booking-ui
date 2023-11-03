import { createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
    name: 'user',
    initialState: {
        status: 'logout',
        username: '',
        avatar: '',
        lastUpdate: '',
    },
    reducers: {
        setLastUpdate(state, action) {
            return {
                ...state,
                lastUpdate: action.payload,
            };
        },
        haveChange(state) {
            return state;
        },
        setAvatar(state, action) {
            return {
                ...state,
                avatar: action.payload,
            };
        },
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
                avatar: action.payload.avatar,
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
