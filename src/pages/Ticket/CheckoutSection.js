import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import styles from './Ticket.module.scss';
import Button from '~/components/Button';
import { addToCartActions } from '~/store/add-to-cart-slice';
import * as cartService from '~/apiServices/cartService';

const cx = classNames.bind(styles);

function CheckSection({ hide = false }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [listTicket, setListTicket] = useState([]);
    const [checkAll, setCheckAll] = useState(false);
    const checkoutInfo = useSelector((state) => state.addToCart);

    let totalPayment = checkoutInfo.listSeatSelected.reduce((accumulator, currentValue) => {
        //console.log(accumulator, currentValue);
        return accumulator + currentValue.price;
    }, 0);

    useEffect(() => {
        const fetchApi = async () => {
            const token = localStorage.getItem('token');
            const result = await cartService.getAllTicketInActiveCart(token);
            //console.log(result);
            setListTicket(result);
        };

        fetchApi();
    }, []);

    const handleCheckAllTicket = () => {
        let tempArr1 = [];
        let tempArr2 = [];
        if (!checkAll) {
            tempArr1 = listTicket.map((item) => ({
                seatId: item.seatStatus.id,
                screeningId: item.seatStatus.screening.id,
                auditoriumId: item.seatStatus.screening.auditorium.id,
                movieId: item.movieId,
                activeDate: item.seatStatus.screening.screening_start,
            }));
            tempArr2 = listTicket.map((item) => ({
                seatId: item.seatStatus.id,
                status: item.seatStatus.status,
                numberSeat: item.seatStatus.seat.numberSeat,
                rowSeat: item.seatStatus.seat.rowSeat,
                price: item.seatStatus.price,
            }));
        }

        const temp = {
            ...checkoutInfo,
            activeMovie: listTicket[0].movieId,
            listScreeningsAreActive: tempArr1,
            activeDate: listTicket[0].seatStatus.screening.screening_start,
            listSeatSelected: tempArr2,
            activeShowtime: listTicket[0].seatStatus.screening.id,
        };

        dispatch(addToCartActions.checkout(temp));
        setCheckAll(!checkAll);
    };

    // console.log(listTicket);
    // console.log(checkoutInfo);

    // checkout - part
    const handleCheckout = () => {
        dispatch(addToCartActions.setTotalPayment(+totalPayment));
        navigate('/booking?tab=1');
        //console.log(uniqueArray);
        //alert('thanh cong roi ba con oi!');
    };

    return (
        <div className={cx('check-out-section', { hide })}>
            <div className={cx('check-out-item')}>
                {!checkAll && (
                    <FontAwesomeIcon
                        icon={faSquare}
                        className={cx('check-all-checkbox')}
                        onClick={handleCheckAllTicket}
                    />
                )}
                {checkAll && (
                    <FontAwesomeIcon
                        icon={faSquareCheck}
                        className={cx('check-all-checkbox', 'checked-all')}
                        onClick={handleCheckAllTicket}
                    />
                )}
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
