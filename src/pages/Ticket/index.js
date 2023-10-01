import classNames from 'classnames/bind';
import styles from './Ticket.module.scss';
import NavStepper from '~/components/NavStepper';
const cx = classNames.bind(styles);
const NAV_TICKET_PAGE = ['Cart', 'Tickets'];
function Ticket() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav-stepper')}>
                <NavStepper items={NAV_TICKET_PAGE} />
            </div>
        </div>
    );
}

export default Ticket;
