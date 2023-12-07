import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './Step2.module.scss';
import { addToCartActions } from '~/store/add-to-cart-slice';
const cx = classNames.bind(styles);
function SeatChosen({ seatInfo, screeningIfo }) {
    const dispatch = useDispatch();
    const addToCartInfo = useSelector((state) => state.addToCart);
    //console.log(seatInfo);

    return (
        <div className={cx('seat-chosen-wrapper')}>
            <div className={cx('seat-chosen-column')}>
                <p>
                    Seat number <strong>{seatInfo.numberSeat}</strong>
                </p>
            </div>
            <div className={cx('seat-chosen-column')}>
                <p>
                    Row <strong>{seatInfo.rowSeat}</strong>
                </p>
            </div>
            <div className={cx('seat-chosen-column', 'price')}>
                <p>
                    <span>&#8363;</span>
                    {seatInfo.price / 1000}k
                </p>
            </div>
            <div className={cx('seat-chosen-column')}>
                <button
                    className={cx('delete-seat-btn')}
                    onClick={() =>
                        dispatch(
                            addToCartActions.chooseSeats({
                                newSeat: seatInfo,
                                newScreening: {
                                    seatId: seatInfo.seatId,
                                    screeningId: addToCartInfo.activeShowtime,
                                    auditoriumId: screeningIfo[0].auditorium.id,
                                    movieId: addToCartInfo.activeMovie,
                                    activeDate: screeningIfo[0].screening_start,
                                },
                            }),
                        )
                    }
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
        </div>
    );
}

export default SeatChosen;
