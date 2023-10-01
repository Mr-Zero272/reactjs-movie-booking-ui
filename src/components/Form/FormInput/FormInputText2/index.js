import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './FormInputText2.module.scss';

const cx = classNames.bind(styles);
function FormInputText2({ label, value, name, onChange, onClick }, ref) {
    return (
        <div className={cx('input-data')}>
            <input type="text" ref={ref} name={name} required onChange={onChange} value={value} onClick={onClick} />
            <div className={cx('underline')}></div>
            <label>{label}</label>
        </div>
    );
}

export default forwardRef(FormInputText2);
