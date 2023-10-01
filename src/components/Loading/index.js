import classNames from 'classnames/bind';
import styles from './Loading.module.scss';
const cx = classNames.bind(styles);
function Loading({ hide }) {
    return <div className={cx('loading', { hide })}></div>;
}

export default Loading;
