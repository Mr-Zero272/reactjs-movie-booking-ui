import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
function Modal({ children, title, icon = 'f', acceptBtn, onAccept, onCloseModal, footerTitle, closeBtn }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('modal-container')}>
                <div className={cx('overlay')} onClick={onCloseModal}></div>
                <div className={cx('content')}>
                    {closeBtn && (
                        <button className={cx('close-btn')} onClick={onCloseModal}>
                            <span>x</span>
                        </button>
                    )}
                    <div className={cx('modal-header')}>
                        <h3 className={cx('modal-title')}>
                            {icon && <img src={images.logo} alt="modal-icon" width={40} height={40} />}
                            {title}
                        </h3>
                    </div>
                    <div className={cx('modal-body')}>{children}</div>
                    <div className={cx('modal-footer')}>
                        {footerTitle && <p className={cx('footer-title')}>{footerTitle}</p>}
                        <div className={cx('btn-control')}>
                            {acceptBtn && (
                                <Button primary onClick={() => onAccept()}>
                                    Accept
                                </Button>
                            )}
                            {closeBtn && (
                                <Button close onClick={onCloseModal}>
                                    Close
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
