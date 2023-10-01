import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import Sidebar from './SideBar';
import Pagination from './Pagination';

const cx = classNames.bind(styles);

function Search() {
    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <Pagination />
        </div>
    );
}

export default Search;
