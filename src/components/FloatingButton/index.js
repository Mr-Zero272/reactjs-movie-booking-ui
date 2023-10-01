import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus, faMessage, faPhone, faVoicemail } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './FloatingButton.module.scss';

const cx = classNames.bind(styles);
function FloatingButton({ icon, listMoreButton, onClick }) {
    const [showBtnOnTop, setShowBtnOpTop] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setShowBtnOpTop(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScrollOnTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <div className={cx('floating-container', { hide: !showBtnOnTop })}>
            <div className={cx('floating-button')} onClick={handleScrollOnTop}>
                {icon}
            </div>
            {listMoreButton && (
                <div className={cx('element-container')}>
                    {listMoreButton.map((item, index) => (
                        <a href={item.href}>
                            <span className={cx('float-element')}>{item.icon}</span>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FloatingButton;
