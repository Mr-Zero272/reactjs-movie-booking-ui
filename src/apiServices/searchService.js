import * as request from '~/utils/request';

export const search = async (q, type = 'less', cpage = 1) => {
    try {
        const res = await request.get('/search', {
            params: {
                q,
                type,
                cpage,
            },
        });
        return res.movies;
    } catch (error) {
        console.log(error);
    }
};

export const pagination = async (q = '', size = 6, cpage = 1, genres = null, type = '', manufacturers = null) => {
    try {
        const res = await request.get('/pagination', {
            params: {
                q: q,
                size: size,
                cpage: cpage,
                genres: genres,
                type: type,
                manufacturers: manufacturers,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const schedule = async (q = '', size = 6, cpage = 1, genre = '') => {
    try {
        const res = await request.get('/schedule', {
            params: {
                q: q,
                size: size,
                cpage: cpage,
                genre: genre,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getMovieInfo = async (movieId) => {
    //console.log(movieId);
    try {
        const res = await request.get(`/${movieId}`);
        return res;
    } catch (error) {
        alert('Something went wrong!');
    }
};
