import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause } from '@fortawesome/free-regular-svg-icons';

import classNames from 'classnames/bind';
import styles from './FullViewBannerTrailer.module.scss';
import videos from '~/assets/videos';

const cx = classNames.bind(styles);
function FullViewBannerTrailer({ poster, movieName }) {
    const videoRef = useRef(null);
    const [playVideo, setPlayVideo] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(false);
    };

    const handleMouseLeave = () => {
        setIsHovered(true);
    };

    const handlePlayVideo = () => {
        setPlayVideo(!playVideo);
        if (!playVideo) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-trailer')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <video
                    ref={videoRef}
                    loop
                    poster="https://i.pinimg.com/originals/d3/8b/c5/d38bc5b12e32ea4d426807769ccbfd44.png"
                >
                    <source src={videos.testVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className={cx('control-btn', { hide: playVideo, fade: isHovered })} onClick={handlePlayVideo}>
                    <FontAwesomeIcon className={cx('play-btn')} icon={faCirclePlay} />
                    <span>Watch trailer</span>
                </div>
                <div className={cx('control-btn', { hide: !playVideo, fade: isHovered })} onClick={handlePlayVideo}>
                    <FontAwesomeIcon className={cx('pause-btn')} icon={faCirclePause} />
                    <span>Stop</span>
                </div>
            </div>
            <div className={cx('content')}>
                <h2>MORTAL ENGINES</h2>
            </div>
        </div>
    );
}

export default FullViewBannerTrailer;
