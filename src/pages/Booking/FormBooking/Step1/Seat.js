import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';

import styles from './Step1.module.scss';
import { formBookingTicketActions } from '~/store/form-boking-ticket-slice';

const cx = classNames.bind(styles);
function Seat({ seatInfo, available, taken, selected }) {
    const dispatch = useDispatch();
    let handleChooseSeats = (seatInfo) => {
        dispatch(formBookingTicketActions.chooseSeats(seatInfo));
    };
    if (taken) handleChooseSeats = (seatInfo) => {};
    return (
        <div className={cx('seat', { taken, selected })} onClick={() => handleChooseSeats(seatInfo)}>
            <div className={cx('seat-top')}></div>
            <div className={cx('seat-bottom')}></div>
        </div>
    );
}

export default Seat;
