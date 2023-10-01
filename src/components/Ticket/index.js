import classNames from 'classnames/bind';
import styles from './Ticket.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);
function Ticket({ seatInfo, dateInfo, useInfo, showTimesInfo }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left-side')}>
                <div className={cx('customer-info')}>
                    <div className={cx('row')}>Name: PITI</div>
                    <div className={cx('row')}>Email: pitithuong@gmail.com</div>
                </div>
                <div className={cx('barcode')}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/84/EAN13.svg" alt="barcode" />
                </div>
                <div className={cx('company-name')}>Moon Movie</div>
            </div>
            <div className={cx('right-side')}>
                <img className={cx('background-behind')} src={images.zongli} alt="background-bh" />
                <div className={cx('content')}>
                    <p className={cx('content-top')}>Types</p>
                    <div className={cx('content-bottom')}>
                        <h1>Movie name</h1>
                        <div className={cx('seat-info')}>
                            <div className={cx('seat-info-item')}>
                                <p>Row</p>
                                <p>{seatInfo.rowSeat}</p>
                            </div>
                            <div className={cx('seat-info-item')}>
                                <p>Seat</p>
                                <p>{seatInfo.numberSeat}</p>
                            </div>
                            <div className={cx('seat-info-item')}>
                                <p>Date</p>
                                <p>
                                    {dateInfo.date} {dateInfo.month}
                                </p>
                            </div>
                            <div className={cx('seat-info-item')}>
                                <p>Time</p>
                                <p>{showTimesInfo.startTime}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ticket;
