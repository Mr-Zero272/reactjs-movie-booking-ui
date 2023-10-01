import classNames from 'classnames/bind';
import styles from './NavStepper.module.scss';

const cx = classNames.bind(styles);
const defaultF = () => {};
function NavStepper({ classNames, items, activeStep = 1, onClick = defaultF }) {
    return (
        <div className={cx('wrapper', { classNames })}>
            {items.map((item, index) => (
                <div className={cx('item')} key={index} onClick={() => onClick(index + 1)}>
                    <p>
                        <strong>0{index + 1}</strong> {item}
                    </p>
                    <div className={cx('line-bottom', { active: activeStep === index + 1 })}></div>
                </div>
            ))}
        </div>
    );
}

export default NavStepper;
