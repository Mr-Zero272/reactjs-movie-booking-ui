import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faStar } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './MovieScheduleItem.module.scss';
import TimeItem from '~/components/TimeItem';
import CinemaTypeCheckbox from '~/components/Form/FormInput/CinemaTypeCheckbox';
import { useCallback, useEffect, useState } from 'react';

let scheduleMain = [
    { id: 22108, day: 'Monday', date: '21', month: 'Aug' },
    { id: 32208, day: 'Tuesday', date: '22', month: 'Aug' },
    { id: 42308, day: 'Wednesday', date: '23', month: 'Aug' },
    { id: 52408, day: 'Thursday', date: '24', month: 'Aug' },
    { id: 62508, day: 'Friday', date: '25', month: 'Aug' },
    { id: 72608, day: 'Saturday', date: '26', month: 'Aug' },
    { id: 82708, day: 'Sunday', date: '27', month: 'Aug' },
];

const scheduleNext = [
    { id: 22808, day: 'Monday', date: '28', month: 'Aug' },
    { id: 32908, day: 'Tuesday', date: '29', month: 'Aug' },
    { id: 43008, day: 'Wednesday', date: '30', month: 'Aug' },
    { id: 53108, day: 'Thursday', date: '31', month: 'Aug' },
    { id: 60108, day: 'Friday', date: '1', month: 'Aug' },
    { id: 70208, day: 'Saturday', date: '2', month: 'Aug' },
    { id: 80308, day: 'Sunday', date: '3', month: 'Aug' },
];

const schedulePrev = [
    { id: 21408, day: 'Monday', date: '14', month: 'Aug' },
    { id: 31508, day: 'Tuesday', date: '15', month: 'Aug' },
    { id: 41608, day: 'Wednesday', date: '16', month: 'Aug' },
    { id: 51708, day: 'Thursday', date: '17', month: 'Aug' },
    { id: 61808, day: 'Friday', date: '18', month: 'Aug' },
    { id: 71908, day: 'Saturday', date: '19', month: 'Aug' },
    { id: 82008, day: 'Sunday', date: '20', month: 'Aug' },
];

const types = [
    {
        type: '3D',
        showTimes: [],
    },
    {
        type: '2D',
        showTimes: [],
    },
    {
        type: '4D',
        showTimes: [],
    },
];

const dataNeeded = {
    schedules: [],
    listType: [], // include obj {typeName, showTimes: [11h, ...]}
    activeDay: 241243, //id
    activeType: [], //string
};

const cx = classNames.bind(styles);

function MovieScheduleItem({ data }) {
    const initialState = {
        schedules: scheduleMain,
        idDay: 52408,
        types: [],
    };
    const [movieSchedule, setMovieSchedule] = useState(initialState);

    // check if an item exist in this obj
    const checkIncludes = useCallback((obj, item) => {
        return obj.includes(item);
    }, []);

    const handleCheckDay = (dayId) => {
        setMovieSchedule((prev) => ({ ...prev, idDay: dayId }));
    };

    const handleCheckboxType = (newType) => {
        setMovieSchedule((prev) => {
            if (checkIncludes(prev.types, newType)) {
                return { ...prev, types: prev.types.filter((item) => item !== newType) };
            } else {
                return { ...prev, types: [...prev.types, newType] };
            }
        });
    };

    // next btn
    const handleNextWeekBtn = () => {
        setMovieSchedule((prev) => ({ ...prev, schedules: scheduleNext }));
    };

    // prev btn
    const handlePrevWeekBtn = () => {
        setMovieSchedule((prev) => ({ ...prev, schedules: schedulePrev }));
    };

    console.log(movieSchedule);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('main-content')}>
                <div className={cx('img')}>
                    <img
                        src="https://i.pinimg.com/originals/e3/42/75/e34275b3bfe1ca528b7aa79232f215a7.jpg"
                        alt="error img"
                    />
                </div>
                <div className={cx('main-content-left')}>
                    <div className={cx('movie-info')}>
                        <div>
                            <h3>NO WAY UP </h3>
                            <div className={cx('sub-info')}>
                                <span>1h 25min</span>
                                <span>Kawasaki Chihiro</span>
                            </div>
                        </div>
                        <div className={cx('movie-id')}>EFD983</div>
                    </div>
                    <div className={cx('schedule')}>
                        {movieSchedule.schedules.map((item) => (
                            <TimeItem
                                key={item.id}
                                active={item.id === movieSchedule.idDay}
                                onClick={() => handleCheckDay(item.id)}
                                date={item.date}
                                day={item.day}
                                month={item.month}
                            />
                        ))}
                    </div>
                    <div className={cx('control-btn')}>
                        <button onClick={handlePrevWeekBtn}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <button onClick={handleNextWeekBtn}>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </div>
                </div>
            </div>
            <div className={cx('bottom-content')}>
                <div className={cx('cinema-interest')}>
                    {types.map((item, index) => (
                        <CinemaTypeCheckbox
                            onCheck={() => handleCheckboxType(item.type)}
                            //active={checkIncludes(movieSchedule.types, item.type)}
                            active
                            key={index}
                            type={item.type}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MovieScheduleItem;
