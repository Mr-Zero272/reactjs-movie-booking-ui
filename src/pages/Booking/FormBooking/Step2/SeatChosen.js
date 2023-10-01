import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './Step2.module.scss';
import { formBookingTicketActions } from '~/store/form-boking-ticket-slice';
const cx = classNames.bind(styles);
function SeatChosen({ seatInfo }) {
    const dispatch = useDispatch();
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
                    {seatInfo.price}k
                </p>
            </div>
            <div className={cx('seat-chosen-column')}>
                <button
                    className={cx('delete-seat-btn')}
                    onClick={() => dispatch(formBookingTicketActions.chooseSeats(seatInfo))}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
        </div>
    );
}

export default SeatChosen;
