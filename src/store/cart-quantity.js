import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchQuantityCart = createAsyncThunk('quantityCart/fetch', async () => {
    const token = localStorage.getItem('token');
    //console.log('asdfasd', q, size, cpage, genres, type, manufacturers);
    const response = await axios.get('http://localhost:8081/api/v1/cart/quantity', {
        headers: { Authorization: 'Bearer ' + token },
    });
    //console.log(response);
    return response.data;
});

const cartQuantity = createSlice({
    name: 'user',
    initialState: {
        quantity: 0,
    },
    reducers: {
        addToCart(state) {
            state.quantity += 1;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchQuantityCart.pending, (state) => {});
        builder.addCase(fetchQuantityCart.fulfilled, (state, action) => {
            state.quantity = action.payload;
        });
        builder.addCase(fetchQuantityCart.rejected, (state, action) => {
            console.log('error');
        });
    },
});

export const cartQuantityActions = cartQuantity.actions;
export default cartQuantity;
