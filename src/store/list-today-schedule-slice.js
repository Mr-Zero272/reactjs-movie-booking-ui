import { createSlice } from '@reduxjs/toolkit';
const listTodayScheduleSlice = createSlice({
    name: 'listTodaySchedule',
    initialState: {
        genre: '',
        cinemaTypes: ['3D'],
    },
    reducers: {
        chooseGenre(state, action) {
            return {
                ...state,
                genre: action.payload,
            };
        },
        chooseCinemaTypes(state, action) {
            if (state.cinemaTypes.includes(action.payload)) {
                return {
                    ...state,
                    cinemaTypes: state.cinemaTypes.filter((item) => item !== action.payload),
                };
            } else {
                if (state.cinemaTypes[0] === 'all')
                    return {
                        ...state,
                        cinemaTypes: [action.payload],
                    };
                else {
                    return {
                        ...state,
                        cinemaTypes: [...state.cinemaTypes, action.payload],
                    };
                }
            }
        },
    },
});

export const listTodayScheduleActions = listTodayScheduleSlice.actions;
export default listTodayScheduleSlice;
