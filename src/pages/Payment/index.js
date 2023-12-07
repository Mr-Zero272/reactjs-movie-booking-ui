import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCalendarDays, faFileLines, faMessage, faPlus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import classNames from 'classnames/bind';

import styles from './Payment.module.scss';
import Button from '~/components/Button';
import FormInputText2 from '~/components/Form/FormInput/FormInputText2';
import * as userService from '~/apiServices/userService';
import { addToCartActions } from '~/store/add-to-cart-slice';
import * as paymentService from '~/apiServices/paymentService';
import * as cartService from '~/apiServices/cartService';

const maskPrivateString = (inputString) => {
    // Extract the first three characters
    const firstThreeCharacters = inputString.slice(0, 3);

    // Create a string of asterisks of the same length as the original string
    const asterisks = '*'.repeat(inputString.length - 3);

    // Concatenate the first three characters with the asterisks
    const maskedString = firstThreeCharacters + asterisks;

    return maskedString;
};

const notify = (message, type = 'success') => {
    toast(message, {
        type: type,
        style: { fontSize: '1.4rem' },
        position: toast.POSITION.TOP_RIGHT,
        closeOnClick: true,
        autoClose: 1500,
        className: 'foo-bar',
    });
};

const cx = classNames.bind(styles);

function Payment() {
    const dispatch = useDispatch();
    const location = useLocation();
    const paymentSate = useSelector((state) => state.addToCart.paymentStatus);
    const [paymentS, setPaymentS] = useState(false);
    let [searchParams] = useSearchParams();
    const invoiceInfo = {
        tt: +searchParams.get('vnp_Amount') / 100,
        iv: searchParams.get('vnp_TxnRef'),
        ct: searchParams.get('vnp_OrderInfo'),
    };
    const navigate = useNavigate();
    if (invoiceInfo.tt === null || invoiceInfo.tt === undefined || invoiceInfo.tt === '') {
        navigate(-1);
    }
    const today = new Date();
    const [paymentInfo, setPaymentInfo] = useState({
        username: '',
        phone: '',
        content: 'MOONMOVIE ' + invoiceInfo.ct,
    });

    const handleInputChange = (e) => {
        setPaymentInfo((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    useEffect(() => {
        const fetchApi = async () => {
            const token = localStorage.getItem('token');
            const result = await userService.getCurrentUser(token);
            setPaymentInfo((prev) => ({
                ...prev,
                ...result,
                phone: maskPrivateString(result.phone),
            }));
        };

        fetchApi();
    }, []);

    useEffect(() => {
        const rspCode = searchParams.get('vnp_ResponseCode');
        //console.log(rspCode);
        if (rspCode !== null) {
            const vnp_Amount = searchParams.get('vnp_Amount');
            const vnp_BankCode = searchParams.get('vnp_BankCode');
            const vnp_BankTranNo = searchParams.get('vnp_BankTranNo');
            const vnp_CardType = searchParams.get('vnp_CardType');
            const vnp_OrderInfo = searchParams.get('vnp_OrderInfo');
            const vnp_PayDate = searchParams.get('vnp_PayDate');
            const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
            const vnp_TmnCode = searchParams.get('vnp_TmnCode');
            const vnp_TransactionNo = searchParams.get('vnp_TransactionNo');
            const vnp_TransactionStatus = searchParams.get('vnp_TransactionStatus');
            const vnp_TxnRef = searchParams.get('vnp_TxnRef');
            const vnp_SecureHash = searchParams.get('vnp_SecureHash');

            const result = paymentService.checkTransactionState(
                vnp_Amount,
                vnp_BankCode,
                vnp_BankTranNo,
                vnp_CardType,
                vnp_OrderInfo,
                vnp_PayDate,
                vnp_ResponseCode,
                vnp_TmnCode,
                vnp_TransactionNo,
                vnp_TransactionStatus,
                vnp_TxnRef,
                vnp_SecureHash,
            );

            if (rspCode === '00' && result.message === 'success' && paymentSate === false) {
                setPaymentS((prev) => true);
                const callApi = async () => {
                    const token = localStorage.getItem('token');
                    await cartService.createOrderPayment(token, vnp_TxnRef, true);
                    //dispatch(addToCartActions.setPaymentStatus({ status: true, invoiceId: vnp_TxnRef }));

                    //console.log(result);
                    // if (result.message === 'success') {
                    //     Swal.fire('This order is paid!', 'Thanks for your order.', 'success');
                    window.close();
                    // }

                    // console.log('isone', callApiOne);
                    //console.log('call api');
                };
                Swal.fire({
                    title: 'This order is paid!',
                    text: 'Thanks for your order.',
                    icon: 'success',
                    preConfirm: callApi,
                    allowOutsideClick: false,
                    showConfirmButton: 'Agree!',
                });
            } else {
                Swal.fire({
                    title: 'This order was not paid!',
                    text: 'Something went wrong!',
                    icon: 'error',
                    preConfirm: () => window.close(),
                    allowOutsideClick: false,
                    showConfirmButton: 'Agree!',
                });
            }
            //callApi(result.rspCode);
        }
        //console.log('call api 1');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);
    //console.log(paymentSate);

    const handleSubmit = () => {
        //toastLoading = toast.loading('Please wait...');
        if (paymentInfo.content !== 'MOONMOVIE ' + invoiceInfo.ct) {
            setTimeout(() => {
                notify('Payment error!!!', 'error');
                dispatch(addToCartActions.setPaymentStatus(false));
                setTimeout(() => {
                    window.close();
                }, 1500);
            }, 1500);
        } else {
            const urlPayment = paymentService.createPayment(
                invoiceInfo.tt,
                paymentInfo.content,
                'http://localhost:3001/payment',
                invoiceInfo.iv,
            );
            window.close();
            window.open(urlPayment, '_blank')?.focus();
        }
    };

    //console.log(paymentInfo);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('payment-detail')}>
                <div className={cx('payment-detail-top')}>
                    <p className={cx('total')}>&#8363; {invoiceInfo.tt}</p>
                    <div className={cx('detail')}>
                        <div className={cx('detail-item')}>
                            <p>Commission:</p>
                            <p>0 &#8363;</p>
                        </div>
                        <div className={cx('detail-item')}>
                            <p>Total:</p>
                            <p>{invoiceInfo.tt} &#8363;</p>
                        </div>
                        <div className={cx('end-line-part')}></div>
                    </div>
                    <div className={cx('sub-detail')}>
                        <div className={cx('sub-detail-item')}>
                            <div className={cx('sdi-label')}>
                                <FontAwesomeIcon icon={faFileLines} />
                                <p>Invoice ID:</p>
                            </div>
                            <p>{invoiceInfo.iv}</p>
                        </div>
                        <div className={cx('sub-detail-item')}>
                            <div className={cx('sdi-label')}>
                                <FontAwesomeIcon icon={faCalendarDays} />
                                <p>Date</p>
                            </div>
                            <p>
                                {today.toLocaleDateString('en-us', { month: 'short' })} {today.getDate()},{' '}
                                {today.getFullYear()}
                            </p>
                        </div>
                    </div>
                </div>
                <div className={cx('support')}>
                    <div className={cx('sp-label')}>
                        <h2>Customer support:</h2>
                        <p>Online 24/7</p>
                    </div>
                    <div className={cx('support-icon')}>
                        <FontAwesomeIcon icon={faMessage} />
                    </div>
                </div>
            </div>
            <div className={cx('payment-info')}>
                <div className={cx('payment-info-header')}>
                    <Tippy content="Back!">
                        <FontAwesomeIcon className={cx('back-icon')} icon={faArrowLeft} onClick={() => navigate(-1)} />
                    </Tippy>
                    <h1>Payment methods</h1>
                </div>
                <div className={cx('payment-info-body')}>
                    <div className={cx('payment-methods')}>
                        <div className={cx('payment-method', 'activem')}>
                            <p>VN Pay</p>
                        </div>
                        <div
                            className={cx('payment-method')}
                            onClick={() => notify('This payment method is in development.', 'warning')}
                        >
                            <p>Moon Pay</p>
                        </div>
                        <div className={cx('payment-method', 'more')}>
                            <p>
                                <FontAwesomeIcon icon={faPlus} className={cx('more-icon')} /> More
                            </p>
                        </div>
                    </div>
                    <div className={cx('form-payment')}>
                        <FormInputText2 disabled label={'Your payment account: ' + paymentInfo.phone} value="" />
                        <FormInputText2
                            label={'Content'}
                            name="content"
                            value={paymentInfo.content}
                            onChange={(e) => handleInputChange(e)}
                        />
                        <FormInputText2
                            label={'Name'}
                            name="username"
                            value={paymentInfo.username.toUpperCase()}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                </div>
                <div className={cx('payment-info-footer')}>
                    <Button primary onClick={handleSubmit}>
                        Pay {invoiceInfo.tt} &#8363;
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Payment;
