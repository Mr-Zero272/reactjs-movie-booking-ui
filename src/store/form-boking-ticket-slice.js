import { createSlice } from '@reduxjs/toolkit';

const today = new Date();
const getListSeatsSelected = (listSeats) => {
    let listSeatsSelected = [];
    listSeats.map((item) => {
        return listSeatsSelected.push(item.id);
    });
    return listSeatsSelected;
};

const formBookingTicketSlice = createSlice({
    name: 'formBookingTicket',
    initialState: {
        activeDate: {
            day: today.toLocaleDateString('en-US', { weekday: 'short' }),
            date: today.getDate(),
            month: today.toLocaleDateString('en-US', { month: 'short' }),
            year: today.getFullYear(),
            fullNameDay: today.toLocaleDateString('en-US', { weekday: 'long' }),
        },
        showTimes: [
            { startTime: '9:00', auditorium: '3D' },
            { startTime: '10:00', auditorium: '2D' },
        ],
        activeShowTimes: { startTime: '9:00', auditorium: '3D' },
        seatsSelected: [
            { id: 116, numberSeat: 12, rowSeat: 'E', price: 70 },
            { id: 117, numberSeat: 13, rowSeat: 'E', price: 70 },
            { id: 118, numberSeat: 14, rowSeat: 'E', price: 70 },
        ],
    },
    reducers: {
        chooseDate(state, action) {
            return {
                ...state,
                activeDate: action.payload.dateInformation,
                showTimes: action.payload.showTimes,
                activeShowTimes: action.payload.showTimes[0],
            };
        },
        chooseShowtime(state, action) {
            return {
                ...state,
                activeShowTimes: action.payload,
            };
        },
        chooseSeats(state, action) {
            let listIdSeats = getListSeatsSelected(state.seatsSelected);
            if (listIdSeats.includes(action.payload.id)) {
                return {
                    ...state,
                    seatsSelected: state.seatsSelected.filter((item) => item.id !== action.payload.id),
                };
            } else {
                return {
                    ...state,
                    seatsSelected: [...state.seatsSelected, action.payload],
                };
            }
        },
    },
});

export const formBookingTicketActions = formBookingTicketSlice.actions;
export default formBookingTicketSlice;
