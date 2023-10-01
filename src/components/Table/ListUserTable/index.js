import classNames from 'classnames/bind';
import styles from './ListUserTable.module.scss';

const cx = classNames.bind(styles);

function ListUserTable({ data }) {
    return (
        <div className={cx('wrapper')}>
            {data.map((item, index) => (
                <div className={cx('row')} key={index}>
                    <img src={item.avatar} alt="avatar" />
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    );
}

export default ListUserTable;
