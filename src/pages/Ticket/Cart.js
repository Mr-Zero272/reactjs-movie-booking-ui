import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames/bind';
import styles from './Ticket.module.scss';

import CartItem from './CartItem';
import * as cartService from '~/apiServices/cartService';
import { addToCartActions } from '~/store/add-to-cart-slice';
import { fetchQuantityCart } from '~/store/cart-quantity';

const cx = classNames.bind(styles);
function Cart() {
    const dispatch = useDispatch();
    const cartInfo = useSelector((state) => state.addToCart);
    const [listTicket, setListTicket] = useState([]);
    const checkoutInfo = {
        activeMovie: cartInfo.activeMovie,
        listScreeningsAreActive: cartInfo.listScreeningsAreActive,
        activeDate: cartInfo.activeDate,
        activeShowtime: cartInfo.activeShowtime,
        listSeatSelected: cartInfo.listSeatSelected,
    };
    useEffect(() => {
        const fetchApi = async () => {
            const token = localStorage.getItem('token');
            const result = await cartService.getAllTicketInActiveCart(token);
            //console.log(result);
            setListTicket(result);
        };

        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addToDistinctArray = (array, value) => {
        let temp = [];
        if (array.some((item) => item.seatId === value.seatId)) {
            temp = array.filter((it) => it.seatId !== value.seatId);
        } else {
            temp = [...array, value];
        }
        return temp;
    };

    const handleDeleteItemInCart = useCallback(() => {
        const fetchApi = async () => {
            const token = localStorage.getItem('token');
            const result = await cartService.getAllTicketInActiveCart(token);
            //console.log(result);
            setListTicket(result);
        };

        fetchApi();
        dispatch(fetchQuantityCart());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCheck = useCallback(
        (seatChosenId) => {
            const seatInfo = listTicket.filter((item) => item.seatStatus.id === seatChosenId);
            //console.log(seatInfo);

            const temp = {
                ...checkoutInfo,
                activeMovie: seatInfo[0].movieId,
                listScreeningsAreActive: addToDistinctArray(checkoutInfo.listScreeningsAreActive, {
                    seatId: seatChosenId,
                    screeningId: seatInfo[0].seatStatus.screening.id,
                    auditoriumId: seatInfo[0].seatStatus.screening.auditorium.id,
                    movieId: seatInfo[0].movieId,
                    activeDate: seatInfo[0].seatStatus.screening.screening_start,
                }),
                activeDate: seatInfo[0].seatStatus.screening.screening_start,
                listSeatSelected: addToDistinctArray(checkoutInfo.listSeatSelected, {
                    seatId: seatChosenId,
                    status: seatInfo[0].seatStatus.status,
                    numberSeat: seatInfo[0].seatStatus.seat.numberSeat,
                    rowSeat: seatInfo[0].seatStatus.seat.rowSeat,
                    price: seatInfo[0].seatStatus.price,
                }),
                activeShowtime: seatInfo[0].seatStatus.screening.id,
            };
            dispatch(addToCartActions.checkout(temp));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [checkoutInfo],
    );

    return (
        <div className={cx('cart-wrapper')}>
            {listTicket.map((item) => (
                <CartItem
                    key={item.seatStatus.id}
                    checked={cartInfo.listSeatSelected.some((it) => it.seatId === item.seatStatus.id)}
                    data={item}
                    onSelect={handleCheck}
                    onDelete={handleDeleteItemInCart}
                />
            ))}
        </div>
    );
}

export default Cart;
