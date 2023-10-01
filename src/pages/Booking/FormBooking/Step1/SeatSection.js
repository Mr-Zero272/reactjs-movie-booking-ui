import { useSelector } from 'react-redux';

import classNames from 'classnames/bind';
import styles from './Step1.module.scss';
import RowOfSeats from './RowOfSeats';
import Seat from './Seat';

const cx = classNames.bind(styles);

function SeatSection({ auditorium }) {
    //lay cai auditorium call api lay ds seats
    const listRowSeat = ['A', 'B', 'C', 'D', 'E', 'F'];
    const fakeDataSeat = [
        { id: 1, numberSeat: 1, rowSeat: 'A', stateSeat: 'available', price: 70 },
        { id: 2, numberSeat: 2, rowSeat: 'A', stateSeat: 'available', price: 70 },
        { id: 3, numberSeat: 3, rowSeat: 'A', stateSeat: 'available', price: 70 },
        { id: 4, numberSeat: 4, rowSeat: 'A', stateSeat: 'taken', price: 70 },
        { id: 5, numberSeat: 5, rowSeat: 'A', stateSeat: 'available', price: 70 },
        { id: 6, numberSeat: 6, rowSeat: 'A', stateSeat: 'available', price: 70 },
        { id: 7, numberSeat: 7, rowSeat: 'A', stateSeat: 'taken', price: 70 },
        { id: 8, numberSeat: 8, rowSeat: 'A', stateSeat: 'available', price: 70 },
        { id: 9, numberSeat: 9, rowSeat: 'A', stateSeat: 'taken', price: 70 },
        { id: 10, numberSeat: 10, rowSeat: 'A', stateSeat: 'available', price: 70 },
        { id: 11, numberSeat: 11, rowSeat: 'A', stateSeat: 'taken', price: 70 },
        { id: 12, numberSeat: 12, rowSeat: 'A', stateSeat: 'available', price: 70 },
        { id: 13, numberSeat: 13, rowSeat: 'A', stateSeat: 'taken', price: 70 },
        { id: 14, numberSeat: 14, rowSeat: 'A', stateSeat: 'taken', price: 70 },
        { id: 15, numberSeat: 15, rowSeat: 'A', stateSeat: 'available', price: 70 },
        { id: 16, numberSeat: 16, rowSeat: 'A', stateSeat: 'available', price: 70 },
        { id: 17, numberSeat: 17, rowSeat: 'A', stateSeat: 'available', price: 70 },
        { id: 18, numberSeat: 18, rowSeat: 'A', stateSeat: 'taken', price: 70 },
        { id: 19, numberSeat: 19, rowSeat: 'A', stateSeat: 'taken', price: 70 },
        { id: 20, numberSeat: 20, rowSeat: 'A', stateSeat: 'available', price: 70 },
        { id: 21, numberSeat: 21, rowSeat: 'A', stateSeat: 'available', price: 70 },
        { id: 22, numberSeat: 22, rowSeat: 'A', stateSeat: 'available', price: 70 },
        { id: 23, numberSeat: 23, rowSeat: 'A', stateSeat: 'available', price: 70 },
        { id: 24, numberSeat: 24, rowSeat: 'A', stateSeat: 'available', price: 70 },
        { id: 25, numberSeat: 25, rowSeat: 'A', stateSeat: 'available', price: 70 },
        { id: 26, numberSeat: 26, rowSeat: 'A', stateSeat: 'available', price: 70 },
        { id: 27, numberSeat: 1, rowSeat: 'B', stateSeat: 'taken', price: 70 },
        { id: 28, numberSeat: 2, rowSeat: 'B', stateSeat: 'taken', price: 70 },
        { id: 29, numberSeat: 3, rowSeat: 'B', stateSeat: 'available', price: 70 },
        { id: 30, numberSeat: 4, rowSeat: 'B', stateSeat: 'taken', price: 70 },
        { id: 31, numberSeat: 5, rowSeat: 'B', stateSeat: 'available', price: 70 },
        { id: 32, numberSeat: 6, rowSeat: 'B', stateSeat: 'available', price: 70 },
        { id: 33, numberSeat: 7, rowSeat: 'B', stateSeat: 'taken', price: 70 },
        { id: 34, numberSeat: 8, rowSeat: 'B', stateSeat: 'available', price: 70 },
        { id: 35, numberSeat: 9, rowSeat: 'B', stateSeat: 'taken', price: 70 },
        { id: 36, numberSeat: 10, rowSeat: 'B', stateSeat: 'available', price: 70 },
        { id: 37, numberSeat: 11, rowSeat: 'B', stateSeat: 'taken', price: 70 },
        { id: 38, numberSeat: 12, rowSeat: 'B', stateSeat: 'available', price: 70 },
        { id: 39, numberSeat: 13, rowSeat: 'B', stateSeat: 'taken', price: 70 },
        { id: 40, numberSeat: 14, rowSeat: 'B', stateSeat: 'taken', price: 70 },
        { id: 41, numberSeat: 15, rowSeat: 'B', stateSeat: 'available', price: 70 },
        { id: 42, numberSeat: 16, rowSeat: 'B', stateSeat: 'taken', price: 70 },
        { id: 43, numberSeat: 17, rowSeat: 'B', stateSeat: 'available', price: 70 },
        { id: 44, numberSeat: 18, rowSeat: 'B', stateSeat: 'taken', price: 70 },
        { id: 45, numberSeat: 19, rowSeat: 'B', stateSeat: 'taken', price: 70 },
        { id: 46, numberSeat: 20, rowSeat: 'B', stateSeat: 'available', price: 70 },
        { id: 47, numberSeat: 21, rowSeat: 'B', stateSeat: 'available', price: 70 },
        { id: 48, numberSeat: 22, rowSeat: 'B', stateSeat: 'available', price: 70 },
        { id: 49, numberSeat: 23, rowSeat: 'B', stateSeat: 'available', price: 70 },
        { id: 50, numberSeat: 24, rowSeat: 'B', stateSeat: 'available', price: 70 },
        { id: 51, numberSeat: 25, rowSeat: 'B', stateSeat: 'taken', price: 70 },
        { id: 52, numberSeat: 26, rowSeat: 'B', stateSeat: 'available', price: 70 },
        { id: 53, numberSeat: 1, rowSeat: 'C', stateSeat: 'available', price: 70 },
        { id: 54, numberSeat: 2, rowSeat: 'C', stateSeat: 'taken', price: 70 },
        { id: 55, numberSeat: 3, rowSeat: 'C', stateSeat: 'available', price: 70 },
        { id: 56, numberSeat: 4, rowSeat: 'C', stateSeat: 'available', price: 70 },
        { id: 57, numberSeat: 5, rowSeat: 'C', stateSeat: 'available', price: 70 },
        { id: 58, numberSeat: 6, rowSeat: 'C', stateSeat: 'available', price: 70 },
        { id: 59, numberSeat: 7, rowSeat: 'C', stateSeat: 'available', price: 70 },
        { id: 60, numberSeat: 8, rowSeat: 'C', stateSeat: 'available', price: 70 },
        { id: 61, numberSeat: 9, rowSeat: 'C', stateSeat: 'taken', price: 70 },
        { id: 62, numberSeat: 10, rowSeat: 'C', stateSeat: 'available', price: 70 },
        { id: 63, numberSeat: 11, rowSeat: 'C', stateSeat: 'available', price: 70 },
        { id: 64, numberSeat: 12, rowSeat: 'C', stateSeat: 'available', price: 70 },
        { id: 65, numberSeat: 13, rowSeat: 'C', stateSeat: 'available', price: 70 },
        { id: 66, numberSeat: 14, rowSeat: 'C', stateSeat: 'available', price: 70 },
        { id: 67, numberSeat: 15, rowSeat: 'C', stateSeat: 'available', price: 70 },
        { id: 68, numberSeat: 16, rowSeat: 'C', stateSeat: 'available', price: 70 },
        { id: 69, numberSeat: 17, rowSeat: 'C', stateSeat: 'taken', price: 70 },
        { id: 70, numberSeat: 18, rowSeat: 'C', stateSeat: 'available', price: 70 },
        { id: 71, numberSeat: 19, rowSeat: 'C', stateSeat: 'available', price: 70 },
        { id: 72, numberSeat: 20, rowSeat: 'C', stateSeat: 'taken', price: 70 },
        { id: 73, numberSeat: 21, rowSeat: 'C', stateSeat: 'available', price: 70 },
        { id: 74, numberSeat: 22, rowSeat: 'C', stateSeat: 'available', price: 70 },
        { id: 75, numberSeat: 23, rowSeat: 'C', stateSeat: 'available', price: 70 },
        { id: 76, numberSeat: 24, rowSeat: 'C', stateSeat: 'available', price: 70 },
        { id: 77, numberSeat: 25, rowSeat: 'C', stateSeat: 'available', price: 70 },
        { id: 78, numberSeat: 26, rowSeat: 'C', stateSeat: 'available', price: 70 },
        { id: 79, numberSeat: 1, rowSeat: 'D', stateSeat: 'taken', price: 70 },
        { id: 80, numberSeat: 2, rowSeat: 'D', stateSeat: 'available', price: 70 },
        { id: 81, numberSeat: 3, rowSeat: 'D', stateSeat: 'available', price: 70 },
        { id: 82, numberSeat: 4, rowSeat: 'D', stateSeat: 'taken', price: 70 },
        { id: 83, numberSeat: 5, rowSeat: 'D', stateSeat: 'available', price: 70 },
        { id: 84, numberSeat: 6, rowSeat: 'D', stateSeat: 'available', price: 70 },
        { id: 85, numberSeat: 7, rowSeat: 'D', stateSeat: 'available', price: 70 },
        { id: 86, numberSeat: 8, rowSeat: 'D', stateSeat: 'available', price: 70 },
        { id: 87, numberSeat: 9, rowSeat: 'D', stateSeat: 'available', price: 70 },
        { id: 88, numberSeat: 10, rowSeat: 'D', stateSeat: 'available', price: 70 },
        { id: 89, numberSeat: 11, rowSeat: 'D', stateSeat: 'available', price: 70 },
        { id: 90, numberSeat: 12, rowSeat: 'D', stateSeat: 'available', price: 70 },
        { id: 91, numberSeat: 13, rowSeat: 'D', stateSeat: 'taken', price: 70 },
        { id: 92, numberSeat: 14, rowSeat: 'D', stateSeat: 'available', price: 70 },
        { id: 93, numberSeat: 15, rowSeat: 'D', stateSeat: 'available', price: 70 },
        { id: 94, numberSeat: 16, rowSeat: 'D', stateSeat: 'available', price: 70 },
        { id: 95, numberSeat: 17, rowSeat: 'D', stateSeat: 'available', price: 70 },
        { id: 96, numberSeat: 18, rowSeat: 'D', stateSeat: 'available', price: 70 },
        { id: 97, numberSeat: 19, rowSeat: 'D', stateSeat: 'taken', price: 70 },
        { id: 98, numberSeat: 20, rowSeat: 'D', stateSeat: 'available', price: 70 },
        { id: 99, numberSeat: 21, rowSeat: 'D', stateSeat: 'available', price: 70 },
        { id: 100, numberSeat: 22, rowSeat: 'D', stateSeat: 'available', price: 70 },
        { id: 101, numberSeat: 23, rowSeat: 'D', stateSeat: 'available', price: 70 },
        { id: 102, numberSeat: 24, rowSeat: 'D', stateSeat: 'available', price: 70 },
        { id: 103, numberSeat: 25, rowSeat: 'D', stateSeat: 'available', price: 70 },
        { id: 104, numberSeat: 26, rowSeat: 'D', stateSeat: 'available', price: 70 },
        { id: 105, numberSeat: 1, rowSeat: 'E', stateSeat: 'available', price: 70 },
        { id: 106, numberSeat: 2, rowSeat: 'E', stateSeat: 'taken', price: 70 },
        { id: 107, numberSeat: 3, rowSeat: 'E', stateSeat: 'available', price: 70 },
        { id: 108, numberSeat: 4, rowSeat: 'E', stateSeat: 'taken', price: 70 },
        { id: 109, numberSeat: 5, rowSeat: 'E', stateSeat: 'available', price: 70 },
        { id: 110, numberSeat: 6, rowSeat: 'E', stateSeat: 'available', price: 70 },
        { id: 111, numberSeat: 7, rowSeat: 'E', stateSeat: 'available', price: 70 },
        { id: 112, numberSeat: 8, rowSeat: 'E', stateSeat: 'taken', price: 70 },
        { id: 113, numberSeat: 9, rowSeat: 'E', stateSeat: 'available', price: 70 },
        { id: 114, numberSeat: 10, rowSeat: 'E', stateSeat: 'available', price: 70 },
        { id: 115, numberSeat: 11, rowSeat: 'E', stateSeat: 'available', price: 70 },
        { id: 116, numberSeat: 12, rowSeat: 'E', stateSeat: 'available', price: 70 },
        { id: 117, numberSeat: 13, rowSeat: 'E', stateSeat: 'available', price: 70 },
        { id: 118, numberSeat: 14, rowSeat: 'E', stateSeat: 'available', price: 70 },
        { id: 119, numberSeat: 15, rowSeat: 'E', stateSeat: 'taken', price: 70 },
        { id: 120, numberSeat: 16, rowSeat: 'E', stateSeat: 'available', price: 70 },
        { id: 121, numberSeat: 17, rowSeat: 'E', stateSeat: 'available', price: 70 },
        { id: 122, numberSeat: 18, rowSeat: 'E', stateSeat: 'available', price: 70 },
        { id: 123, numberSeat: 19, rowSeat: 'E', stateSeat: 'available', price: 70 },
        { id: 124, numberSeat: 20, rowSeat: 'E', stateSeat: 'available', price: 70 },
        { id: 125, numberSeat: 21, rowSeat: 'E', stateSeat: 'available', price: 70 },
        { id: 126, numberSeat: 22, rowSeat: 'E', stateSeat: 'available', price: 70 },
        { id: 127, numberSeat: 23, rowSeat: 'E', stateSeat: 'available', price: 70 },
        { id: 128, numberSeat: 24, rowSeat: 'E', stateSeat: 'available', price: 70 },
        { id: 129, numberSeat: 25, rowSeat: 'E', stateSeat: 'taken', price: 70 },
        { id: 130, numberSeat: 26, rowSeat: 'E', stateSeat: 'available', price: 70 },
        { id: 131, numberSeat: 1, rowSeat: 'F', stateSeat: 'available', price: 70 },
        { id: 132, numberSeat: 2, rowSeat: 'F', stateSeat: 'available', price: 70 },
        { id: 133, numberSeat: 3, rowSeat: 'F', stateSeat: 'available', price: 70 },
        { id: 134, numberSeat: 4, rowSeat: 'F', stateSeat: 'available', price: 70 },
        { id: 135, numberSeat: 5, rowSeat: 'F', stateSeat: 'available', price: 70 },
        { id: 136, numberSeat: 6, rowSeat: 'F', stateSeat: 'available', price: 70 },
        { id: 137, numberSeat: 7, rowSeat: 'F', stateSeat: 'available', price: 70 },
        { id: 138, numberSeat: 8, rowSeat: 'F', stateSeat: 'available', price: 70 },
        { id: 139, numberSeat: 9, rowSeat: 'F', stateSeat: 'taken', price: 70 },
        { id: 140, numberSeat: 10, rowSeat: 'F', stateSeat: 'available', price: 70 },
        { id: 141, numberSeat: 11, rowSeat: 'F', stateSeat: 'available', price: 70 },
        { id: 142, numberSeat: 12, rowSeat: 'F', stateSeat: 'available', price: 70 },
        { id: 143, numberSeat: 13, rowSeat: 'F', stateSeat: 'available', price: 70 },
        { id: 144, numberSeat: 14, rowSeat: 'F', stateSeat: 'available', price: 70 },
        { id: 145, numberSeat: 15, rowSeat: 'F', stateSeat: 'available', price: 70 },
        { id: 146, numberSeat: 16, rowSeat: 'F', stateSeat: 'taken', price: 70 },
        { id: 147, numberSeat: 17, rowSeat: 'F', stateSeat: 'available', price: 70 },
        { id: 148, numberSeat: 18, rowSeat: 'F', stateSeat: 'available', price: 70 },
        { id: 149, numberSeat: 19, rowSeat: 'F', stateSeat: 'available', price: 70 },
        { id: 150, numberSeat: 20, rowSeat: 'F', stateSeat: 'available', price: 70 },
        { id: 151, numberSeat: 21, rowSeat: 'F', stateSeat: 'available', price: 70 },
        { id: 152, numberSeat: 22, rowSeat: 'F', stateSeat: 'available', price: 70 },
        { id: 153, numberSeat: 23, rowSeat: 'F', stateSeat: 'available', price: 70 },
        { id: 154, numberSeat: 24, rowSeat: 'F', stateSeat: 'available', price: 70 },
        { id: 155, numberSeat: 25, rowSeat: 'F', stateSeat: 'available', price: 70 },
        { id: 156, numberSeat: 26, rowSeat: 'F', stateSeat: 'taken', price: 70 },
    ];

    // nho toi uu
    const SeatsSelected = useSelector((state) => state.formBookingTicket.seatsSelected);
    let listSeatsSelected = [];
    SeatsSelected.map((item) => {
        return listSeatsSelected.push(item.id);
    });

    // useEffect(() => {

    // }, [fakeDataSeat]);
    fakeDataSeat.map((item) => {
        if (!(listSeatsSelected.length === 0) && listSeatsSelected.includes(item.id)) {
            item.stateSeat = 'selected';
        }
        return 1;
    });
    //console.log('re-render');

    return (
        <>
            <div className={cx('screen-section')}>
                <div className={cx('screen')}></div>
                <p>SCREEN</p>
            </div>
            <div className={cx('seats-section')}>
                {listRowSeat.map((item) => (
                    <RowOfSeats
                        key={item}
                        rowSeat={item}
                        listSeats={fakeDataSeat.filter((it) => it.rowSeat === item)}
                    />
                ))}
                <div className={cx('seats-section-note')}>
                    <div className={cx('seats-section-note-item')}>
                        <Seat />
                        <p>Available</p>
                    </div>
                    <div className={cx('seats-section-note-item')}>
                        <Seat selected />
                        <p>Selected</p>
                    </div>
                    <div className={cx('seats-section-note-item')}>
                        <Seat taken />
                        <p>Taken</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SeatSection;
