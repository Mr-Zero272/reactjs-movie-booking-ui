import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { pagination } from '~/apiServices/searchService';

const isExistInArray = (arr, obj) => {
    return arr.includes(obj);
};

const filterItem = (arr, item) => {
    return arr.filter((it) => it !== item);
};

export const fetchPaginationMovie = createAsyncThunk(
    'paginationMovie/fetch',
    async ({ q = '', size = 6, cpage = 1, genres = null, type = '', manufacturers = null }) => {
        //console.log('asdfasd', q, size, cpage, genres, type, manufacturers);
        const response = await pagination(q, size, cpage, genres, type, manufacturers);
        //console.log(response);
        return response;
    },
);

const paginationSlice = createSlice({
    name: 'pagination',
    initialState: {
        loading: false,
        q: '',
        sort: 'Default Sorting',
        pagination: {
            size: 6,
            currentPage: 1,
            totalPage: 12,
            totalResult: 12,
        },
        manufacturers: [],
        genres: [],
        cinemaType: 'All',
        data: [],
    },
    reducers: {
        setSearchString(state, action) {
            return {
                ...state,
                q: action.payload,
            };
        },
        nextPage(state) {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: state.pagination.currentPage + 1,
                },
            };
        },
        prevPage(state) {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: state.pagination.currentPage - 1,
                },
            };
        },
        chooseCurrentPage(state, action) {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: action.payload,
                },
            };
        },
        changeSizePage(state, action) {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    size: action.payload,
                },
            };
        },
        chooseManufacturer(state, action) {
            if (!isExistInArray(state.manufacturers, action.payload)) {
                return {
                    ...state,
                    manufacturers: [...state.manufacturers, action.payload],
                };
            } else {
                return {
                    ...state,
                    manufacturers: filterItem(state.manufacturers, action.payload),
                };
            }
        },
        chooseGenre(state, action) {
            if (!isExistInArray(state.genres, action.payload)) {
                return {
                    ...state,
                    genres: [...state.genres, action.payload],
                };
            } else {
                return {
                    ...state,
                    genres: filterItem(state.genres, action.payload),
                };
            }
        },
        chooseCinemaType(state, action) {
            return {
                ...state,
                cinemaType: action.payload,
            };
        },
        chooseSortType(state, action) {
            return {
                ...state,
                sort: action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPaginationMovie.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchPaginationMovie.fulfilled, (state, action) => {
            state.data = action.payload.movies;
            state.pagination.totalPage = action.payload.totalPages;
            state.pagination.totalResult = action.payload.totalElements;
            state.loading = false;
        });
        builder.addCase(fetchPaginationMovie.rejected, (state, action) => {
            console.log('error');
            state.loading = false;
        });
    },
});

export const paginationAction = paginationSlice.actions;
export default paginationSlice;
