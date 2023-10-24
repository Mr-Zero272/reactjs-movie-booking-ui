import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faLongArrowLeft, faLongArrowRight } from '@fortawesome/free-solid-svg-icons';

import styles from './Search.module.scss';
import { MovieItemCommon } from '~/components/MovieItem';
import { fetchPaginationMovie, paginationAction } from '~/store/pagination-slice';

const cx = classNames.bind(styles);

const sliceString = (array) => {
    let strR = '';
    if (array.length !== 0) {
        for (let i = 0; i < array.length; i++) {
            strR = strR + array[i] + ', ';
        }
        strR = strR.slice(0, strR.lastIndexOf(', '));
    } else return null;
    return strR;
};

function Pagination() {
    const fullFilterInfo = useSelector((state) => state.pagination);
    const dispatch = useDispatch();
    console.log(fullFilterInfo);

    useEffect(() => {
        const q = fullFilterInfo.q;
        const size = fullFilterInfo.pagination.size;
        const cpage = fullFilterInfo.pagination.currentPage;
        const genres = sliceString(fullFilterInfo.genres);
        const type = fullFilterInfo.cinemaType === 'All' ? '' : fullFilterInfo.cinemaType;
        const manufacturers = sliceString(fullFilterInfo.manufacturers);
        dispatch(fetchPaginationMovie({ q, size, cpage, genres, type, manufacturers }));
    }, [
        fullFilterInfo.genres,
        fullFilterInfo.cinemaType,
        fullFilterInfo.manufacturers,
        fullFilterInfo.q,
        fullFilterInfo.pagination.currentPage,
        fullFilterInfo.pagination.size,
    ]);

    //console.log(fullFilterInfo.data);
    const displayPages = (totalPage, currentPage) => {
        // 1-5 hien thi binh thuong
        // neu co 7 phan tu thi 1 2 3 4 ... 7 -> 1 ... 3 4 5 6 7
        // > 7 thi 1 2 3 4 ... 12 -> 1 ... 3 4 5 ... 12 -> 1 ... 4 5 6 ... 12
        let listItem;
        if (totalPage < 6) {
            listItem = Array.from({ length: totalPage }, (_, index) => (
                <li key={index} onClick={() => dispatch(paginationAction.chooseCurrentPage(index + 1))}>
                    <span>{index + 1}</span>
                </li>
            ));
        }
        if (totalPage > 5 && totalPage < 7) {
            if (currentPage >= 3) {
                listItem = Array.from({ length: totalPage }, (_, index) => (
                    <li key={index} onClick={() => dispatch(paginationAction.chooseCurrentPage(index + 3))}>
                        <span>{index + 3}</span>
                    </li>
                ));
                listItem = [
                    <li onClick={() => dispatch(paginationAction.chooseCurrentPage(1))}>
                        <span>1</span>
                    </li>,
                    <li disabled>
                        <span>...</span>
                    </li>,
                    ...listItem,
                ];
            } else {
                listItem = Array.from({ length: totalPage - 2 }, (_, index) => (
                    <li key={index} onClick={() => dispatch(paginationAction.chooseCurrentPage(index + 1))}>
                        <span>{index + 1}</span>
                    </li>
                ));
                listItem = [
                    ...listItem,
                    <li disabled>
                        <span>...</span>
                    </li>,
                    <li onClick={() => dispatch(paginationAction.chooseCurrentPage(6))}>
                        <span>6</span>
                    </li>,
                ];
            }
        }
        if (totalPage > 7) {
            if (currentPage >= 3 && currentPage < totalPage - 2) {
                listItem = [];
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    listItem.push(
                        <li onClick={() => dispatch(paginationAction.chooseCurrentPage(i))}>
                            <span>{i}</span>
                        </li>,
                    );
                }
                listItem = [
                    <li onClick={() => dispatch(paginationAction.chooseCurrentPage(1))}>
                        <span>1</span>
                    </li>,
                    <li>
                        <span>...</span>
                    </li>,
                    ...listItem,
                    <li>
                        <span>...</span>
                    </li>,
                    <li onClick={() => dispatch(paginationAction.chooseCurrentPage(totalPage))}>
                        <span>{totalPage}</span>
                    </li>,
                ];
            } else {
                if (currentPage < 3) {
                    listItem = Array.from({ length: 4 }, (_, index) => (
                        <li key={index} onClick={() => dispatch(paginationAction.chooseCurrentPage(index + 1))}>
                            <span>{index + 1}</span>
                        </li>
                    ));
                    listItem = [
                        ...listItem,
                        <li disabled key={5}>
                            <span>...</span>
                        </li>,
                        <li key={totalPage} onClick={() => dispatch(paginationAction.chooseCurrentPage(totalPage))}>
                            <span>{totalPage}</span>
                        </li>,
                    ];
                }
                if (currentPage >= totalPage - 2) {
                    listItem = [];
                    for (let i = totalPage - 3; i <= totalPage; i++) {
                        listItem.push(
                            <li onClick={() => dispatch(paginationAction.chooseCurrentPage(i))}>
                                <span>{i}</span>
                            </li>,
                        );
                    }
                    listItem = [
                        <li onClick={() => dispatch(paginationAction.chooseCurrentPage(1))}>
                            <span>1</span>
                        </li>,
                        <li>
                            <span>...</span>
                        </li>,
                        ...listItem,
                    ];
                }
            }
        }
        return listItem;
    };

    return (
        <div className={cx('pagination_section_wrapper')}>
            <div className={cx('product_sorting_container', 'product_sorting_container_top')}>
                <ul className={cx('product_sorting')}>
                    <li>
                        <span className={cx('type_sorting_text')}>{fullFilterInfo.sort}</span>
                        <FontAwesomeIcon icon={faAngleDown} className={cx('i')} />
                        <ul className={cx('sorting_type')}>
                            <li
                                className={cx('type_sorting_btn')}
                                onClick={() => dispatch(paginationAction.chooseSortType('Default Sorting'))}
                            >
                                <span>Default Sorting</span>
                            </li>
                            <li
                                className={cx('type_sorting_btn')}
                                onClick={() => dispatch(paginationAction.chooseSortType('Rating'))}
                            >
                                <span>Rating</span>
                            </li>
                            <li
                                className={cx('type_sorting_btn')}
                                onClick={() => dispatch(paginationAction.chooseSortType('Movie Name'))}
                            >
                                <span>Movie Name</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <span>Show</span>
                        <span className={cx('num_sorting_text')}>{fullFilterInfo.pagination.size}</span>
                        <FontAwesomeIcon icon={faAngleDown} className={cx('i')} />
                        <ul className={cx('sorting_num')}>
                            <li
                                className={cx('num_sorting_btn')}
                                onClick={() => dispatch(paginationAction.changeSizePage(6))}
                            >
                                <span>6</span>
                            </li>
                            <li
                                className={cx('num_sorting_btn')}
                                onClick={() => dispatch(paginationAction.changeSizePage(12))}
                            >
                                <span>12</span>
                            </li>
                            <li
                                className={cx('num_sorting_btn')}
                                onClick={() => dispatch(paginationAction.changeSizePage(14))}
                            >
                                <span>24</span>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div className={cx('pages', 'd-flex', 'flex-row', 'align-items-center')}>
                    {fullFilterInfo.pagination.currentPage > 1 && (
                        <div className={cx('page_prev')} onClick={() => dispatch(paginationAction.prevPage())}>
                            <div>
                                <FontAwesomeIcon icon={faLongArrowLeft} className={cx('i')} />
                            </div>
                        </div>
                    )}
                    <div className={cx('page_current')}>
                        <span>{fullFilterInfo.pagination.currentPage}</span>
                        <ul className={cx('page_selection')}>
                            {displayPages(fullFilterInfo.pagination.totalPage, fullFilterInfo.pagination.currentPage)}
                        </ul>
                    </div>
                    <div className={cx('page_total')}>
                        <span>of</span>
                        {fullFilterInfo.pagination.totalPage}
                    </div>
                    {fullFilterInfo.pagination.currentPage < fullFilterInfo.pagination.totalPage && (
                        <div className={cx('page_next')} onClick={() => dispatch(paginationAction.nextPage())}>
                            <div>
                                <FontAwesomeIcon icon={faLongArrowRight} className={cx('i')} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className={cx('movie-grid')}>
                {fullFilterInfo.data !== undefined &&
                    fullFilterInfo.data.map((item) => (
                        <MovieItemCommon
                            key={item.id}
                            detail={'/detail/' + item.id}
                            className={cx('movie-item')}
                            horizontal={false}
                            imgURL={'http://localhost:8081/movie/images/' + item.verticalImage}
                            movieName={item.title}
                            genres={item.manufacturer}
                            runTime={item.duration_min + 'minutes'}
                            rating={item.rating / 10}
                        />
                    ))}
            </div>
            <div className={cx('product_sorting_container', 'product_sorting_container_bottom', 'clearfix')}>
                <ul className={cx('product_sorting')}>
                    <li>
                        <span>Show:</span>
                        <span className={cx('num_sorting_text')}>{fullFilterInfo.pagination.size}</span>
                        <FontAwesomeIcon icon={faAngleDown} className={cx('i')} />
                        <ul className={cx('sorting_num')}>
                            <li
                                className={cx('num_sorting_btn')}
                                onClick={() => dispatch(paginationAction.changeSizePage(6))}
                            >
                                <span>6</span>
                            </li>
                            <li
                                className={cx('num_sorting_btn')}
                                onClick={() => dispatch(paginationAction.changeSizePage(12))}
                            >
                                <span>12</span>
                            </li>
                            <li
                                className={cx('num_sorting_btn')}
                                onClick={() => dispatch(paginationAction.changeSizePage(24))}
                            >
                                <span>24</span>
                            </li>
                        </ul>
                    </li>
                </ul>
                <span className={cx('showing_results')}>Showing 1–3 of 12 results</span>
                <div className={cx('pages', 'd-flex', 'flex-row', 'align-items-center')}>
                    {fullFilterInfo.pagination.currentPage > 1 && (
                        <div className={cx('page_prev')} onClick={() => dispatch(paginationAction.prevPage())}>
                            <div>
                                <FontAwesomeIcon icon={faLongArrowLeft} className={cx('i')} />
                            </div>
                        </div>
                    )}
                    <div className={cx('page_current')}>
                        <span>{fullFilterInfo.pagination.currentPage}</span>
                        <ul className={cx('page_selection')}>
                            {displayPages(fullFilterInfo.pagination.totalPage, fullFilterInfo.pagination.currentPage)}
                        </ul>
                    </div>
                    <div className={cx('page_total')}>
                        <span>of</span> {fullFilterInfo.pagination.totalPage}
                    </div>
                    {fullFilterInfo.pagination.currentPage < fullFilterInfo.pagination.totalPage && (
                        <div className={cx('page_next')} onClick={() => dispatch(paginationAction.nextPage())}>
                            <div>
                                <FontAwesomeIcon icon={faLongArrowRight} className={cx('i')} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Pagination;
