import classNames from 'classnames/bind';
import styles from './MenuListButton.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
function MenuListButton({ items, onSelectedOption }) {
    return (
        <div className={cx('menu-list')}>
            {items.map((item, index) => (
                <Button
                    key={index}
                    leftIcon={item.icon}
                    className={cx('menu-item')}
                    outline
                    to={item.to}
                    onClick={() => onSelectedOption(item.code)}
                >
                    {item.title}
                </Button>
            ))}
        </div>
    );
}

export default MenuListButton;
