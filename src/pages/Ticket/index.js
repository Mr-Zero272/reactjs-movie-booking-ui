import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import Slider from 'react-slick';
import { useSearchParams } from 'react-router-dom';

import styles from './Ticket.module.scss';
import NavStepper from '~/components/NavStepper';
import BasicProfile from '~/components/BasicProfile';
import Cart from './Cart';
import * as userService from '~/apiServices/userService';
import ListTicket from './ListTicket';
import CheckSection from './CheckoutSection';
import { addToCartActions } from '~/store/add-to-cart-slice';

const cx = classNames.bind(styles);
const NAV_TICKET_PAGE = ['Cart', 'Tickets'];

function Ticket() {
    let [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get('tab');
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = useState(+tab);
    const cartInfo = useSelector((state) => state.addToCart);
    //console.log(tab);
    //console.log(cartInfo);
    const [userDetail, setUserDetail] = useState(() => ({
        avatar: '',
        email: '',
        id: 0,
        username: '',
    }));
    //cart-part

    // slider
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
        initialSlide: tab - 1,
        //fade: true,
        adaptiveHeight: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    // get info for basic profile
    useEffect(() => {
        //sliderRef.current.slickGoTo(tab - 1);
        const fetchApi = async () => {
            const token = localStorage.getItem('token');
            const result = await userService.getCurrentUser(token);
            setUserDetail((prev) => ({
                ...prev,
                ...result,
            }));

            //setListBookedTickets(listBookedTickets);
        };
        dispatch(addToCartActions.refreshState());

        fetchApi();
    }, []);

    // handle toggle modal

    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-info')}>
                <BasicProfile userDetail={userDetail} />
            </div>
            <div className={cx('content')}>
                <div className={cx('header-content')}>
                    <NavStepper items={NAV_TICKET_PAGE} activeStep={activeStep} onClick={handleActiveStep} />
                    {cartInfo.listScreeningsAreActive?.length > 0 && <CheckSection />}
                </div>
                <div className={cx('content-body')}>
                    <Slider {...settings} ref={sliderRef}>
                        <Cart />
                        <ListTicket userInfo={userDetail} />
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default Ticket;
