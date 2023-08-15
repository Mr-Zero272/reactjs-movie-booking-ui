import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import { useState } from 'react';

const cx = classNames.bind(styles);

const tabs = ['home', 'booking', 'blog'];
function Sidebar() {
    const [type, setType] = useState('home');

    return (
        <aside className={cx('sidebar')}>
            <div className={cx('wrapper')}>
                <ul className={cx('sidebar-list')}>
                    {tabs.map((tab) => {
                        return (
                            <li key={tab} className={cx('sidebar-item')} onClick={() => setType(tab)}>
                                <Link
                                    className={cx('sidebar-item-page', type === tab ? 'active' : '')}
                                    to={tab === 'home' ? '/' : '/' + tab}
                                >
                                    <img src={images[tab + 'PageLogo']} alt={tab + '-page'} width={30} height={30} />
                                    <span>{tab}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;
