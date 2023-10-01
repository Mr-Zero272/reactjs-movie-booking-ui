import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import styles from './Step3.module.scss';
import Ticket from '~/components/Ticket';
import FormInputText2 from '~/components/Form/FormInput/FormInputText2';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Step3() {
    const formBookingInfo = useSelector((state) => state.formBookingTicket);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('list-tickets')}>
                {formBookingInfo.seatsSelected.map((item) => (
                    <Ticket
                        key={item.id}
                        seatInfo={item}
                        dateInfo={formBookingInfo.activeDate}
                        showTimesInfo={formBookingInfo.activeShowTimes}
                    />
                ))}
            </div>
            <div className={cx('left-side')}>
                <div className={cx('send-email')}>
                    <p>Send tickets to your email?</p>
                    <FormInputText2 label={'Your email:'} name={'email'} onChange={() => {}} />
                    <Button primary>SEND</Button>
                </div>
                <div className={cx('last-check')}>
                    <h1>Last step</h1>
                    <p>
                        This is the final step. Please check the information again. If there are any errors, please go
                        back to the previous step and edit. If there are no errors, press the finish button here to
                        complete the booking.
                    </p>
                    <Button primary>Finish</Button>
                </div>
            </div>
        </div>
    );
}

export default Step3;
