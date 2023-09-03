import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './FormInputText.module.scss';

const cx = classNames.bind(styles);

function FormInputText({
    label,
    name,
    placeholder,
    memo,
    square,
    sideBtn,
    whiteBg,
    focus,
    onValueChange,
    onValidityChange,
    onFocus,
    onBlur,
    type = 'text',
    validation = { patternRegex: '', errorMessage: '' },
}) {
    const [inputValue, setInputValue] = useState('');
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        if (inputValue !== '') {
            const regex = new RegExp(validation.patternRegex);
            setIsValid(regex.test(inputValue));
        } else {
            setIsValid(true);
        }
    }, [inputValue, validation]);

    useEffect(() => {
        // You can define a prop function like `onValidityChange`
        // and call it whenever the validity changes
        if (typeof onValidityChange === 'function') {
            onValidityChange(isValid);
        }
    }, [isValid]);

    useEffect(() => {
        if (typeof onValueChange === 'function') {
            onValueChange(inputValue); // Notify parent about value change
        }
    }, [inputValue]);

    return (
        <div className={cx('wrapper')}>
            {label && (
                <div className={cx('labelGroup')}>
                    <label className={cx('label')}>{label}</label>
                </div>
            )}
            <div className={cx('input-wrap', isValid === false ? 'invalid-input' : '', { square, whiteBg, focus })}>
                <input
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    value={inputValue}
                />
                {sideBtn && <button className={cx('side-btn')}>{sideBtn}</button>}
            </div>
            <div className={cx('message', isValid === false ? 'message-error' : '')}>
                {isValid === false ? validation.errorMessage : memo}
            </div>
        </div>
    );
}

export default FormInputText;
