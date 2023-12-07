import classNames from 'classnames/bind';
import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { toast } from 'react-toastify';

import styles from './Booking.module.scss';
import { MovieItemWithDesc } from '~/components/MovieItem';
import NavStepper from '~/components/NavStepper';
import { Step1, Step2, Step3 } from './FormBooking';
import { addToCartActions, fetchInfoAddToCart } from '~/store/add-to-cart-slice';

const getUniqueArray = (array) => {
    var uniqueArray = array.filter(
        (item, index) =>
            array.findIndex(
                (other) =>
                    other.screeningId === item.screeningId &&
                    other.auditoriumId === item.auditoriumId &&
                    other.movieId === item.movieId,
            ) === index,
    );
    return uniqueArray;
};

const cx = classNames.bind(styles);

const NAV_PURCHASE_TICKET = ['choose seats', 'purchase', 'complete'];
function Booking() {
    let [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get('tab');
    //console.log(tab);
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = useState(+tab);
    const checkoutInfo = useSelector((state) => state.addToCart);
    const [userInfo, setUserInfo] = useState({ username: '', email: '' });
    let sliderRef = useRef(null);
    const movieId = checkoutInfo.activeMovie;

    const notify = (message, type = 'success') => {
        toast(message, {
            type: type,
            style: { fontSize: '1.4rem' },
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            closeOnClick: true,
            className: 'foo-bar',
        });
    };

    const handleActiveStep = useCallback(
        (stepIndex) => {
            if (checkoutInfo.listSeatSelected?.length === 0) {
                if (stepIndex === 2 || stepIndex === 3) {
                    notify('You must select at least one seat to continue!', 'error');
                    return;
                }
            }

            if (stepIndex === 1 && checkoutInfo.paymentStatus) {
                notify('You have already paid so you cannot go back to step 1!!', 'info');
                return;
            }

            if (stepIndex === 3) {
                //console.log(checkoutInfo.paymentStatus, 'asdfasdf');
                if (checkoutInfo.paymentStatus === false) {
                    notify('You must complete payment to go to the next step!!', 'error');
                    return;
                }

                if (userInfo.username === '' || userInfo.email === '') {
                    notify('You cannot leave either or both of the username and email fields blank.', 'error');
                    return;
                }
            }
            sliderRef.current.slickGoTo(stepIndex - 1);
            setSearchParams({ tab: stepIndex });
            setActiveStep(stepIndex);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [checkoutInfo.listSeatSelected, checkoutInfo.paymentStatus, userInfo.username, userInfo.email],
    );

    var settings = {
        infinite: false,
        arrows: false,
        dots: false,
        draggable: false,
        lazyLoad: true,
        initialSlide: tab - 1,
        //fade: true,
        adaptiveHeight: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    let uniqueListScreeningActive = useMemo(() => {
        return getUniqueArray(checkoutInfo.listScreeningsAreActive);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //console.log(movieId);
    //console.log(checkoutInfo);
    useEffect(() => {
        //console.log('pagegoi', id);
        dispatch(fetchInfoAddToCart(movieId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getCurrentMoviePosition = () => {
        const currentMoviePosition = uniqueListScreeningActive.findIndex(
            (ele) => ele.movieId === checkoutInfo.activeMovie,
        );
        return currentMoviePosition;
    };
    const handleNextBooking = useCallback(async () => {
        const currentMoviePosition = getCurrentMoviePosition();
        let nextMoviePosition =
            currentMoviePosition + 1 > uniqueListScreeningActive?.length - 1 ? 0 : currentMoviePosition + 1;
        const currentMovieInfo = uniqueListScreeningActive[nextMoviePosition];
        await dispatch(
            addToCartActions.onChangeBooking({
                activeMovie: currentMovieInfo.movieId,
                activeDate: currentMovieInfo.activeDate,
                activeShowtime: currentMovieInfo.screeningId,
                activeAuditorium: currentMovieInfo.auditoriumId,
            }),
        );
        // Check if the action was successful
        dispatch(fetchInfoAddToCart(currentMovieInfo.movieId));
        // Dispatch the second action with the payload from the first action
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkoutInfo]);

    const handlePrevBooking = useCallback(async () => {
        const currentMoviePosition = getCurrentMoviePosition();
        let prevMoviePosition =
            currentMoviePosition - 1 < 0 ? uniqueListScreeningActive?.length - 1 : currentMoviePosition - 1;
        const currentMovieInfo = uniqueListScreeningActive[prevMoviePosition];
        await dispatch(
            addToCartActions.onChangeBooking({
                activeMovie: currentMovieInfo.movieId,
                activeDate: currentMovieInfo.activeDate,
                activeShowtime: currentMovieInfo.screeningId,
                activeAuditorium: currentMovieInfo.auditoriumId,
            }),
        );
        dispatch(fetchInfoAddToCart(currentMovieInfo.movieId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkoutInfo]);

    // for step 2
    const handleChangeInput = useCallback((e) => {
        setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('movie-info')}>
                <MovieItemWithDesc
                    data={checkoutInfo.movieInfo}
                    arrows={uniqueListScreeningActive?.length > 1}
                    onNext={handleNextBooking}
                    onPrev={handlePrevBooking}
                />
            </div>
            <div className={cx('form-buy-ticket')}>
                <div className={cx('nav-stepper')}>
                    <NavStepper items={NAV_PURCHASE_TICKET} activeStep={activeStep} onClick={handleActiveStep} />
                </div>
                <div className={cx('form')}>
                    <Slider {...settings} ref={sliderRef}>
                        <Step1 nextBtn onNextStep={handleActiveStep} />
                        <Step2 onNextStep={handleActiveStep} onChangeInfo={handleChangeInput} />
                        <Step3 userInfo={userInfo} />
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default Booking;
