import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';
import Header from '~/Layout/components/Header';
import Sidebar from '~/Layout/components/Sidebar';
import Footer from '~/Layout/components/Footer';
import SideBarResponsive from '../components/SlideBarResponsive';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const [toggleMenu, setToggleMenu] = useState(false);

    const handleOpenMenu = () => {
        setToggleMenu(!toggleMenu);
    };

    return (
        <div className={cx('wrapper')}>
            <Header onToggleMenu={handleOpenMenu} />
            <SideBarResponsive state={toggleMenu} onToggleMenu={handleOpenMenu} />
            <div className={cx('container')}>
                <Sidebar className={cx('sidebar')} tabs={['home', 'schedule', 'ticket', 'map']} />
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
