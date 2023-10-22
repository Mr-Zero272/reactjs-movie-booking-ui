import classNames from 'classnames/bind';
import styles from './MovieItemSearch.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function MovieItem({ data, onClick }) {
    return (
        <Link to={'/detail/' + data.id} className={cx('wrapper')} onClick={() => onClick()}>
            <div className={cx('avatar')}>
                <img
                    className={cx('avatar-image')}
                    src={'http://localhost:8081/movie/images/' + data.verticalImage}
                    alt={data.title}
                />
            </div>
            <span className={cx('name')}>{data.title}</span>
        </Link>
    );
}

export default MovieItem;
