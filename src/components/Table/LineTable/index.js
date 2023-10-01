import classNames from 'classnames/bind';
import styles from './LineTable.module.scss';

const cx = classNames.bind(styles);

function LineTable({ data, hover }) {
    return (
        <div className={cx('wrapper')}>
            {data.map((item, index) => (
                <div className={cx('row', hover)} key={index}>
                    <p>{item.fieldName}</p>
                    <p>{item.value}</p>
                </div>
            ))}
        </div>
    );
}

export default LineTable;
