import classNames from 'classnames/bind';
import styles from './Ticket.module.scss';

const cx = classNames.bind(styles);
function Ticket({
    rowSeat = 'A',
    numberSeat = 23,
    date = 12,
    month = 10,
    type,
    movieName,
    imgUrl,
    userInfo = { username: '', email: '' },
    startTime = '9:00 AM',
}) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left-side')}>
                <div className={cx('customer-info')}>
                    <div className={cx('row')}>Name: {userInfo.username}</div>
                    <div className={cx('row')}>Email: {userInfo.email}</div>
                </div>
                <div className={cx('barcode')}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/84/EAN13.svg" alt="barcode" />
                </div>
                <div className={cx('company-name')}>Moon Movie</div>
            </div>
            <div className={cx('right-side')}>
                <img className={cx('background-behind')} src={imgUrl} alt="background-bh" />
                <div className={cx('content')}>
                    <p className={cx('content-top')}>Type: {type}</p>
                    <div className={cx('content-bottom')}>
                        <h1>{movieName}</h1>
                        <div className={cx('seat-info')}>
                            <div className={cx('seat-info-item')}>
                                <p>Row</p>
                                <p>{rowSeat}</p>
                            </div>
                            <div className={cx('seat-info-item')}>
                                <p>Seat</p>
                                <p>{numberSeat}</p>
                            </div>
                            <div className={cx('seat-info-item')}>
                                <p>Date</p>
                                <p>
                                    {date} {month}
                                </p>
                            </div>
                            <div className={cx('seat-info-item')}>
                                <p>Time</p>
                                <p>{startTime}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ticket;
