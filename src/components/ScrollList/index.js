import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ScrollList.module.scss';
import MovieItemCommon from '~/components/MovieItem/MovieItemCommon';
import baseUrl from '~/config/baseUrl';

const cx = classNames.bind(styles);
function ScrollList({
    children,
    subHeading,
    title,
    moreBtn,
    data,
    classNameRow,
    classNameCol,
    centerEle,
    horizontalItem = false,
}) {
    const classesRow = cx('section-row', {
        [classNameRow]: classNameRow,
        centerEle,
    });
    const classesCol = cx('section-col', { [classNameCol]: classNameCol });
    return (
        <div className={cx('vertical')}>
            <div className={cx('heading-container')}>
                {subHeading && (
                    <p className={cx('sub-heading')}>
                        <strong>{subHeading.amount}</strong> {subHeading.desc}
                    </p>
                )}
                <div className={cx('heading-wrap')}>
                    <h2 className={cx('heading')}>
                        <a rel="noreferrer" target="_self" href="/learning-paths">
                            {title}
                            <span className={cx('view-all-icon')}></span>
                        </a>
                    </h2>
                    {moreBtn && (
                        <Link className={cx('view-all')} rel="noreferrer" target="_self" to="/search">
                            {moreBtn} <FontAwesomeIcon icon={faChevronCircleRight} />
                        </Link>
                    )}
                </div>
            </div>
            <div className={cx('body')}>
                <section className={classesRow}>
                    {data &&
                        data.map((item) => (
                            <section key={item.id} className={classesCol}>
                                <MovieItemCommon
                                    horizontal={horizontalItem}
                                    imgURL={
                                        horizontalItem
                                            ? baseUrl.image + item.horizontalImage
                                            : baseUrl.image + item.verticalImage
                                    }
                                    movieName={item.title}
                                    genres={item.cast}
                                    runTime={item.duration_min + ' min'}
                                    rating={item.rating}
                                    video={baseUrl.video + item.trailer}
                                    detail={'/detail/' + item.id}
                                />
                            </section>
                        ))}
                    {children}
                </section>
            </div>
        </div>
    );
}

export default ScrollList;
