import classNames from 'classnames/bind';
import styles from './LoginModal.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

// Loi vo cai component Loginmodal
function MenuListButton({ items, onSelectedOption, className }) {
    return (
        <div className={cx('menu-list', className)}>
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
