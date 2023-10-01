import classNames from 'classnames/bind';
import styles from './MovieItemWithDesc.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function MovieItemWithDesc() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('movie-img')}>
                <img src="https://file770.com/wp-content/uploads/3-body-poster.jpg" alt="film-name" />
                <Link to={'/detail'} className={cx('play-btn')}>
                    <FontAwesomeIcon className={cx('play-btn-icon')} icon={faPlayCircle} />
                </Link>
            </div>
            <div className={cx('movie-desc')}>
                <div className={cx('desc-item')}>
                    <p>
                        <strong>Director</strong>
                    </p>
                    <p>Rupert Sanders</p>
                </div>
                <div className={cx('desc-item')}>
                    <p>
                        <strong>Starring</strong>
                    </p>
                    <p>Scarlett Johansson, Pilou Asbeak, Takeshi Kitano</p>
                </div>
                <div className={cx('desc-item')}>
                    <p>
                        <strong>Genre</strong>
                    </p>
                    <p>Action, Crime, Sci-Fi</p>
                </div>
            </div>
        </div>
    );
}

export default MovieItemWithDesc;
