import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styels from './CinemaTypeCheckbox.module.scss';

const cx = classNames.bind(styels);
function CinemaTypeCheckbox({ type, schedule, onCheck, active = false }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('type-name', { active })} onClick={onCheck}>
                <span>{type}</span>
                <FontAwesomeIcon icon={faCheck} />
            </div>
            <div className={cx('schedule')}>
                <div className={cx('schedule-item', { hidden: !active })}>11h30 AM</div>
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
