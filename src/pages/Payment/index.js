import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCalendarDays, faFileLines, faMessage, faPlus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';

import styles from './Payment.module.scss';
import Button from '~/components/Button';
import FormInputText2 from '~/components/Form/FormInput/FormInputText2';
import * as userService from '~/apiServices/userService';
import { useDispatch } from 'react-redux';
import { addToCartActions } from '~/store/add-to-cart-slice';

const maskPrivateString = (inputString) => {
    // Extract the first three characters
    const firstThreeCharacters = inputString.slice(0, 3);

    // Create a string of asterisks of the same length as the original string
    const asterisks = '*'.repeat(inputString.length - 3);

    // Concatenate the first three characters with the asterisks
    const maskedString = firstThreeCharacters + asterisks;

    return maskedString;
};

const cx = classNames.bind(styles);

function Payment() {
    const dispatch = useDispatch();
    let [searchParams] = useSearchParams();
    const invoiceInfo = {
        tt: +searchParams.get('tt'),
        iv: searchParams.get('iv'),
        ct: searchParams.get('ct').slice(0, 5) + searchParams.get('iv').slice(5),
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

    const handleSubmit = () => {
        const id = toast.loading('Please wait...');
        if (paymentInfo.content !== 'MOONMOVIE ' + invoiceInfo.ct) {
            setTimeout(() => {
                toast.update(id, {
                    render: 'Payment failed --!',
                    type: 'error',
                    isLoading: false,
                    autoClose: 2000,
                });
                dispatch(addToCartActions.setPaymentStatus(false));
                setTimeout(() => {
                    navigate(-1);
                }, 2000);
            }, 2000);
        } else {
            setTimeout(() => {
                toast.update(id, {
                    render: 'Payment completed ^-^',
                    type: 'success',
                    isLoading: false,
                    autoClose: 2000,
                });
                dispatch(addToCartActions.setPaymentStatus(true));
                setTimeout(() => {
                    navigate(-1);
                }, 2000);
            }, 2000);
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
                            <p>Moon Pay</p>
                        </div>
                        <div className={cx('payment-method')}>
                            <p>SSS Pay</p>
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
