import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { formBookingTicketActions } from '~/store/form-boking-ticket-slice';
import classNames from 'classnames/bind';
import styles from './Step1.module.scss';
import TimeItem from '~/components/TimeItem';
import { addToCartActions } from '~/store/add-to-cart-slice';

const cx = classNames.bind(styles);

// call api va lay data nay
// nho lay ngay hien tai

const listAuditoriums = [
    { id: 1, name: 'CGV' },
    { id: 2, name: 'Lotte' },
    { id: 3, name: 'Blue Sky' },
    { id: 4, name: 'Stars' },
];
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
        showTimes: [],
    },
];

function getFullWeek(today) {
    //const today = new Date('2023/9/30'); // dayofweek = 3
    const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay(); // The day of the week as an integer, 0 for Sunday, 1 for Monday, etc.
    //console.log(today.toLocaleDateString());
    // const temp = new Date('2023/9/10');
    // console.log(temp.toLocaleDateString('en-us', { weekday: 'short' }));
    //cn la 0 th7 la 6 :v
    const daysOfWeek = [];
    for (let i = 0; i < dayOfWeek - 1; i++) {
        const numberOfDatesToSubtract = dayOfWeek - 1 - i;
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - numberOfDatesToSubtract);
        daysOfWeek.push({
            date: date,
        });
    }

    daysOfWeek.push({
        date: today,
    });

    for (let j = 0; j < 7 - dayOfWeek; j++) {
        const numberOfDatesToPlus = j + 1;
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + numberOfDatesToPlus);
        daysOfWeek.push({
            date: date,
        });
    }
    return daysOfWeek;
}

function ShowTime() {
    const dispatch = useDispatch();
    const addToCartInfo = useSelector((state) => state.addToCart);
    const activeShowTimes = addToCartInfo.activeShowtime;
    const activeDate = new Date(addToCartInfo.activeDate);

    const [dataDate, setDataDate] = useState(() => {
        const today = new Date();
        return getFullWeek(today);
    });

    const handleNextWeek = () => {
        const firstDateOfNextWeek = new Date(
            dataDate[6].date.getFullYear(),
            dataDate[6].date.getMonth(),
            dataDate[6].date.getDate() + 1,
        );
        setDataDate(getFullWeek(firstDateOfNextWeek));
    };

    const handlePreWeek = () => {
        const lastDateOfPrevWeek = new Date(
            dataDate[0].date.getFullYear(),
            dataDate[0].date.getMonth(),
            dataDate[0].date.getDate() - 1,
        );
        setDataDate(getFullWeek(lastDateOfPrevWeek));
    };

    const checkActiveDate = (d) => {
        return (
            d.date.getDate() === activeDate.getDate() &&
            d.date.getMonth() === activeDate.getMonth() &&
            d.date.getFullYear() === activeDate.getFullYear()
        );
    };

    const formatActiveDate = (d) => {
        return {
            day: d.toLocaleDateString('en-US', { weekday: 'short' }),
            date: d.getDate(),
            month: d.toLocaleDateString('en-US', { month: 'short' }),
            year: d.getFullYear(),
            fullNameDay: d.toLocaleDateString('en-US', { weekday: 'long' }),
        };
    };

    const listItems = dataDate.map((item, index) => {
        const strDate =
            item.date.getFullYear() +
            '-' +
            (item.date.getMonth() + 1) +
            '-' +
            (item.date.getDate() < 10 ? '0' + item.date.getDate() : item.date.getDate());
        return (
            <TimeItem
                key={index}
                smallText
                active2={checkActiveDate(item)}
                onClick={() => dispatch(addToCartActions.setActionDate(strDate))}
                date={item.date.getDate()}
                day={item.date.toLocaleDateString('en-us', { weekday: 'short' })}
                //month={item.date.toLocaleDateString('en-us', { month: 'short' })}
            />
        );
    });

    // filter showtime before
    const checkActiveDate2 = (d) => {
        return (
            d.getDate() === activeDate.getDate() &&
            d.getMonth() === activeDate.getMonth() &&
            d.getFullYear() === activeDate.getFullYear()
        );
    };

    const filterSchedule = (schedule) => {
        let filterSchedule = [];
        if (schedule !== undefined) {
            filterSchedule = schedule.filter((item) => {
                const itemDate = new Date(item.screening_start);
                return checkActiveDate2(itemDate);
            });
        }
        return filterSchedule;
    };

    const showTimes = filterSchedule(addToCartInfo.screenings);

    return (
        <div className={cx('showtime-wrapper')}>
            <div className={cx('showtime-left')}>
                <div className={cx('showtime-heading')}>
                    <p className={cx('full-day')}>
                        {activeDate.toLocaleDateString('en-us', { weekday: 'long' })}, {activeDate.getDate()}{' '}
                        {activeDate.toLocaleDateString('en-us', { month: 'long' })}
                    </p>
                    <div className={cx('date-control-btn')}>
                        <button>
                            <FontAwesomeIcon icon={faChevronLeft} onClick={handlePreWeek} />
                        </button>
                        <button>
                            <FontAwesomeIcon icon={faChevronRight} onClick={handleNextWeek} />
                        </button>
                    </div>
                </div>
                <div className={cx('showtime-body')}>{listItems}</div>
            </div>
            <div className={cx('showtime-right')}>
                <div className={cx('showtime-heading')}>
                    <p>ShowTime</p>
                    <div
                        className={cx(
                            'date-control-btn',
                            'product_sorting_container',
                            'product_sorting_container_bottom',
                        )}
                    >
                        <ul className={cx('product_sorting')}>
                            <li>
                                <span>
                                    Auditorium:{' '}
                                    {addToCartInfo.activeAuditorium !== 0 &&
                                        listAuditoriums.find((item) => item.id === addToCartInfo.activeAuditorium).name}
                                </span>
                                <FontAwesomeIcon icon={faAngleDown} className={cx('i')} />
                                <ul className={cx('sorting_num')}>
                                    {listAuditoriums.map((auditorium, index) => (
                                        <li
                                            key={index}
                                            className={cx('num_sorting_btn')}
                                            onClick={() => dispatch(addToCartActions.chooseAuditorium(auditorium.id))}
                                        >
                                            <span>{auditorium.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={cx('showtime-body')}>
                    {showTimes?.length > 0 ? (
                        showTimes.map((item) => {
                            const d = new Date(item.screening_start);
                            return (
                                <TimeItem
                                    key={item.id}
                                    day={item.type.slice(0, 4)}
                                    date={
                                        d.getHours() +
                                        ':' +
                                        (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes())
                                    }
                                    smallText
                                    active2={item.id === activeShowTimes}
                                    onClick={() => dispatch(addToCartActions.setActiveShowtime(item.id))}
                                />
                            );
                        })
                    ) : (
                        <TimeItem day={'No'} date={'Showtime'} notAllowed smallText />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ShowTime;
