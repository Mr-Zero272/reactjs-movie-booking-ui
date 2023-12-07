import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);
const defFunction = (e) => {};

function ProfileInputText({
    label,
    name,
    placeholder,
    memo,
    value,
    square,
    disabled,
    onValueChange = defFunction,
    onValidityChange,
    onFocus,
    onBlur,
    errorMessage = '',
    type = 'text',
}) {
    return (
        <div className={cx('input-wrapper')}>
            <label className={cx('input-label')}>{label}</label>
            {!disabled ? (
                <div className={cx('input-m')}>
                    <input
                        className={cx('input-i')}
                        name={name}
                        type={type}
                        value={value}
                        onChange={(e) => onValueChange(e)}
                    />
                </div>
            ) : (
                <div className={cx('input-value-only')}>{value}</div>
            )}
            {errorMessage && <div className={cx('input-error')}>{errorMessage}</div>}
        </div>
    );
}

export default ProfileInputText;
