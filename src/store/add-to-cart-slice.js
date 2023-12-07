import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as searchService from '~/apiServices/searchService';

export const fetchInfoAddToCart = createAsyncThunk('addToCart/fetch', async (id = 1) => {
    //console.log(id);
    //console.log('asdfasd', q, size, cpage, genres, type, manufacturers);
    const response = await searchService.getMovieInfo(id);
    //console.log(response);
    return response;
});

const checkActiveDate = (d, chosenDate) => {
    const d1 = new Date(d);
    const d2 = new Date(chosenDate);
    return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
};

// const getListSeatsSelected = (listSeats) => {
//     let listSeatsSelected = [];
//     listSeatsSelected = listSeats.map((item) => {
//         return item.seatId;
//     });
//     return listSeatsSelected;
// };

const addToDistinctArray = (array, value) => {
    let temp = [];
    if (array.some((item) => item.seatId === value.seatId)) {
        temp = array.filter((it) => it.seatId !== value.seatId);
    } else {
        temp = [...array, value];
    }
    return temp;
};

const addToCartSlice = createSlice({
    name: 'formBookingTicket',
    initialState: {
        loading: false,
        activeMovie: 1,
        listScreeningsAreActive: [],
        activeDate: '2023-10-13T09:00:00', // tren day df la ''
        activeShowtime: 0, // mac dinh de la 0 di :v
        activeAuditorium: 0,
        screenings: [],
        movieInfo: {},
        listSeatSelected: [],
        totalPayment: 0,
        paymentStatus: false,
        invoiceId: '',
    },
    reducers: {
        setPaymentStatus(state, action) {
            return {
                ...state,
                paymentStatus: action.payload.status,
                invoiceId: action.payload.invoiceId,
            };
        },
        setTotalPayment(state, action) {
            return {
                ...state,
                totalPayment: action.payload,
            };
        },
        onChangeBooking(state, action) {
            return {
                ...state,
                activeMovie: action.payload.activeMovie,
                activeDate: action.payload.activeDate,
                activeShowtime: action.payload.activeShowtime,
                activeAuditorium: action.payload.activeAuditorium,
            };
        },
        refreshState(state) {
            return {
                loading: false,
                activeMovie: 1,
                listScreeningsAreActive: [],
                activeDate: '2023-10-13T09:00:00', // tren day df la ''
                activeShowtime: 0, // mac dinh de la 0 di :v
                activeAuditorium: 0,
                screenings: [],
                movieInfo: {},
                listSeatSelected: [],
                paymentStatus: false,
            };
        },
        setListScreeningsAreActive(state, action) {
            return {
                ...state,
                listScreeningsAreActive: action.payload,
            };
        },
        chooseAuditorium(state, action) {
            return {
                ...state,
                activeAuditorium: action.payload,
            };
        },
        checkout(state, action) {
            return {
                ...state,
                activeMovie: action.payload.activeMovie,
                listScreeningsAreActive: [...action.payload.listScreeningsAreActive],
                activeDate: action.payload.activeDate,
                activeShowtime: action.payload.activeShowtime,
                listSeatSelected: [...action.payload.listSeatSelected],
            };
        },
        addToCart(state, action) {
            return {
                ...state,
                activeMovie: action.payload.activeMovie,
                listScreeningsAreActive: [action.payload.screening],
                activeDate: action.payload.activeDate,
                activeShowtime: action.payload.activeShowtime,
                listSeatSelected: [],
            };
        },
        chooseSeats(state, action) {
            const tempListSeatSelected = addToDistinctArray(state.listSeatSelected, action.payload.newSeat);
            let totalPayment = tempListSeatSelected.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.price;
            }, 0);
            return {
                ...state,
                listSeatSelected: tempListSeatSelected,
                listScreeningsAreActive: addToDistinctArray(state.listScreeningsAreActive, action.payload.newScreening),
                totalPayment: totalPayment,
            };
        },
        chooseSeatsWhenCheckout(state, action) {
            const tempListSeatSelected = addToDistinctArray(state.listSeatSelected, action.payload.newSeat);
            let totalPayment = tempListSeatSelected.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.price;
            }, 0);
            return {
                ...state,
                listSeatSelected: tempListSeatSelected,
                totalPayment: totalPayment,
            };
        },
        setActionDate(state, action) {
            const screeningArr = state.movieInfo.screenings.filter((item) =>
                checkActiveDate(action.payload, item.screening_start),
            );
            return {
                ...state,
                activeDate: action.payload,
                screenings: screeningArr,
                activeShowtime: screeningArr?.length === 0 ? 0 : screeningArr[0].id,
            };
        },
        setActiveShowtime(state, action) {
            return {
                ...state,
                activeShowtime: action.payload,
            };
        },
        setNecessaryInfoAddToCart(state, action) {
            return {
                ...state,
                activeDate: action.payload.activeDate,
                activeShowtime: action.payload.activeShowtime,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInfoAddToCart.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchInfoAddToCart.fulfilled, (state, action) => {
            state.movieInfo = action.payload;
            state.screenings = action.payload.screenings;
            state.activeAuditorium = action.payload.screenings.find((i) => i.id === state.activeShowtime).auditorium.id;
            state.loading = false;
        });
        builder.addCase(fetchInfoAddToCart.rejected, (state, action) => {
            console.log('error');
            state.loading = false;
        });
    },
});

export const addToCartActions = addToCartSlice.actions;
export default addToCartSlice;
