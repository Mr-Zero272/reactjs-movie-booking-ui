import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './FormInputText2.module.scss';

const cx = classNames.bind(styles);
function FormInputText2({ label, value, name, onChange, onClick, disabled, className, boldLabel }, ref) {
    return (
        <div className={cx('input-data', { [className]: className })}>
            <input
                type="text"
                ref={ref}
                name={name}
                required
                onChange={onChange}
                value={value}
                onClick={onClick}
                disabled={disabled}
            />
            <div className={cx('underline')}></div>
            <label className={cx('label', { boldLabel })}>{label}</label>
        </div>
    );
}

export default forwardRef(FormInputText2);
