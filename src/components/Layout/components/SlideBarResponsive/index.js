import { memo } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faHouse,
    faCalendarCheck,
    faBell,
    faMessage,
    faGear,
    faRightFromBracket,
    faCalendar,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './SlideBarResponsive.module.scss';

const cx = classNames.bind(styles);

//const tabs = ['home', 'booking', 'blog'];

function SideBarResponsive({ state, onToggleMenu }) {
    let classNameNav = '';
    if (state) {
        classNameNav = cx('open');
    } else {
        classNameNav = '';
    }

    return (
        <div className={cx('wrapper')}>
            <nav className={classNameNav}>
                <aside className={cx('sidebar')}>
                    <div className={cx('logo')}>
                        <FontAwesomeIcon className={cx('menu-icon')} icon={faBars} onClick={onToggleMenu} />
                        <span className={cx('logo-name')}>Moon Movie</span>
                    </div>
                    <div className={cx('sidebar-content')}>
                        <ul className={cx('lists')}>
                            <li className={cx('list')}>
                                <Link to="/" className={cx('nav-link')} onClick={onToggleMenu}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faHouse} />
                                    <span className={cx('link')}>Home</span>
                                </Link>
                            </li>
                            <li className={cx('list')}>
                                <Link to="/schedule" className={cx('nav-link')} onClick={onToggleMenu}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faCalendar} />
                                    <span className={cx('link')}>Schedule</span>
                                </Link>
                            </li>
                            <li className={cx('list')}>
                                <Link to="/booking" className={cx('nav-link')} onClick={onToggleMenu}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faCalendarCheck} />
                                    <span className={cx('link')}>Booking</span>
                                </Link>
                            </li>
                            <li className={cx('list')}>
                                <Link to="/blog" className={cx('nav-link')} onClick={onToggleMenu}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faMessage} />
                                    <span className={cx('link')}>Blog</span>
                                </Link>
                            </li>
                            <li className={cx('list')}>
                                <a href="#" className={cx('nav-link')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faBell} />
                                    <span className={cx('link')}>Notifications</span>
                                </a>
                            </li>
                        </ul>
                        <div className={cx('bottom-content')}>
                            <li className={cx('list')}>
                                <a href="#" className={cx('nav-link')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faGear} />
                                    <span className={cx('link')}>Settings</span>
                                </a>
                            </li>
                            <li className={cx('list')}>
                                <a href="#" className={cx('nav-link')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faRightFromBracket} />
                                    <span className={cx('link')}>Login</span>
                                </a>
                            </li>
                        </div>
                    </div>
                </aside>
            </nav>
            <section className={cx('overlay')} onClick={onToggleMenu}></section>
        </div>
    );
}

export default memo(SideBarResponsive);
