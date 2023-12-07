import classNames from 'classnames/bind';
import styles from './MovieServiceItem.module.scss';

const cx = classNames.bind(styles);
function MovieServiceItem({ icon, title, desc }) {
    return (
        <div className={cx('box')}>
            <div className={cx('boxContent')}>
                <div className={cx('icon')}>{icon}</div>
                <h1 className={cx('title')}>{title}</h1>
                <p className={cx('desc')}>{desc}</p>
            </div>
        </div>
    );
}

export default MovieServiceItem;
