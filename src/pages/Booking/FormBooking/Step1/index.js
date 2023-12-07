import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import ShowTime from './ShowTime';
import styles from './Step1.module.scss';
import SeatSection from './SeatSection';
import { fetchQuantityCart } from '~/store/cart-quantity';
import { fetchInfoAddToCart } from '~/store/add-to-cart-slice';

const cx = classNames.bind(styles);
const defaultF = () => {};
function Step1({ onNextStep = defaultF, nextBtn = false, addToCartBtn = false, onSubmit = defaultF }) {
    const dispatch = useDispatch();
    const movieId = useSelector((state) => state.addToCart.activeMovie);
    const movieInfo = useSelector((state) => state.addToCart.movieInfo);

    const handleSubmit = () => {
        dispatch(fetchQuantityCart());
        onSubmit();
    };

    //console.log(id);
    //console.log(addToCartInfo);
    useEffect(() => {
        //console.log('pagegoi', id);
        dispatch(fetchInfoAddToCart(movieId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-top')}>
                <div className={cx('movie-info')}>
                    <div className={cx('movie-name')}>{movieInfo.title}</div>
                    <div className={cx('time-desc')}>
                        <FontAwesomeIcon icon={faClock} /> {movieInfo.duration_min} minutes
                        <Button className={cx('cinema-name')} outline>
                            MM-01
                        </Button>
                    </div>
                </div>
                <div className={cx('movie-time')}>
                    <ShowTime />
                </div>
            </div>
            <div className={cx('form-bottom')}>
                <SeatSection />
                {nextBtn && (
                    <button className={cx('control-btn-nextStep')} onClick={() => onNextStep(2)}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                )}
                {addToCartBtn && (
                    <Button className={cx('control-btn-add-to-cart')} onClick={handleSubmit} primary>
                        Add to cart
                    </Button>
                )}
            </div>
        </div>
    );
}

export default Step1;
