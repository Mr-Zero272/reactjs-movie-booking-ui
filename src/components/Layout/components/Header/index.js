import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEarthAsia,
    faRightToBracket,
    faBars,
    faShareFromSquare,
    faNewspaper,
    faUsersViewfinder,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import Search from '../Search';
import { userActions } from '~/store/user-slice';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            data: [
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Vietnam',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faUsersViewfinder} />,
        title: 'Blog',
        to: '/my-ticket',
    },
    {
        icon: <FontAwesomeIcon icon={faNewspaper} />,
        title: 'News',
        to: '/news',
    },
];

const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'ViewProfile',
        to: '/profile',
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faShareFromSquare} />,
        title: 'Logout',
        action: 'logout',
        separate: true,
    },
];

const isExpired = (d1) => {
    const today = new Date();
    return d1.getTime() < today.getTime();
};
function Header({ onToggleMenu }) {
    const dispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token === '') {
            dispatch(userActions.setUserStatus('logout'));
        } else {
            const tokenDecode = jwtDecode(token);
            if (!isExpired(new Date(tokenDecode.exp * 1000))) {
                dispatch(userActions.setUserNecessaryInfo({ status: 'online', username: tokenDecode.sub }));
            } else {
                dispatch(userActions.setUserStatus('logout'));
                localStorage.setItem('token', '');
            }
        }

        // return () => {
        //     dispatch(userActions.clearUserInfo());
        // };
    }, []);
    const currentUser = useSelector((state) => state.user.status) === 'online';
    //console.log(currentUser);
    //console.log(useSelector((state) => state.user.status));
    //const currentUser = true;

    const handleMenuChange = (menuItem) => {
        switch (menuItem.action) {
            case 'logout':
                dispatch(userActions.logout());
                break;
            default:
                throw new Error('Something went wrong!!!');
        }
    };

    return (
        <header className={cx('container')}>
            <nav className={cx('wrapper')}>
                <button className={cx('more-btn', 'menu-sidebar')} onClick={onToggleMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <Link className={cx('logo')} to="/">
                    <img src={images.logo} alt="logo" height={30} width={30} />
                    <h4 className={cx('logo-heading')}>
                        Moon <span style={{ color: 'var(--primary)' }}>M</span>ovie
                    </h4>
                </Link>
                <div className={cx('body')}>
                    <Search />
                </div>
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <div className={cx('action')}>
                                <Button className={cx('login-btn')} text>
                                    My ticket
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={cx('action')}>
                                <Button to={'/register'} text>
                                    Register
                                </Button>
                            </div>
                            <div className={cx('action')}>
                                <Button
                                    to={'/login'}
                                    className={cx('login-btn')}
                                    primary
                                    rightIcon={<FontAwesomeIcon icon={faRightToBracket} />}
                                >
                                    Login
                                </Button>
                            </div>
                        </>
                    )}
                    {currentUser && (
                        <div className={cx('action')}>
                            <Menu items={userMenu} onChange={handleMenuChange}>
                                <button className={cx('more-btn')}>
                                    <img className={cx('user-avatar')} src={images.fakeAvatar} alt="avatar" />
                                </button>
                            </Menu>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;
