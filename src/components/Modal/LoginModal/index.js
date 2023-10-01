import { useCallback, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import Modal from '..';
import styles from './LoginModal.module.scss';
import images from '~/assets/images';
import MenuListButton from './MenuListButton';
import Form from '~/components/Form';
import FormInputText from '~/components/Form/FormInput/FormInputText';
import * as authService from '~/apiServices/authService';

const cx = classNames.bind(styles);
const MENU_FORM_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Use Username',
        code: 'username',
    },
    {
        icon: (
            <img
                src={images.googleIcon}
                alt="gg"
                width={13.33}
                height={13.33}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            />
        ),
        title: 'Continue with Google',
    },
    {
        icon: (
            <img
                src={images.facebookIcon}
                alt="gg"
                width={13.33}
                height={13.33}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            />
        ),
        title: 'Continue with Facebook',
    },
    {
        icon: (
            <img
                src={images.githubIcon}
                alt="gg"
                width={13.33}
                height={13.33}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            />
        ),
        title: 'Continue with Github',
    },
];
function LoginModal() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [userLoginInfo, setUserLoginInfo] = useState(() => ({
        username: {
            value: '',
            isValid: false,
        },
        password: {
            value: '',
            isValid: false,
        },
    }));
    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const validation = {
        username: {
            maxLength: 20,
        },
        password: {
            patternRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            errorMessage:
                'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:',
            maxLength: 30,
        },
    };
    //handle menu login
    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleReturnClick = () => {
        setSelectedOption(null);
    };

    const isValidateForm = () => {
        for (let key in userLoginInfo) {
            if (userLoginInfo.hasOwnProperty(key)) {
                if (userLoginInfo[key].isValid === false) {
                    return false;
                }
            }
        }
        return true;
    };

    const onValueChange = useCallback((e, isValid) => {
        setUserLoginInfo((prev) => ({
            ...prev,
            [e.target.name]: {
                ...prev[e.target.name],
                value: e.target.value,
                isValid: isValid,
            },
        }));
    }, []);

    useEffect(() => {
        setIsFormValid(isValidateForm);
    }, [userLoginInfo]);

    // submit event
    const handleSubmit = useCallback(() => {
        const fetchApi = async () => {
            setLoading(true);
            const result = await authService.login(userLoginInfo.username.value, userLoginInfo.password.value);
            //console.log(result);
            setLoading(false);
            if (result.message !== 'success') {
                setErrorMessage('Something went wrong!!!');
            } else {
                setErrorMessage('');
                localStorage.setItem('token', result.token);
                window.location = '/';
            }
        };
        fetchApi();
    }, [userLoginInfo]);

    if (!selectedOption) {
        return (
            <Modal
                title={'Login with'}
                footerTitle="Your continued use of this website means that you agree to our terms of use."
            >
                <MenuListButton items={MENU_FORM_ITEMS} onSelectedOption={handleOptionClick} />
            </Modal>
        );
    }

    return (
        <Modal
            title={'Login with'}
            footerTitle="Your continued use of this website means that you agree to our terms of use."
        >
            <Form
                formErrorMessage={errorMessage}
                noFormHeader={false}
                backBtn
                onBack={handleReturnClick}
                nameBtnSubmit="Login"
                isValidateForm={isFormValid}
                onSubmit={handleSubmit}
                onLoading={loading}
            >
                <FormInputText
                    label="Your username ?"
                    placeholder="Enter your username..."
                    validation={validation.username}
                    name="username"
                    onValueChange={onValueChange}
                />
                <FormInputText
                    type="password"
                    placeholder="Password..."
                    name="password"
                    memo={'Your password should have at least 8 letters.'}
                    validation={validation.password}
                    onValueChange={onValueChange}
                />
            </Form>
            <div className={cx('sub-text-modal')}>
                If you don't have account. <Link to="/register">Register here!!!</Link>
            </div>
        </Modal>
    );
}

export default LoginModal;
