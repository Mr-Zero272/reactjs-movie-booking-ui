import classNames from 'classnames/bind';
import styles from './MovieItem.module.scss';

const cx = classNames.bind(styles);
function MovieItem() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <img
                    className={cx('avatar-image')}
                    src="https://get.wallhere.com/photo/windows-11-dark-minimalism-black-background-2233678.jpg"
                    alt="name"
                />
            </div>
            <span className={cx('name')}>Cấu trúc dữ liệu và giải thuật</span>
        </div>
    );
}

export default MovieItem;
