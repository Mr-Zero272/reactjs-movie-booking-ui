import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import styles from './Step1.module.scss';
import { addToCartActions } from '~/store/add-to-cart-slice';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);
function Seat({ seatInfo, booked, selected }) {
    const dispatch = useDispatch();
    //const location = useLocation();
    //console.log('location: ', location);
    const [screeningInfo, setScreeningInfo] = useState({});
    const addToCartInfo = useSelector((state) => state.addToCart);
    useEffect(() => {
        const activeScreening = addToCartInfo.screenings.filter((item) => item.id === addToCartInfo.activeShowtime);
        //console.log(activeScreening);
        setScreeningInfo((prev) => ({
            activeScreening,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addToCartInfo.screenings]);
    //console.log(screeningInfo);
    let handleChooseSeats = (seatInfo) => {
        // if (location.pathname === '/booking') {
        //     dispatch(
        //         addToCartActions.chooseSeatsWhenCheckout({
        //             newSeat: seatInfo,
        //         }),
        //     );
        // } else {
        dispatch(
            addToCartActions.chooseSeats({
                newSeat: seatInfo,
                newScreening: {
                    seatId: seatInfo.seatId,
                    screeningId: addToCartInfo.activeShowtime,
                    auditoriumId: screeningInfo.activeScreening[0].auditorium.id,
                    movieId: addToCartInfo.activeMovie,
                    activeDate: screeningInfo.activeScreening[0].screening_start,
                },
            }),
        );
        // }
    };
    if (booked) handleChooseSeats = (seatInfo) => {};
    return (
        <div className={cx('seat', { booked, selected })} onClick={() => handleChooseSeats(seatInfo)}>
            <div className={cx('seat-top')}></div>
            <div className={cx('seat-bottom')}></div>
        </div>
    );
}

export default Seat;
