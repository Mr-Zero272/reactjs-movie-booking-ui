import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import ShowTime from './ShowTime';
import styles from './Step1.module.scss';
import SeatSection from './SeatSection';

const cx = classNames.bind(styles);
function Step1({ onNextStep }) {
    const formBookingTicketInfo = useSelector((state) => state.formBookingTicket);
    console.log(formBookingTicketInfo);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-top')}>
                <div className={cx('movie-info')}>
                    <div className={cx('movie-name')}>Ghost in the Shell</div>
                    <div className={cx('time-desc')}>
                        <FontAwesomeIcon icon={faClock} /> 103 minutes
                        <Button className={cx('cinema-name')} outline>
                            MM-01
                        </Button>
                    </div>
                </div>
                <div className={cx('movie-time')}>
                    <ShowTime />
                </div>
            </div>
            <div className={cx('form-bottom')}>
                <SeatSection />
                <button className={cx('control-btn-nextStep')} onClick={() => onNextStep(2)}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </div>
    );
}

export default Step1;
