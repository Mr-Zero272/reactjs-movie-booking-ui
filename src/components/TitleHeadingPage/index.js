import classNames from 'classnames/bind';
import styles from './TitleHeadingPage.module.scss';

const cx = classNames.bind(styles);

function TitleHeadingPage({ titles }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('heading')}>
                {titles.map((item) => (
                    <h2 className={cx('title')} style={{ width: `${item.size}%` }}>
                        {item.title}
                    </h2>
                ))}
            </div>
            <div className={cx('line-gradient')}></div>
        </div>
    );
}

export default TitleHeadingPage;
