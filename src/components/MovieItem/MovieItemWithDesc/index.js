import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import styles from './MovieItemWithDesc.module.scss';
import baseUrl from '~/config/baseUrl';

const cx = classNames.bind(styles);
const defaultData = { genres: [{ id: '', name: '' }] };
function MovieItemWithDesc({ data = defaultData, arrows = false, onNext, onPrev }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('movie-img')}>
                <img src={baseUrl.image + data.verticalImage} alt={data.title} />
                <Link to={'/detail/' + data.id} className={cx('play-btn')}>
                    <FontAwesomeIcon className={cx('play-btn-icon')} icon={faPlayCircle} />
                </Link>
            </div>
            <div className={cx('movie-desc')}>
                <div className={cx('desc-item')}>
                    <p>
                        <strong>Director</strong>
                    </p>
                    <p>{data.director}</p>
                </div>
                <div className={cx('desc-item')}>
                    <p>
                        <strong>Starring</strong>
                    </p>
                    <p>{data.cast}</p>
                </div>
                <div className={cx('desc-item')}>
                    <p>
                        <strong>Genre</strong>
                    </p>
                    <p>{data.genres && data.genres.map((item) => item.name + ', ')}...</p>
                </div>
            </div>
            {arrows && (
                <div className={cx('arrow', 'right')} onClick={() => onNext()}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
            )}
            {arrows && (
                <div className={cx('arrow', 'left')} onClick={() => onPrev()}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
            )}
        </div>
    );
}

export default MovieItemWithDesc;
