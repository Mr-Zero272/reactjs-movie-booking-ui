import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './Form.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Form({
    children,
    title,
    backBtn = false,
    onBack,
    formErrorMessage,
    noFormHeader = true,
    nameBtnSubmit = 'Register',
    isValidateForm = false,
    onSubmit,
    className,
    onLoading,
}) {
    const classes = cx('wrapper', {
        [className]: className,
    });

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (isValidateForm) {
                onSubmit();
            }
        }
    };

    return (
        <div className={classes} onKeyDown={handleKeyPress}>
            {noFormHeader === false && (
                <div className={cx('form-header')}>
                    {backBtn && (
                        <button className={cx('back-btn')} onClick={onBack}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                    )}
                    {title && <h3>{title}</h3>}
                </div>
            )}
            <div className={cx('form-body')}>
                {formErrorMessage && (
                    <div className={cx('form-error-message')}>
                        <FontAwesomeIcon icon={faXmark} />
                        <span>{formErrorMessage}</span>
                    </div>
                )}
                {children}
            </div>
            <div className={cx('form-footer')}>
                <Button className={cx('submit-btn')} primary disabled={!isValidateForm} onClick={onSubmit}>
                    {onLoading && <FontAwesomeIcon className={cx('loading', onLoading)} icon={faSpinner} />}
                    {nameBtnSubmit}
                </Button>
            </div>
        </div>
    );
}

export default Form;
