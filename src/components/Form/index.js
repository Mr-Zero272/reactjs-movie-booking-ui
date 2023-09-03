import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './Form.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Form({
    children,
    title,
    backBtn = false,
    onBack,
    noFormHeader = true,
    nameBtnSubmit = 'Register',
    isValidateForm = false,
    onSubmit,
    className,
}) {
    const classes = cx('wrapper', {
        [className]: className,
    });
    return (
        <div className={classes}>
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

            <div className={cx('form-body')}>{children}</div>
            <div className={cx('form-footer')}>
                <Button className={cx('submit-btn')} primary disabled={!isValidateForm} onClick={onSubmit}>
                    {nameBtnSubmit}
                </Button>
            </div>
        </div>
    );
}

export default Form;
