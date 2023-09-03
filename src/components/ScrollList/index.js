import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './ScrollList.module.scss';
import MovieItemCommon from '~/components/MovieItem/MovieItemCommon';

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
                        <a className={cx('view-all')} rel="noreferrer" target="_self" href="/learning-paths">
                            {moreBtn} <FontAwesomeIcon icon={faChevronCircleRight} />
                        </a>
                    )}
                </div>
            </div>
            <div className={cx('body')}>
                <section className={classesRow}>
                    {data &&
                        data.map((item, index) => (
                            <section key={index} className={classesCol}>
                                <MovieItemCommon
                                    horizontal={horizontalItem}
                                    imgURL={item.imgURL}
                                    movieName={item.movieName}
                                    genres={item.genres}
                                    runTime={item.runTime}
                                    rating={item.rating}
                                    video={item.video}
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
