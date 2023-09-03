import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEarthAsia,
    faEllipsisVertical,
    faMagnifyingGlass,
    faRightToBracket,
    faBars,
    faShareFromSquare,
    faNewspaper,
    faUsersViewfinder,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MovieItemSearch from '~/components/MovieItem/MovieItemSearch';
import Menu from '~/components/Popper/Menu';
import { useDispatch } from 'react-redux';
import { modalLoginActions } from '~/store/modal-login-slice';

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
        to: '/logout',
        separate: true,
    },
];

function Header({ onToggleMenu }) {
    const dispatch = useDispatch();

    const [searchResult, setSearchResult] = useState([]);

    const currentUser = true;

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 0);
    }, []);

    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
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
                    <Tippy
                        interactive
                        visible={searchResult.length > 0}
                        render={(attrs) => (
                            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    <div className={cx('search-heading')}>
                                        <h4 className={cx('search-title')}>Film</h4>
                                        <Link to="/" className={cx('search-seemore')}>
                                            See more
                                        </Link>
                                    </div>
                                    <MovieItemSearch />
                                    <MovieItemSearch />
                                    <MovieItemSearch />
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <div className={cx('search-wrapper')}>
                            <input className={cx('search-input')} placeholder="Search..." />
                            <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
                        </div>
                    </Tippy>
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
                                <Button
                                    onClick={() => dispatch(modalLoginActions.openModal())}
                                    className={cx('login-btn')}
                                    primary
                                    rightIcon={<FontAwesomeIcon icon={faRightToBracket} />}
                                >
                                    Login
                                </Button>
                            </div>
                            <div className={cx('action')}>
                                <Button text>Register</Button>
                            </div>
                        </>
                    )}
                    <div className={cx('action')}>
                        <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                            <button className={cx('more-btn')}>
                                {currentUser ? (
                                    <>
                                        <img className={cx('user-avatar')} src={images.fakeAvatar} alt="avatar" />
                                    </>
                                ) : (
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                )}
                            </button>
                        </Menu>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
