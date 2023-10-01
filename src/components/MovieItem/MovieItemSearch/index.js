import classNames from 'classnames/bind';
import styles from './MovieItemSearch.module.scss';

const cx = classNames.bind(styles);
function MovieItem({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <img
                    className={cx('avatar-image')}
                    src={'http://localhost:8081/movie/images/' + data.verticalImage}
                    alt={data.title}
                />
            </div>
            <span className={cx('name')}>{data.title}</span>
        </div>
    );
}

export default MovieItem;
