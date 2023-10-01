import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import classNames from 'classnames/bind';

import styles from './MovieScheduleItem.module.scss';

const cx = classNames.bind(styles);
const fakeSchedule = [
    {
        id: 30,
        type: '3D',
        screening_start: '2023-09-30T15:30:30',
    },
    {
        id: 31,
        type: '2D',
        screening_start: '2023-09-30T17:00:30',
    },
    {
        id: 35,
        type: '3D',
        screening_start: '2023-09-30T16:00:30',
    },
];

function CinemaTypeCheckbox({ type, schedule, onCheck, activeDate, active = false }) {
    const checkActiveDate = (d) => {
        return (
            d.getDate() === activeDate.date &&
            d.getMonth() + 1 === activeDate.month &&
            d.getFullYear() === activeDate.year
        );
    };

    const filterSchedule = schedule.filter((item) => {
        const itemDate = new Date(item.screening_start);
        return checkActiveDate(itemDate);
    });

    // console.log(schedule);
    // console.log(filterSchedule);

    return (
        <div className={cx('checkbox-wrapper')}>
            <div className={cx('type-name', { active })} onClick={onCheck}>
                <span>{type}</span>
                <FontAwesomeIcon icon={faCheck} />
            </div>
            <div className={cx('schedule-list')}>
                {filterSchedule.map((item) => {
                    if (item.type !== type) return null;
                    const tempDate = new Date(item.screening_start);
                    return (
                        <Tippy content="Click to buy ticket" key={item.id}>
                            <div className={cx('schedule-item', { hidden: !active })}>
                                {tempDate.getHours() +
                                    ':' +
                                    (tempDate.getMinutes() === 0 ? '00' : tempDate.getMinutes())}{' '}
                                {tempDate.getHours() < 11 ? 'AM' : 'PM'}
                            </div>
                        </Tippy>
                    );
                })}
                {!filterSchedule.some((item) => item.type === type) && (
                    <Tippy content="No showtimes">
                        <div className={cx('schedule-item', { hidden: !active })}>...</div>
                    </Tippy>
                )}
            </div>
        </div>
    );
}

export default CinemaTypeCheckbox;
