import classNames from 'classnames/bind';
import React, { useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './Booking.module.scss';
import { MovieItemWithDesc } from '~/components/MovieItem';
import NavStepper from '~/components/NavStepper';
import { Step1, Step2, Step3 } from './FormBooking';
const cx = classNames.bind(styles);

const NAV_PURCHASE_TICKET = ['choose seats', 'purchase', 'complete'];
function Booking() {
    const [activeStep, setActiveStep] = useState(1);
    const formBookingTicketInfo = useSelector((state) => state.formBookingTicket);
    //console.log(formBookingTicketInfo);
    let sliderRef = useRef(null);

    const handleActiveStep = useCallback((stepIndex) => {
        sliderRef.current.slickGoTo(stepIndex - 1);
        setActiveStep(stepIndex);
    }, []);

    var settings = {
        infinite: false,
        arrows: false,
        dots: false,
        draggable: false,
        //fade: true,
        adaptiveHeight: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('movie-info')}>
                <MovieItemWithDesc />
            </div>
            <div className={cx('form-buy-ticket')}>
                <div className={cx('nav-stepper')}>
                    <NavStepper items={NAV_PURCHASE_TICKET} activeStep={activeStep} onClick={handleActiveStep} />
                </div>
                <div className={cx('form')}>
                    <Slider {...settings} ref={sliderRef}>
                        <Step1 onNextStep={handleActiveStep} />
                        <Step2 onNextStep={handleActiveStep} />
                        <Step3 />
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default Booking;
