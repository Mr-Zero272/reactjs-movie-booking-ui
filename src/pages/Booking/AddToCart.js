import classNames from 'classnames/bind';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './Booking.module.scss';
import { MovieItemWithDesc } from '~/components/MovieItem';
import NavStepper from '~/components/NavStepper';
import { Step1 } from './FormBooking';
import { useNavigate } from 'react-router-dom';
import { fetchInfoAddToCart } from '~/store/add-to-cart-slice';
import * as cartService from '~/apiServices/cartService';
import { fetchQuantityCart } from '~/store/cart-quantity';

const cx = classNames.bind(styles);

const NAV_PURCHASE_TICKET = ['Add to cart'];
function AddToCart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const addToCartInfo = useSelector((state) => state.addToCart);
    const movieId = addToCartInfo.activeMovie;
    //console.log(id);
    //console.log(addToCartInfo);
    useEffect(() => {
        //console.log('pagegoi', id);
        dispatch(fetchInfoAddToCart(movieId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = useCallback(() => {
        if (addToCartInfo.listSeatSelected?.length === 0) {
            alert('You have choose at least one seat!');
        } else {
            const callApiAddToCart = async () => {
                const token = localStorage.getItem('token');
                const ids = addToCartInfo.listSeatSelected.map((item) => {
                    return item.seatId;
                });
                const response = await cartService.addListTicketToCart(token, ids);
                if (response && response.message) {
                    const id = toast.loading('Please wait...');
                    setTimeout(() => {
                        toast.update(id, {
                            render: response.message,
                            type: 'success',
                            isLoading: false,
                            autoClose: 2000,
                        });
                        dispatch(fetchQuantityCart());
                        navigate(-1);
                    }, 1000);
                }
            };

            callApiAddToCart();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addToCartInfo.listSeatSelected]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('movie-info')}>
                <MovieItemWithDesc data={addToCartInfo.movieInfo} />
            </div>
            <div className={cx('form-buy-ticket')}>
                <div className={cx('nav-stepper')}>
                    <NavStepper items={NAV_PURCHASE_TICKET} activeStep={1} />
                </div>
                <div className={cx('form')}>
                    <Step1 addToCartBtn onSubmit={handleSubmit} />
                </div>
            </div>
        </div>
    );
}

export default AddToCart;
