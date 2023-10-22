import * as request from '~/utils/request';

export const getAllSeat = async (screeningId = 1, auditoriumId = 1) => {
    try {
        const res = await request.getCart('/seats', {
            params: {
                screeningId,
                auditoriumId,
            },
        });
        return res.data;
    } catch (error) {
        alert(error);
    }
};

export const getAllTicketInActiveCart = async (token = '') => {
    try {
        const res = await request.getCart('', {
            headers: { Authorization: 'Bearer ' + token },
        });
        return res.data;
    } catch (error) {
        alert(error);
    }
};

export const addListTicketToCart = async (token = '', ids = []) => {
    //console.log(ids);
    try {
        const res = await request.addToCart(
            '',
            {
                ids,
            },
            {
                headers: { Authorization: 'Bearer ' + token },
            },
        );
        return res;
    } catch (error) {
        alert(error);
    }
};

export const getListBookedTicketsByUser = async (token = '') => {
    try {
        const res = await request.getCart('/checkout', {
            headers: { Authorization: 'Bearer ' + token },
        });
        return res.data;
    } catch (error) {
        alert(error);
    }
};

export const getListTicketsBeforeBook = async (ids) => {
    //console.log(ids);
    try {
        const res = await request.getCart('/tickets', {
            params: {
                ids,
            },
            paramsSerializer: (params) => {
                return Object.keys(params)
                    .map((key) => `${key}=${params[key].join(',')}`)
                    .join('&');
            },
        });
        return res.data;
    } catch (error) {
        alert(error);
    }
};

export const checkout = async (token = '', ids = [], paid = false) => {
    //console.log(ids);
    try {
        const res = await request.checkout(
            '/checkout',
            {
                ids,
                paid,
            },
            {
                headers: { Authorization: 'Bearer ' + token },
            },
        );
        return res;
    } catch (error) {
        alert(error);
    }
};

export const deleteTicketById = async (token = '', ids = []) => {
    //console.log(ids);
    try {
        const res = await request.deleteTicket('', {
            headers: { Authorization: 'Bearer ' + token },
            data: {
                ids,
            },
        });
        return res;
    } catch (error) {
        alert(error);
    }
};
