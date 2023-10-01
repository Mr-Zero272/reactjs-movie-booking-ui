import classNames from 'classnames/bind';
import styles from './Step1.module.scss';
import Seat from './Seat';

const cx = classNames.bind(styles);
function RowOfSeats({ rowSeat, listSeats }) {
    return (
        <div className={cx('row-seat')}>
            <div className={cx('row-seat-side')}>
                <div className={cx('row-name')}>{rowSeat}</div>
                {listSeats.slice(0, 8).map((item) => (
                    <Seat
                        key={item.id}
                        seatInfo={{
                            id: item.id,
                            numberSeat: item.numberSeat,
                            rowSeat: item.rowSeat,
                            price: item.price,
                        }}
                        selected={item.stateSeat === 'selected'}
                        taken={item.stateSeat === 'taken'}
                    />
                ))}
            </div>
            <div className={cx('row-seat-center')}>
                {listSeats.slice(8, 18).map((item) => (
                    <Seat
                        key={item.id}
                        seatInfo={{
                            id: item.id,
                            numberSeat: item.numberSeat,
                            rowSeat: item.rowSeat,
                            price: item.price,
                        }}
                        selected={item.stateSeat === 'selected'}
                        taken={item.stateSeat === 'taken'}
                    />
                ))}
            </div>
            <div className={cx('row-seat-side')}>
                {listSeats.slice(18).map((item) => (
                    <Seat
                        key={item.id}
                        seatInfo={{
                            id: item.id,
                            numberSeat: item.numberSeat,
                            rowSeat: item.rowSeat,
                            price: item.price,
                        }}
                        selected={item.stateSeat === 'selected'}
                        taken={item.stateSeat === 'taken'}
                    />
                ))}
                <div className={cx('row-name')}>{rowSeat}</div>
            </div>
        </div>
    );
}

export default RowOfSeats;
