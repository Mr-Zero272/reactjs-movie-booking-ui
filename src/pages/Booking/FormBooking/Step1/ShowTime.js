import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { formBookingTicketActions } from '~/store/form-boking-ticket-slice';
import classNames from 'classnames/bind';
import styles from './Step1.module.scss';
import TimeItem from '~/components/TimeItem';

const cx = classNames.bind(styles);

// call api va lay data nay
// nho lay ngay hien tai
const timeDataTest = [
    {
        dateInformation: { day: 'Mon', date: 11, month: 'Sep', year: 2023, fullNameDay: 'Monday' },
        showTimes: [],
    },
    {
        dateInformation: { day: 'Tue', date: 12, month: 'Sep', year: 2023, fullNameDay: 'Tuesday' },
        showTimes: [
            { startTime: '9:00', auditorium: '3D' },
            { startTime: '10:00', auditorium: '2D' },
        ],
    },
    {
        dateInformation: { day: 'Wed', date: 13, month: 'Sep', year: 2023, fullNameDay: 'Wednesday' },
        showTimes: [
            { startTime: '11:00', auditorium: '3D' },
            { startTime: '11:30', auditorium: '2D' },
        ],
    },
    {
        dateInformation: { day: 'Thu', date: 14, month: 'Sep', year: 2023, fullNameDay: 'Thursday' },
        showTimes: [
            { startTime: '7:00', auditorium: '3D' },
            { startTime: '5:00', auditorium: '2D' },
        ],
    },
    {
        dateInformation: { day: 'Fri', date: 15, month: 'Sep', year: 2023, fullNameDay: 'Friday' },
        showTimes: [
            { startTime: '7:00', auditorium: '3D' },
            { startTime: '9:00', auditorium: '2D' },
        ],
    },
    {
        dateInformation: { day: 'Sat', date: 16, month: 'Sep', year: 2023, fullNameDay: 'Saturday' },
        showTimes: [
            { startTime: '4:00', auditorium: '3D' },
            { startTime: '3:00', auditorium: '2D' },
        ],
    },
    {
        dateInformation: { day: 'Sun', date: 17, month: 'Sep', year: 2023, fullNameDay: 'Sunday' },
        showTimes: [
            { startTime: '20:00', auditorium: '2D' },
            { startTime: '21:00', auditorium: '3D' },
        ],
    },
];

function ShowTime() {
    const dispatch = useDispatch();
    const activeDate = useSelector((state) => state.formBookingTicket.activeDate);
    const activeShowTimes = useSelector((state) => state.formBookingTicket.activeShowTimes);
    const showTimes = useSelector((state) => state.formBookingTicket.showTimes);

    // get current date
    //const today = new Date();
    // call api lấy date sau h tạm tạo data đã
    // lấy hôm nay và call api tuần chứa ngày hôm nay,
    // lấy cả tuần trước và tuần sau luôn

    // fix truoc vai truong hop
    // truong hop vd ngay thu 3 meo co suat chiu phim nao thi set startTime va auditorium = null
    // dell nay la cua back-end duma nhung cu note o day da

    // handle click schedule

    return (
        <div className={cx('showtime-wrapper')}>
            <div className={cx('showtime-left')}>
                <div className={cx('showtime-heading')}>
                    <p className={cx('full-day')}>
                        {activeDate.fullNameDay}, {activeDate.date} {activeDate.month}
                    </p>
                    <div className={cx('date-control-btn')}>
                        <button>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
                <div className={cx('showtime-body')}>
                    {timeDataTest.map((item, index) => (
                        <TimeItem
                            key={index}
                            day={item.dateInformation.day}
                            date={item.dateInformation.date}
                            smallText
                            active2={item.dateInformation.date === activeDate.date}
                            onClick={() => dispatch(formBookingTicketActions.chooseDate(item))}
                        />
                    ))}
                </div>
            </div>
            <div className={cx('showtime-right')}>
                <div className={cx('showtime-heading')}>ShowTime</div>
                <div className={cx('showtime-body')}>
                    {showTimes?.length > 0 ? (
                        showTimes.map((item, index) => (
                            <TimeItem
                                key={index}
                                day={item.auditorium}
                                date={item.startTime}
                                smallText
                                active2={
                                    item.startTime === activeShowTimes.startTime &&
                                    item.auditorium === activeShowTimes.auditorium
                                }
                                onClick={() => dispatch(formBookingTicketActions.chooseShowtime(item))}
                            />
                        ))
                    ) : (
                        <TimeItem day={'No'} date={'Showtime'} notAllowed smallText />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ShowTime;
