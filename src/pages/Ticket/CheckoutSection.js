import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import styles from './Ticket.module.scss';
import Button from '~/components/Button';
import { addToCartActions } from '~/store/add-to-cart-slice';

const cx = classNames.bind(styles);

function CheckSection({ hide = false }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const checkoutInfo = useSelector((state) => state.addToCart);

    let totalPayment = checkoutInfo.listSeatSelected.reduce((accumulator, currentValue) => {
        //console.log(accumulator, currentValue);
        return accumulator + currentValue.price;
    }, 0);

    // checkout - part
    const handleCheckout = () => {
        // let temArray = cartInfo.listScreeningsAreActive;

        // var uniqueArray = temArray.filter(
        //     (item, index) =>
        //         temArray.findIndex(
        //             (other) =>
        //                 other.screeningId === item.screeningId &&
        //                 other.auditoriumId === item.auditoriumId &&
        //                 other.movieId === item.movieId,
        //         ) === index,
        // );
        dispatch(addToCartActions.setTotalPayment(+totalPayment));
        navigate('/booking?tab=1');
        //console.log(uniqueArray);
        //alert('thanh cong roi ba con oi!');
    };

    return (
        <div className={cx('check-out-section', { hide })}>
            <div className={cx('check-out-item')}>
                <FontAwesomeIcon icon={faSquare} className={cx('check-all-checkbox')} />
                <p>Select all tickets</p>
            </div>
            <div className={cx('check-out-item', 'total-payment')}>
                <p>
                    Total payment ({checkoutInfo.listSeatSelected?.length} Tickets): {totalPayment}&#8363;
                </p>
            </div>
            <div className={cx('check-out-item')}>
                <Button primary onClick={handleCheckout}>
                    Check out
                </Button>
            </div>
        </div>
    );
}

export default CheckSection;
