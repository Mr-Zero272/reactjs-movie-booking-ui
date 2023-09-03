import classNames from 'classnames/bind';
import styles from './TitleHeadingPage.module.scss';

const cx = classNames.bind(styles);

function TitleHeadingPage({ titleHeadingPageName }) {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>{titleHeadingPageName}</h2>
            <div className={cx('line-gradient')}></div>
        </div>
    );
}

export default TitleHeadingPage;
