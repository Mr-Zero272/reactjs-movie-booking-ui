import * as request from '~/utils/request';

export const getCurrentUser = async (token = '') => {
    try {
        const res = await request.getCurrentUser('', {
            headers: { Authorization: 'Bearer ' + token },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const changeAvatar = async (token = '', formData) => {
    try {
        const res = await request.changeAvatar('/avatar', formData, {
            headers: { Authorization: 'Bearer ' + token },
        });
        return res;
    } catch (error) {
        alert(error);
    }
};

export const updateUserInfo = async (token = '', formData) => {
    //console.log(token, newUsername, newEmail, 'sadfasdfasdfasdf');
    try {
        const res = await request.updateUser('', formData, {
            headers: { Authorization: 'Bearer ' + token },
        });
        return res;
    } catch (error) {
        alert(error);
    }
};
