import classNames from 'classnames/bind';
import styles from './Step1.module.scss';
import Seat from './Seat';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);
function RowOfSeats({ rowSeat, listSeats }) {
    //console.log(listSeats);
    const listSeatSelected = useSelector((state) => state.addToCart.listSeatSelected);
    return (
        <div className={cx('row-seat')}>
            <div className={cx('row-seat-side')}>
                <div className={cx('row-name')}>{rowSeat}</div>
                {listSeats.slice(0, 8).map((item) => (
                    <Seat
                        key={item.seatId}
                        seatInfo={{
                            seatId: item.seatId,
                            status: item.status,
                            numberSeat: item.numberSeat,
                            rowSeat: item.rowSeat,
                            price: item.price,
                        }}
                        selected={listSeatSelected.find((i) => i.seatId === item.seatId)}
                        booked={item.status === 'booked'}
                    />
                ))}
            </div>
            <div className={cx('row-seat-center')}>
                {listSeats.slice(8, 18).map((item) => (
                    <Seat
                        key={item.seatId}
                        seatInfo={{
                            seatId: item.seatId,
                            status: item.status,
                            numberSeat: item.numberSeat,
                            rowSeat: item.rowSeat,
                            price: item.price,
                        }}
                        selected={listSeatSelected.find((i) => i.seatId === item.seatId)}
                        booked={item.status === 'booked'}
                    />
                ))}
            </div>
            <div className={cx('row-seat-side')}>
                {listSeats.slice(18).map((item) => (
                    <Seat
                        key={item.seatId}
                        seatInfo={{
                            seatId: item.seatId,
                            status: item.status,
                            numberSeat: item.numberSeat,
                            rowSeat: item.rowSeat,
                            price: item.price,
                        }}
                        selected={listSeatSelected.find((i) => i.seatId === item.seatId)}
                        booked={item.status === 'booked'}
                    />
                ))}
                <div className={cx('row-name')}>{rowSeat}</div>
            </div>
        </div>
    );
}

export default RowOfSeats;
