import * as request from '~/utils/request';

export const register = async (username, password, email, avatar = 'no_image.png', phoneNumber = '0999999999') => {
    console.log(username, password, email, avatar);
    try {
        const res = await request.postAuth(
            '/register',
            {
                username: username,
                password: password,
                email: email,
                avatar: avatar,
                phoneNumber: phoneNumber,
            },
            {},
        );
        return res;
    } catch (error) {
        return error;
    }
};

export const login = async (username, password) => {
    //console.log(username, password);
    try {
        const res = await request.postAuth(
            '/authenticate',
            {
                username: username,
                password: password,
            },
            {},
        );
        return res;
    } catch (error) {
        return error;
    }
};
