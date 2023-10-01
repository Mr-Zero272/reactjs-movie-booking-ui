import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:8081/api/v1/movie',
});

const requestAuth = axios.create({
    baseURL: 'http://localhost:8081/api/v1/auth',
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);

    return response.data;
};

export const getAuth = async (path, options = {}) => {
    const response = await requestAuth.get(path, options);

    return response.data;
};

export const postAuth = async (path, data = {}, options = {}) => {
    const response = await requestAuth.post(path, data, options);

    return response.data;
};

export default request;
