import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Register.module.scss';
import Modal from '~/components/Modal';
import Form from '~/components/Form';
import FormInputText from '~/components/Form/FormInput/FormInputText';
import * as authService from '~/apiServices/authService';
//import Loading from '~/components/Loading';

const cx = classNames.bind(styles);

function Register() {
    const [userRegisterInfo, setUserRegisterInfo] = useState(() => ({
        username: {
            value: '',
            isValid: false,
        },
        email: {
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
    //validate condition
    const validation = {
        username: {
            maxLength: 20,
        },
        email: {
            patternRegex: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            errorMessage: 'Your email is not valid!!!',
        },
        password: {
            patternRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            errorMessage:
                'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:',
            maxLength: 20,
        },
    };

    const handleSubmit = useCallback(() => {
        const fetchApi = async () => {
            setLoading(true);
            const result = await authService.register(
                userRegisterInfo.username.value,
                userRegisterInfo.password.value,
                userRegisterInfo.email.value,
            );
            //console.log(result);
            setLoading(false);
            if (result.message !== 'success') {
                setErrorMessage(result.response.data.message);
            } else {
                setErrorMessage('');
                localStorage.setItem('token', result.token);
                window.location = '/';
            }
        };
        fetchApi();
    }, [userRegisterInfo]);
    //console.log(userRegisterInfo);

    const isValidateForm = () => {
        for (let key in userRegisterInfo) {
            if (userRegisterInfo.hasOwnProperty(key)) {
                if (userRegisterInfo[key].isValid === false) {
                    return false;
                }
            }
        }
        return true;
    };

    const onValueChange = useCallback((e, isValid) => {
        setUserRegisterInfo((prev) => ({
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userRegisterInfo]);

    //console.log(userRegisterInfo);

    return (
        <>
            <Modal
                title={'Register'}
                footerTitle="Your continued use of this website means that you agree to our terms of use."
            >
                <Form
                    formErrorMessage={errorMessage}
                    noFormHeader={true}
                    onSubmit={handleSubmit}
                    isValidateForm={isValidateForm()}
                    onLoading={loading}
                >
                    <FormInputText
                        name="username"
                        label="Username:"
                        placeholder="Enter your username..."
                        validation={validation.username}
                        onValueChange={onValueChange}
                    />
                    <FormInputText
                        name="email"
                        label="Your email:"
                        placeholder="Enter your email..."
                        validation={validation.email}
                        onValueChange={onValueChange}
                    />
                    <FormInputText
                        name="password"
                        type="password"
                        placeholder="Password..."
                        memo={'Your password should have at least 8 letters.'}
                        validation={validation.password}
                        onValueChange={onValueChange}
                    />
                </Form>
                <div className={cx('sub-text-modal')}>
                    If you already have an account. <Link to="/login">Log in here!!!</Link>
                </div>
            </Modal>
        </>
    );
}

export default Register;
