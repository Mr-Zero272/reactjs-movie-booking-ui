import classNames from 'classnames/bind';
import styles from './TitleHeadingPage.module.scss';

const cx = classNames.bind(styles);

function TitleHeadingPage({ children, title, className }) {
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('heading')}>
                <h2 className={cx('title')}>{title}</h2>
            </div>
            <div className={cx('line-gradient')}></div>
            {children}
        </div>
    );
}

export default TitleHeadingPage;
