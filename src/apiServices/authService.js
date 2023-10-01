import * as request from '~/utils/request';

export const register = async (username, password, email, avatar = 'myAvatar.jpg') => {
    console.log(username, password, email, avatar);
    try {
        const res = await request.postAuth(
            '/register',
            {
                username: username,
                password: password,
                email: email,
                avatar: avatar,
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
