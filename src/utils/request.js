import axios from 'axios';
// user
const requestUser = axios.create({
    baseURL: 'http://localhost:8081/api/v1/user',
});

export const getCurrentUser = async (path, options = {}) => {
    const response = await requestUser.get(path, options);

    return response.data;
};

export const changeAvatar = async (path, data = {}, options = {}) => {
    const response = await requestUser.post(path, data, options);

    return response.data;
};

export const updateUser = async (path, data = {}, options = {}) => {
    const response = await requestUser.put(path, data, options);

    return response.data;
};

//movie
const request = axios.create({
    baseURL: 'http://localhost:8081/api/v1/movie',
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);

    return response.data;
};

//auth
const requestAuth = axios.create({
    baseURL: 'http://localhost:8081/api/v1/auth',
});

export const getAuth = async (path, options = {}) => {
    const response = await requestAuth.get(path, options);

    return response.data;
};

export const postAuth = async (path, data = {}, options = {}) => {
    const response = await requestAuth.post(path, data, options);

    return response.data;
};

//cart
const requestCart = axios.create({
    baseURL: 'http://localhost:8081/api/v1/cart',
});

export const getCart = async (path, options = {}) => {
    const response = await requestCart.get(path, options);

    return response;
};

export const addToCart = async (path, data, options = {}) => {
    const response = await requestCart.post(path, data, options);

    return response.data;
};

export const checkout = async (path, data, options = {}) => {
    const response = await requestCart.post(path, data, options);

    return response.data;
};

export const deleteTicket = async (path, options = {}) => {
    const response = await requestCart.delete(path, options);

    return response.data;
};

export default request;
