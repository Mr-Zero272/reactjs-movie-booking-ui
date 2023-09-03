import { useState } from 'react';
//import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import Modal from '..';
//import styles from './LoginModal.module.scss';
import images from '~/assets/images';
import MenuListButton from '~/components/MenuListButton';
import Form from '~/components/Form';
import FormInputText from '~/components/Form/FormInput/FormInputText';
import { useDispatch } from 'react-redux';
import { modalLoginActions } from '~/store/modal-login-slice';

//const cx = classNames.bind(styles);
const MENU_FORM_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Use Email',
        code: 'email',
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
    let defaultInfo = {
        email: '',
        password: '',
    };
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState(null);
    const [loginInfo, setLoginInfo] = useState(defaultInfo);
    const [passwordInputValidity, setPasswordInputValidity] = useState(false);
    const [emailInputValidity, setEmailInputValidity] = useState(false);

    //handle menu login
    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleReturnClick = () => {
        setSelectedOption(null);
    };

    if (!selectedOption) {
        return (
            <Modal
                closeBtn
                title={'Register with'}
                footerTitle="Your continued use of this website means that you agree to our terms of use."
                onToggleModal={() => dispatch(modalLoginActions.closeModal())}
            >
                <MenuListButton items={MENU_FORM_ITEMS} onSelectedOption={handleOptionClick} />
            </Modal>
        );
    }

    // email input
    const emailValidation = {
        patternRegex: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/,
        errorMessage: 'Your email is not valid!!!',
    };
    const handleEmailValidityChange = (isValid) => {
        setEmailInputValidity(isValid);
    };

    const handleChangeEmail = (newValue) => {
        setLoginInfo((prev) => ({ ...prev, email: newValue }));
    };

    // password input
    const passwordValidation = {
        patternRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        errorMessage:
            'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:',
    };
    const handlePasswordValidityChange = (isValid) => {
        setPasswordInputValidity(isValid);
    };

    const handleChangePassword = (newValue) => {
        setLoginInfo((prev) => ({ ...prev, password: newValue }));
    };

    //check from validation
    const validateForm = () => {
        if (loginInfo.email === '' || loginInfo.password === '') {
            return false;
        } else {
            return passwordInputValidity && emailInputValidity;
        }
    };

    // submit event
    const handleSubmit = () => {
        console.log('email', loginInfo.email);
        console.log('password', loginInfo.password);
    };

    return (
        <Modal
            title={'Login with'}
            footerTitle="Your continued use of this website means that you agree to our terms of use."
            onToggleModal={() => dispatch(modalLoginActions.closeModal())}
        >
            <Form
                noFormHeader={false}
                backBtn
                onBack={handleReturnClick}
                nameBtnSubmit="Login"
                isValidateForm={validateForm()}
                onSubmit={handleSubmit}
            >
                <FormInputText
                    label="Your email ?"
                    placeholder="Enter your email..."
                    validation={emailValidation}
                    onValueChange={handleChangeEmail}
                    onValidityChange={handleEmailValidityChange}
                />
                <FormInputText
                    type="password"
                    placeholder="Password..."
                    memo={'Your password should have at least 8 letters.'}
                    validation={passwordValidation}
                    onValueChange={handleChangePassword}
                    onValidityChange={handlePasswordValidityChange}
                />
            </Form>
        </Modal>
    );
}

export default LoginModal;
