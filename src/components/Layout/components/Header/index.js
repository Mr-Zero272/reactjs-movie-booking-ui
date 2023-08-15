import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEarthAsia,
    faEllipsisVertical,
    faMagnifyingGlass,
    faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MovieItem from '~/components/MovieItem';
import Menu from '~/components/Popper/Menu';

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
];

function Header() {
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 0);
    }, []);

    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
    };
    return (
        <header>
            <nav className={cx('wrapper')}>
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
                                    <MovieItem />
                                    <MovieItem />
                                    <MovieItem />
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <div className={cx('search-wrapper')}>
                            <input className={cx('search-input')} placeholder="Enter something here..." />
                            <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
                        </div>
                    </Tippy>
                </div>
                <div className={cx('actions')}>
                    <div className={cx('action')}>
                        <Button primary rightIcon={<FontAwesomeIcon icon={faRightToBracket} />}>
                            Login
                        </Button>
                    </div>
                    <div className={cx('action')}>
                        <Button text>Register</Button>
                    </div>
                    <div className={cx('action')}>
                        <Menu items={MENU_ITEMS} onChange={handleMenuChange}>
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        </Menu>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
