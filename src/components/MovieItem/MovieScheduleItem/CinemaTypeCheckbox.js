import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import classNames from 'classnames/bind';

import styles from './MovieScheduleItem.module.scss';
import { useDispatch } from 'react-redux';
import { addToCartActions } from '~/store/add-to-cart-slice';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
// const fakeSchedule = [
//     {
//         id: 30,
//         type: '3D',
//         screening_start: '2023-09-30T15:30:30',
//     },
//     {
//         id: 31,
//         type: '2D',
//         screening_start: '2023-09-30T17:00:30',
//     },
//     {
//         id: 35,
//         type: '3D',
//         screening_start: '2023-09-30T16:00:30',
//     },
// ];

function CinemaTypeCheckbox({ type, schedule, onCheck, activeDate, active = false, cId = 1 }) {
    const dispatch = useDispatch();

    //console.log(schedule);
    //console.log(filterSchedule);

    return (
        <div className={cx('checkbox-wrapper')}>
            <div className={cx('type-name', { active })} onClick={onCheck}>
                <span>{type}</span>
                <FontAwesomeIcon icon={faCheck} />
            </div>
            <div className={cx('schedule-list')}>
                {schedule.map((item) => {
                    if (item.type !== type) return null;
                    const tempDate = new Date(item.screening_start);
                    return (
                        <Tippy content="Click to buy ticket" key={item.id}>
                            <Link
                                to={'/booking?tab=1'}
                                className={cx('schedule-item', { hidden: !active })}
                                onClick={() => {
                                    dispatch(addToCartActions.refreshState());
                                    dispatch(
                                        addToCartActions.addToCart({
                                            activeMovie: cId,
                                            activeShowtime: item.id,
                                            activeDate: item.screening_start,
                                            screening: {
                                                seatId: 0,
                                                screeningId: item.id,
                                                auditoriumId: item.auditorium.id,
                                                movieId: cId,
                                                activeDate: item.screening_start,
                                            },
                                        }),
                                    );
                                }}
                            >
                                {tempDate.getHours() +
                                    ':' +
                                    (tempDate.getMinutes() === 0 ? '00' : tempDate.getMinutes())}{' '}
                                {tempDate.getHours() < 11 ? 'AM' : 'PM'}
                            </Link>
                        </Tippy>
                    );
                })}
                {!schedule.some((item) => item.type === type) && (
                    <Tippy content="No showtimes">
                        <div className={cx('schedule-item', { hidden: !active })}>...</div>
                    </Tippy>
                )}
            </div>
        </div>
    );
}

export default CinemaTypeCheckbox;
