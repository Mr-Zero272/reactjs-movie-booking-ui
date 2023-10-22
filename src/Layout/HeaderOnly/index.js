import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderOnly.module.scss';
import Header from '~/Layout/components/Header';
import SideBarResponsive from '../components/SlideBarResponsive';
import Footer from '../components/Footer';

const cx = classNames.bind(styles);
function HeaderOnly({ children }) {
    const [toggleMenu, setToggleMenu] = useState(false);

    const handleOpenMenu = () => {
        setToggleMenu(!toggleMenu);
    };
    return (
        <div>
            <Header onToggleMenu={handleOpenMenu} />
            <SideBarResponsive state={toggleMenu} onToggleMenu={handleOpenMenu} />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default HeaderOnly;
