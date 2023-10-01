import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './TimeItem.module.scss';

const cx = classNames.bind(styles);

function TimeItem({
    day,
    date,
    month,
    onClick,
    indexColumn,
    active = false,
    smallText: small,
    active2,
    notAllowed,
    widthNormal,
    className,
}) {
    const classNames = cx('wrapper', { active, active2, notAllowed, widthNormal, [className]: className });
    return (
        <div className={classNames} onClick={onClick}>
            <span>
                <FontAwesomeIcon icon={faCircleNotch} />
            </span>
            <span className={cx('day')}>{day}</span>
            <span className={cx('date', { small })}>{date}</span>
            <span className={cx('month')}>{month}</span>
        </div>
    );
}

export default TimeItem;
