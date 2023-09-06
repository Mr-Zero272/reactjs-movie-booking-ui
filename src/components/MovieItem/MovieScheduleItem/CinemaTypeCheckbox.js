import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import classNames from 'classnames/bind';

import styles from './MovieScheduleItem.module.scss';

const cx = classNames.bind(styles);
function CinemaTypeCheckbox({ type, schedule, onCheck, active = false }) {
    return (
        <div className={cx('checkbox-wrapper')}>
            <div className={cx('type-name', { active })} onClick={onCheck}>
                <span>{type}</span>
                <FontAwesomeIcon icon={faCheck} />
            </div>
            <div className={cx('schedule-list')}>
                <Tippy content="Click to buy ticket">
                    <div className={cx('schedule-item', { hidden: !active })}>11h30 AM</div>
                </Tippy>
                <div className={cx('schedule-item', 'hidden', { hidden: !active })}></div>
                <div className={cx('schedule-item', 'hidden', { hidden: !active })}></div>
                <div className={cx('schedule-item', 'hidden', { hidden: !active })}></div>
                <div className={cx('schedule-item', 'hidden', { hidden: !active })}></div>
                <div className={cx('schedule-item', { hidden: !active })}>7h PM</div>
                <div className={cx('schedule-item', { hidden: !active })}>7h45 PM</div>
            </div>
        </div>
    );
}

export default CinemaTypeCheckbox;
