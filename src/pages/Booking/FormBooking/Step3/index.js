import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuantityCart } from '~/store/cart-quantity';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';

import styles from './Step3.module.scss';
import Ticket from '~/components/Ticket';
import FormInputText2 from '~/components/Form/FormInput/FormInputText2';
import Button from '~/components/Button';
import * as cartService from '~/apiServices/cartService';

const cx = classNames.bind(styles);

const notify = (message, type = 'success') => {
    toast(message, {
        type: type,
        style: { fontSize: '1.4rem' },
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        className: 'foo-bar',
    });
};

function Step3({ userInfo }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const addToCartInfo = useSelector((state) => state.addToCart);
    const [email, setEmail] = useState({ email: '' });
    const [listTicket, setListTicket] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const ids = addToCartInfo.listSeatSelected.map((item) => item.seatId);
            const result = await cartService.getListTicketsBeforeBook(ids);

            //console.log(result);
            setListTicket(result);
        };
        fetchApi();
    }, [addToCartInfo.listSeatSelected]);

    const handleChangeInput = (e) => {
        setEmail((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const isValidEmail = (email) => {
        const regex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
        return regex.test(email);
    };

    const handleSendEmail = () => {
        if (email.email === '') {
            notify('The email field is empty so you will not receive tickets via email!', 'warning');
            return;
        }
        if (!isValidEmail(email.email)) {
            notify('This email is not valid!', 'error');
            return;
        }
        const id = toast.loading('Please wait...');
        setTimeout(() => {
            toast.update(id, {
                render: 'Tickets have been sent to your email ^o^!',
                type: 'success',
                isLoading: false,
                autoClose: 1000,
            });
        }, 1000);
    };

    const handleSubmit = () => {
        const callApi = async () => {
            const token = localStorage.getItem('token');
            const listSeatSelected = addToCartInfo.listSeatSelected.filter((e) => e.seatId !== 0);
            const ids = listSeatSelected.map((e) => e.seatId);
            const nameInTicket = userInfo.username;
            const emailInTicket = userInfo.email;
            //console.log(ids);
            const invoiceId = addToCartInfo.invoiceId;
            const result = await cartService.checkout(token, ids, invoiceId, nameInTicket, emailInTicket);
            //console.log(result);
            if (result && result.message === 'success') {
                notify('Complete checkout! Thank for you order WUW!', 'success');
                dispatch(fetchQuantityCart());
                navigate('/ticket?_type=ticket&tab=2');
            } else {
                notify(result.message, 'warning');
                dispatch(fetchQuantityCart());
                navigate('/ticket?_type=ticket&tab=2');
            }
        };

        callApi();
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('list-tickets')}>
                {listTicket.map((item) => {
                    const date = new Date(item.seatStatus.screening.screening_start);
                    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
                    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

                    return (
                        <Ticket
                            key={item.seatStatus.seat.id}
                            rowSeat={item.seatStatus.seat.rowSeat}
                            numberSeat={item.seatStatus.seat.numberSeat}
                            date={date.getDate()}
                            month={date.toLocaleDateString('en-us', { month: 'short' })}
                            type={item.seatStatus.screening.type}
                            movieName={item.movieName}
                            userInfo={userInfo}
                            imgUrl={'http://localhost:8081/movie/images/' + item.imageHorizonName}
                            startTime={hours + ':' + minutes}
                        />
                    );
                })}
            </div>
            <div className={cx('left-side')}>
                <div className={cx('send-email')}>
                    <p>Send tickets to your email?</p>
                    <FormInputText2
                        label={'Your email:'}
                        name={'email'}
                        value={email.email}
                        onChange={(e) => handleChangeInput(e)}
                    />
                    <Button primary onClick={handleSendEmail}>
                        SEND
                    </Button>
                </div>
                <div className={cx('last-check')}>
                    <h1>Last step</h1>
                    <p>
                        This is the final step. Please check the information again. If there are any errors, please go
                        back to the previous step and edit. If there are no errors, press the finish button here to
                        complete the booking.
                    </p>
                    <Button primary onClick={handleSubmit}>
                        Finish
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Step3;
