import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faAngleDoubleRight, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { paginationAction } from '~/store/pagination-slice';
import axios from 'axios';

const cx = classNames.bind(styles);

function Sidebar() {
    const dispatch = useDispatch();
    const [baseData, setBaseData] = useState({ cinemaTypes: [], genres: [], manufacturers: [] });
    const [showMore, setShowMore] = useState({ listCheckbox1: false, listCheckbox2: false });

    const fullFilterInfo = useSelector((state) => state.pagination);

    const handleShowMore = (listCheckboxName) => {
        if (listCheckboxName === 1) {
            setShowMore((prev) => ({ ...prev, listCheckbox1: !showMore.listCheckbox1 }));
        } else {
            setShowMore((prev) => ({ ...prev, listCheckbox2: !showMore.listCheckbox2 }));
        }
    };

    useEffect(() => {
        const fetchApi = async () => {
            const cinemaTypeResults = await axios.get('http://localhost:8081/api/v1/screening/type');
            const genresResults = await axios.get('http://localhost:8081/api/v1/genre');
            const manufactureResults = await axios.get('http://localhost:8081/api/v1/movie/manufacturers');
            setBaseData((prev) => ({
                ...prev,
                cinemaTypes: [{ name: 'All' }, ...cinemaTypeResults.data.types],
                genres: genresResults.data.genres,
                manufacturers: manufactureResults.data.manufacturers,
            }));
        };

        fetchApi();
    }, []);
    const isActive = (arr, obj) => {
        return arr.includes(obj);
    };

    return (
        <div className={cx('sidebar')}>
            <div className={cx('sidebar_section')}>
                <div className={cx('sidebar_title')}>
                    <h5>Cinema Type </h5>
                </div>
                <ul className={cx('sidebar_categories')}>
                    {baseData.cinemaTypes.map((item, index) => {
                        const active = fullFilterInfo.cinemaType === item.name;
                        return (
                            <li
                                key={index}
                                className={cx('', { active })}
                                onClick={() => dispatch(paginationAction.chooseCinemaType(item.name))}
                            >
                                <div className={cx('a')}>
                                    {active && (
                                        <span>
                                            <FontAwesomeIcon icon={faAngleDoubleRight} />
                                        </span>
                                    )}
                                    {item.name}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className={cx('sidebar_section')}>
                <div className={cx('sidebar_title')}>
                    <h5>Genres</h5>
                </div>
                <ul className={cx('checkboxes', { openFullCheckbox: showMore.listCheckbox1 })}>
                    {baseData.genres.map((item) => {
                        const active = isActive(fullFilterInfo.genres, item.id);
                        return (
                            <li
                                key={item.id}
                                className={cx({ active })}
                                onClick={() => dispatch(paginationAction.chooseGenre(item.id))}
                            >
                                {active && <FontAwesomeIcon className={cx('i')} icon={faSquareCheck} />}
                                {!active && <FontAwesomeIcon className={cx('i')} icon={faSquare} />}
                                <span>{item.name}</span>
                            </li>
                        );
                    })}
                </ul>
                <div className={cx('show_more')}>
                    {!showMore.listCheckbox1 && (
                        <span onClick={() => handleShowMore(1)}>
                            <span>+</span>Show More
                        </span>
                    )}
                    {showMore.listCheckbox1 && (
                        <span onClick={() => handleShowMore(1)}>
                            <span>-</span>Show Less
                        </span>
                    )}
                </div>
            </div>

            <div className={cx('sidebar_section')}>
                <div className={cx('sidebar_title')}>
                    <h5>Manufacturer</h5>
                </div>
                <ul className={cx('checkboxes', { openFullCheckbox: showMore.listCheckbox2 })}>
                    {baseData.manufacturers.map((item, index) => {
                        const active = isActive(fullFilterInfo.manufacturers, item.name);
                        return (
                            <li
                                key={index}
                                className={cx({ active })}
                                onClick={() => dispatch(paginationAction.chooseManufacturer(item.name))}
                            >
                                {active && <FontAwesomeIcon className={cx('i')} icon={faSquareCheck} />}
                                {!active && <FontAwesomeIcon className={cx('i')} icon={faSquare} />}
                                <span>{item.name}</span>
                            </li>
                        );
                    })}
                </ul>
                <div className={cx('show_more')}>
                    {!showMore.listCheckbox2 && (
                        <span onClick={() => handleShowMore(2)}>
                            <span>+</span>Show More
                        </span>
                    )}
                    {showMore.listCheckbox2 && (
                        <span onClick={() => handleShowMore(2)}>
                            <span>-</span>Show Less
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
