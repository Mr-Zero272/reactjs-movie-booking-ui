import { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faCashRegister } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';

import styles from './MovieScheduleItem.module.scss';
import ListTimeItem from '~/components/ListTimeItem';
import CinemaTypeCheckbox from './CinemaTypeCheckbox';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartActions } from '~/store/add-to-cart-slice';

const cx = classNames.bind(styles);

const notify = (message, type = 'success') => {
    toast(message, {
        type: type,
        style: { fontSize: '1.4rem' },
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        className: 'foo-bar',
    });
};

function MovieScheduleItem({ data, types = [] }) {
    const [activeDate, setActiveDate] = useState(() => {
        const today = new Date();
        return { date: today.getDate(), month: today.getMonth() + 1, year: today.getFullYear() };
    });
    const dispatch = useDispatch();
    const checkoutInfo = useSelector((state) => state.addToCart);
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

    const checkActiveDate = (d) => {
        return (
            d.getDate() === activeDate.date &&
            d.getMonth() + 1 === activeDate.month &&
            d.getFullYear() === activeDate.year
        );
    };

    let filterSchedule = [];

    if (data.screenings !== undefined) {
        filterSchedule = data.screenings.filter((item) => {
            const itemDate = new Date(item.screening_start);
            return checkActiveDate(itemDate);
        });
    }

    const handleBookingNow = () => {
        const temp = {
            ...checkoutInfo,
            activeMovie: data !== undefined ? data.id : '',
            listScreeningsAreActive: [],
            activeDate: data !== undefined ? filterSchedule[0].screening_start : '',
            listSeatSelected: [],
            activeShowtime: data !== undefined ? filterSchedule[0].id : '',
        };
        dispatch(addToCartActions.checkout(temp));
    };

    const handleNoSchedule = (e) => {
        e.preventDefault();
        notify('There is no schedule for today!', 'warning');
    };

    //console.log(data);
    //console.log(filterSchedule);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}>
                <div className={cx('main-content')}>
                    <Link to={'/detail/' + data.id} className={cx('img')}>
                        <img src={'http://localhost:8081/movie/images/' + data.verticalImage} alt={data.title} />
                        {/* <CustomImage src={data.verticalImage} alt={data.title} /> */}
                    </Link>
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
                                schedule={filterSchedule}
                                cId={data.id}
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
                {filterSchedule?.length === 0 ? (
                    <>
                        <Link to="/booking?tab=1" className={cx('booking-btn')} onClick={(e) => handleNoSchedule(e)}>
                            <FontAwesomeIcon icon={faCashRegister} />
                            <span>Booking now</span>
                        </Link>

                        <Link to={'/cart?tab=1'} className={cx('booking-btn')} onClick={(e) => handleNoSchedule(e)}>
                            <FontAwesomeIcon icon={faCartPlus} />
                            <span>Add to cart</span>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/booking?tab=1" className={cx('booking-btn')} onClick={handleBookingNow}>
                            <FontAwesomeIcon icon={faCashRegister} />
                            <span>Booking now</span>
                        </Link>

                        <Link
                            to={'/cart?tab=1'}
                            className={cx('booking-btn')}
                            onClick={() =>
                                dispatch(
                                    addToCartActions.addToCart({
                                        activeMovie: data !== undefined ? data.id : '',
                                        activeShowtime: data !== undefined ? filterSchedule[0].id : '',
                                        activeDate: data !== undefined ? filterSchedule[0].screening_start : '',
                                        screening:
                                            data !== undefined
                                                ? {
                                                      seatId: 0,
                                                      screeningId: filterSchedule[0].id,
                                                      auditoriumId: filterSchedule[0].auditorium.id,
                                                      movieId: data.id,
                                                      activeDate: filterSchedule[0].screening_start,
                                                  }
                                                : '',
                                    }),
                                )
                            }
                        >
                            <FontAwesomeIcon icon={faCartPlus} />
                            <span>Add to cart</span>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default MovieScheduleItem;
