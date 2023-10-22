import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

import Button from '~/components/Button';

const cx = classNames.bind(styles);
const defaultFn = () => {};
function MenuItem({ data, onClick = defaultFn }) {
    const classes = cx('menu-item', { separate: data.separate });

    return (
        <Button className={classes} leftIcon={data.icon} to={data.to} onClick={data.to ? defaultFn : () => onClick()}>
            {data.title}
        </Button>
    );
}

export default MenuItem;
