import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import TimeItem from '~/components/TimeItem';

import FormInputText2 from '~/components/Form/FormInput/FormInputText2';
import styles from './Step2.module.scss';
import SeatChosen from './SeatChosen';
import TitleHeadingPage from '~/components/TitleHeadingPage';
import Button from '~/components/Button';
import images from '~/assets/images';
import { addToCartActions } from '~/store/add-to-cart-slice';
import * as cartService from '~/apiServices/cartService';

const generateRandomString = (length, key) => {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ' + key;
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result;
};

const cx = classNames.bind(styles);
function Step2({ onNextStep, onChangeInfo }) {
    const dispatch = useDispatch();
    const addToCartInfo = useSelector((state) => state.addToCart);
    const [userInfo, setUserInfo] = useState({ username: '', email: '' });
    const [step2Info, setStep2Info] = useState({
        activeScreening: [{ type: '' }],
        date: new Date(),
        listSeatSelected: [],
    });
    const [paymentInfo, setPaymentInfo] = useState(() => ({
        invoiceId: generateRandomString(10, 'K78FEU'),
        orderInfo: generateRandomString(10, 'HY45E39R'),
    }));
    //console.log(addToCartInfo);

    const handleChangeInput = (e) => {
        setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        onChangeInfo(e);
    };

    const setNewInvoiceId = () => {
        setPaymentInfo((prev) => ({
            invoiceId: generateRandomString(10, prev.invoiceId),
            orderInfo: generateRandomString(10, prev.orderInfo),
        }));
    };

    //check if this tab is focus again
    useEffect(() => {
        const fetchApi = async () => {
            const token = localStorage.getItem('token');
            const result = await cartService.isThisInvoiceExists(token, paymentInfo.invoiceId);
            return result;
        };

        const handleTabFocus = async () => {
            const isExist = await fetchApi();

            if (isExist && isExist.message === 'yes') {
                dispatch(addToCartActions.setPaymentStatus({ status: true, invoiceId: paymentInfo.invoiceId }));
            }
        };
        window.addEventListener('focus', handleTabFocus);

        return () => {
            window.removeEventListener('focus', handleTabFocus);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paymentInfo.invoiceId]);

    const totalPayment = useMemo(() => {
        return addToCartInfo.listSeatSelected.reduce(
            (accumulator, currentValue) => accumulator + currentValue.price,
            0,
        );
    }, [addToCartInfo.listSeatSelected]);

    useEffect(() => {
        const activeScreening = addToCartInfo.screenings.filter((item) => item.id === addToCartInfo.activeShowtime);
        //console.log(activeScreening);
        let date = new Date();
        if (activeScreening?.length !== 0) {
            date = new Date(activeScreening[0].screening_start);
        }

        // sau nay lay tt bang url
        const tempArray = addToCartInfo.listScreeningsAreActive.filter((item) => {
            return (
                item.screeningId === addToCartInfo.activeShowtime &&
                item.auditoriumId === addToCartInfo.activeAuditorium &&
                item.movieId === addToCartInfo.activeMovie
            );
        });

        const listIdSeatsForThisVV = tempArray.map((item) => item.seatId);
        const listSeatsForThisVV = addToCartInfo.listSeatSelected.filter((item) =>
            listIdSeatsForThisVV.includes(item.seatId),
        );

        //console.log(listSeatsForThisVV);
        setStep2Info((prev) => ({
            ...prev,
            activeScreening,
            date,
            listSeatSelected: listSeatsForThisVV,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addToCartInfo.screenings, addToCartInfo.listSeatSelected]);

    //console.log(step2Info);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('list-seats')}>
                <div className={cx('list-seats-item')}>
                    {step2Info.listSeatSelected.map((item) => (
                        <SeatChosen key={item.seatId} seatInfo={item} screeningIfo={step2Info.activeScreening} />
                    ))}
                </div>
                <div className={cx('total-price')}>Total: {totalPayment} &#8363;</div>
            </div>
            <div className={cx('user-info')}>
                <TitleHeadingPage title={'User detail'} />
                <div className={cx('user-info-body')}>
                    <div className={cx('payment')}>
                        <img className={cx('qr-paying')} src={images.paymentQrCode} alt="qr" />
                        <p>Scan here to pay</p>
                        <p>Or you can click here!</p>
                        {!addToCartInfo.paymentStatus && (
                            <Button
                                href={`/payment?vnp_Amount=${addToCartInfo.totalPayment * 100}&vnp_TxnRef=${
                                    paymentInfo.invoiceId
                                }&vnp_OrderInfo=${paymentInfo.orderInfo}`}
                                target="_blank"
                                onClick={setNewInvoiceId}
                                primary
                            >
                                Pay now!!
                            </Button>
                        )}
                        {addToCartInfo.paymentStatus && (
                            <div className={cx('payment-success')}>
                                <FontAwesomeIcon icon={faSquareCheck} /> Payment successfully!
                            </div>
                        )}
                    </div>
                    <div className={cx('info')}>
                        <FormInputText2
                            label={'Costumer: '}
                            name={'username'}
                            value={userInfo.username}
                            onChange={handleChangeInput}
                        />
                        <FormInputText2
                            label={'Your email: '}
                            name={'email'}
                            value={userInfo.email}
                            onChange={handleChangeInput}
                        />
                    </div>
                </div>
            </div>
            <div className={cx('showtime-info')}>
                <div className={cx('date', 'showtime-info-item')}>
                    <p>Date</p>
                    <TimeItem
                        date={step2Info.date.getDate()}
                        month={step2Info.date.toLocaleDateString('en-us', { month: 'short' })}
                        className={cx('custom-time-item')}
                    />
                </div>
                <div className={cx('time', 'showtime-info-item')}>
                    <p>Time</p>
                    <p>
                        {step2Info.date.getHours() +
                            ':' +
                            (step2Info.date.getMinutes() < 10
                                ? '0' + step2Info.date.getMinutes()
                                : step2Info.date.getMinutes())}
                    </p>
                </div>
                <div className={cx('type', 'showtime-info-item')}>
                    <p>Types</p>
                    <p>{step2Info.activeScreening[0].type}</p>
                </div>
            </div>
            <button className={cx('control-btn-nextStep')} onClick={() => onNextStep(3)}>
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </div>
    );
}

export default Step2;
