import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FormInputText.module.scss';

const cx = classNames.bind(styles);
const defFunction = () => {};
const FormInputText = ({
    label,
    name,
    placeholder,
    memo,
    value,
    square,
    sideBtn,
    whiteBg,
    focus,
    onValueChange = defFunction,
    onValidityChange,
    onFocus,
    onBlur,
    type = 'text',
    validation = { patternRegex: '', errorMessage: '', maxLength: 1 },
}) => {
    const [inputValue, setInputValue] = useState(() => ({
        value: '',
        isValid: true,
    }));
    const [errorMessage, setErrorMessage] = useState('');

    const lengthErrorMessage = (l) => {
        return 'This field has a maximum of ' + l + ' characters.';
    };

    const isInputValid = (value) => {
        if (value !== '') {
            if (value.length >= validation.maxLength) {
                setErrorMessage(lengthErrorMessage(validation.maxLength));
                return false;
            } else {
                const regex = new RegExp(validation.patternRegex);
                setErrorMessage(validation.errorMessage);
                return regex.test(value);
            }
        } else {
            return true;
        }
    };

    const handleOnchange = (e) => {
        const isValid = isInputValid(e.target.value);
        setInputValue((prev) => ({
            ...prev,
            value: e.target.value,
            isValid: isValid,
        }));
        onValueChange(e, isValid);
    };

    return (
        <div className={cx('wrapper')}>
            {label && (
                <div className={cx('labelGroup')}>
                    <label className={cx('label')}>{label}</label>
                </div>
            )}
            <div
                className={cx('input-wrap', inputValue.isValid === false ? 'invalid-input' : '', {
                    square,
                    whiteBg,
                    focus,
                })}
            >
                <input
                    //ref={ref}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    onChange={(e) => handleOnchange(e)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    value={value ? value : inputValue.value}
                />
                {sideBtn && <button className={cx('side-btn')}>{sideBtn}</button>}
            </div>
            <div className={cx('message', inputValue.isValid === false ? 'message-error' : '')}>
                {inputValue.isValid === false ? errorMessage : memo}
            </div>
        </div>
    );
};

export default FormInputText;
