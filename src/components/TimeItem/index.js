import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './TimeItem.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function TimeItem({ day, date, month, onClick, indexColumn, active = false }) {
    return (
        <div className={cx('wrapper', { active })} onClick={onClick}>
            <span>
                <FontAwesomeIcon icon={faCircleNotch} />
            </span>
            <span className={cx('day')}>{day}</span>
            <span className={cx('date')}>{date}</span>
            <span className={cx('month')}>{month}</span>
        </div>
    );
}

export default TimeItem;
