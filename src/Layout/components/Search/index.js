import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import * as searchService from '~/apiServices/searchService';
import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useDebounce } from '~/hooks';
import MovieItemSearch from '~/components/MovieItem/MovieItemSearch';
import { paginationAction } from '~/store/pagination-slice';

const cx = classNames.bind(styles);
function Search() {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef(null);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    useEffect(() => {
        dispatch(paginationAction.setSearchString(debounced));
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        setLoading(true);
        const fetchApi = async () => {
            setLoading(true);

            const result = await searchService.search(debounced);
            //console.log(result);
            setSearchResult(result);

            setLoading(false);
        };

        fetchApi();
    }, [debounced]);

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleSubmit = (e) => {
        setShowResult(false);
    };
    return (
        <Tippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <div className={cx('search-heading')}>
                            <h4 className={cx('search-title')}>Film</h4>
                            <Link to="/search" className={cx('search-seemore')} onClick={handleHideResult}>
                                See more
                            </Link>
                        </div>
                        {searchResult.map((result) => (
                            <MovieItemSearch key={result.id} data={result} onClick={handleHideResult} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search-wrapper')}>
                <input
                    value={searchValue}
                    ref={inputRef}
                    className={cx('search-input')}
                    placeholder="Search..."
                    spellCheck={false}
                    onChange={handleChange}
                    onFocus={() => setShowResult(true)}
                />
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                {searchValue && !loading && (
                    <button className={cx('clear-text')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                <Link to={'/search'} onClick={handleSubmit}>
                    <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
                </Link>
            </div>
        </Tippy>
    );
}

export default Search;
