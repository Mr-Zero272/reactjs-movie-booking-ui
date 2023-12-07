import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styles from './MovieItemCommon.module.scss';
import Button from '~/components/Button';
import { useState } from 'react';

const cx = classNames.bind(styles);

function MovieItemCommon({ imgURL, movieName, genres, runTime, rating = 5, video, horizontal, detail, className }) {
    const [hovered, setHovered] = useState(false);
    // let roundRating = Math.round(rating);
    // roundRating = roundRating > 5 ? 5 : roundRating;

    // Generate an array of star elements based on the rating
    // const starElements = Array.from({ length: roundRating }, (_, index) => {
    //     if (index + 1 > rating) return <FontAwesomeIcon key={index} icon={faStarHalfStroke} />;
    //     return <FontAwesomeIcon key={index} icon={faStar} />;
    // });

    const boxClasses = cx('box', { horizontal });
    // control video hover

    const handleMouseEnter = () => {
        if (!video) setHovered(false);
        else setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <div className={cx('wrapper', { [className]: className })}>
            <div className={boxClasses}>
                <div className={cx('box-thumbnail')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    {!hovered && <img src={imgURL} alt={movieName} />}
                    {hovered && (
                        <video loop autoPlay>
                            <source src={video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                    <div className={cx('overlay')}>
                        <Button className={cx('custom-btn')} to={detail}>
                            Detail
                        </Button>
                    </div>
                </div>
                <div className={cx('box-detail')}>
                    <div className={cx('box-detail-desc', 'box-detail-desc-right')}>
                        <a href="/home">{movieName}</a>
                        <span>{genres}</span>
                    </div>
                    <div className={cx('box-detail-desc', 'box-detail-desc-left')}>
                        <a href="/home" className={cx('run-time')}>
                            {runTime}
                        </a>
                        <div className={cx('rating')}>
                            <FontAwesomeIcon icon={faStar} /> {rating}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieItemCommon;
