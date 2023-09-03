import classNames from 'classnames/bind';
import styles from './CustomDots.module.scss';

const cx = classNames.bind(styles);
function CustomDots({ imgUrl, active }) {
    return (
        <div className={cx('wrapper')}>
            <img src={imgUrl} alt="image dots" className={cx({ active })} />
        </div>
    );
}

export default CustomDots;
