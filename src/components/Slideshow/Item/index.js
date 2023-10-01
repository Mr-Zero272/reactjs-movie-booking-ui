import classNames from 'classnames/bind';
import styles from './Item.module.scss';
import Button from '~/components/Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);
function Item({
    heading,
    desc,
    button,
    imgUrl,
    href,
    whiteText = false,
    noContent = false,
    showTextAnimation: show,
    hideTextAnimation: hide,
}) {
    return (
        <div className={cx('item')}>
            <div className={cx('item-img-cover')} style={{ backgroundImage: `url(${imgUrl})` }}></div>
            <div className={cx('item-content', { whiteText, noContent })}>
                <div className={cx('heading')}>
                    <h2>
                        <Link className={cx('heading-title', { whiteText, show, hide })} to={href}>
                            {heading}
                        </Link>
                    </h2>
                    <div className={cx('sub-heading', { whiteText })}>
                        <div className={cx('rating')}>
                            <FontAwesomeIcon className={cx('star')} icon={faStar} />
                            <span> 8.7</span>
                        </div>
                        <div className={cx('premiere-date')}>2017</div>
                        <div className={cx('runtime')}>1h 27min</div>
                    </div>
                </div>
                <div className={cx('body')}>
                    <p className={cx('desc')}>{desc}</p>
                    <div className={cx('cta-btn')}>
                        <Button primary leftIcon={<FontAwesomeIcon icon={faPlayCircle} />} to={href}>
                            {button}
                        </Button>
                    </div>
                </div>
                <div className={cx('footer')}>
                    <div className={cx('starting', { whiteText })}>
                        Starring: Kenny, David, John, Kenny, David, John,Kenny, David, John.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Item;
