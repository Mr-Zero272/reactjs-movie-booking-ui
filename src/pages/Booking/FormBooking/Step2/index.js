import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import TimeItem from '~/components/TimeItem';

import FormInputText2 from '~/components/Form/FormInput/FormInputText2';
import styles from './Step2.module.scss';
import SeatChosen from './SeatChosen';
import TitleHeadingPage from '~/components/TitleHeadingPage';
import { useMemo, useState } from 'react';

const cx = classNames.bind(styles);
function Step2({ onNextStep }) {
    const formBookingInfo = useSelector((state) => state.formBookingTicket);
    const [userInfo, setUserInfo] = useState({ name: 'PITI', email: 'pitithuong@gmail.com' });

    const handleChangeInput = (e) => {
        setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    console.log(userInfo);

    const totalPayment = useMemo(() => {
        return formBookingInfo.seatsSelected.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
    }, [formBookingInfo.seatsSelected]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('list-seats')}>
                <div className={cx('list-seats-item')}>
                    {formBookingInfo.seatsSelected.map((item) => (
                        <SeatChosen key={item.id} seatInfo={item} />
                    ))}
                </div>
                <div className={cx('total-price')}>Total: &#8363;{totalPayment}k</div>
            </div>
            <div className={cx('user-info')}>
                <TitleHeadingPage title={'User detail'} />
                <div className={cx('user-info-body')}>
                    <div className={cx('payment')}>
                        <img
                            src="https://i.pinimg.com/originals/87/d7/d7/87d7d73813ef1242c25ddeae57cfe6ba.png"
                            alt="qr"
                        />
                        <p>Scan here to pay</p>
                    </div>
                    <div className={cx('info')}>
                        <FormInputText2
                            label={'Costumer: '}
                            name={'name'}
                            value={userInfo.name}
                            onChange={handleChangeInput}
                        />
                        <FormInputText2
                            label={'Your email: '}
                            name={'email'}
                            value={userInfo.email}
                            onChange={handleChangeInput}
                        />
                    </div>
                </div>
            </div>
            <div className={cx('showtime-info')}>
                <div className={cx('date', 'showtime-info-item')}>
                    <p>Date</p>
                    <TimeItem
                        date={formBookingInfo.activeDate.date}
                        month={formBookingInfo.activeDate.month}
                        className={cx('custom-time-item')}
                    />
                </div>
                <div className={cx('time', 'showtime-info-item')}>
                    <p>Time</p>
                    <p>{formBookingInfo.activeShowTimes.startTime}</p>
                </div>
                <div className={cx('date', 'showtime-info-item')}>
                    <p>Types</p>
                    <p>{formBookingInfo.activeShowTimes.auditorium}</p>
                </div>
            </div>
            <button className={cx('control-btn-nextStep')} onClick={() => onNextStep(3)}>
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </div>
    );
}

export default Step2;
