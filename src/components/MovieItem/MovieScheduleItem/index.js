import classNames from 'classnames/bind';

import styles from './MovieScheduleItem.module.scss';
import ListTimeItem from '~/components/ListTimeItem';
import CinemaTypeCheckbox from './CinemaTypeCheckbox';
import { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faCartPlus, faCashRegister } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function MovieScheduleItem({ data, types = [] }) {
    const [activeDate, setActiveDate] = useState(() => {
        const today = new Date();
        return { date: today.getDate(), month: today.getMonth() + 1, year: today.getFullYear() };
    });
    // Quan trong thang nao xoa t xieng chet cu ak
    // const today = new Date();
    // console.log(today);
    // console.log(Date.parse('Fri Sep 15 2023 10:01:13 GMT+0700'));
    // const nDate = new Date('2007-12-03T20:15:30');
    // console.log('hours: ', nDate.getHours());
    const handleChooseDate = useCallback((date, month, year) => {
        setActiveDate({
            date: date,
            month: month,
            year: year,
        });
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}>
                <div className={cx('main-content')}>
                    <div className={cx('img')}>
                        <img src={'http://localhost:8081/movie/images/' + data.verticalImage} alt={data.title} />
                    </div>
                    <div className={cx('main-content-left')}>
                        <div className={cx('movie-info')}>
                            <div>
                                <h3>{data.title}</h3>
                                <div className={cx('sub-info')}>
                                    <span>{data.duration_min + 'min'}</span>
                                    <span>{data.director}</span>
                                </div>
                            </div>
                            <div className={cx('movie-id')}>EFD983</div>
                        </div>
                        <div className={cx('schedule')}>
                            <ListTimeItem activeDate={activeDate} onChooseDate={handleChooseDate} />
                        </div>
                    </div>
                </div>
                <div className={cx('bottom-content')}>
                    <div className={cx('cinema-interest')}>
                        {types.map((item, index) => (
                            <CinemaTypeCheckbox
                                schedule={data.screenings}
                                activeDate={activeDate}
                                active
                                key={index}
                                type={item}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className={cx('side-content', 'right')}>
                <div className={cx('attention')}></div>
                <button className={cx('booking-btn')}>
                    <FontAwesomeIcon icon={faCashRegister} />
                    <span>Booking now</span>
                </button>
                <button className={cx('booking-btn')}>
                    <FontAwesomeIcon icon={faCartPlus} />
                    <span>Add to cart</span>
                </button>
            </div>
        </div>
    );
}

export default MovieScheduleItem;
