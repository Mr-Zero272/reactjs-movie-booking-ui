import classNames from 'classnames/bind';
import styles from './BoxCheckbox.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);
const dfFunction = () => {};

function BoxCheckbox({ name, onSelect = dfFunction }) {
    const [toggleCheckbox, setToggleCheckbox] = useState(false);
    const handleSelect = () => {
        setToggleCheckbox(!toggleCheckbox);
    };
    return (
        <div
            className={cx('wrapper', { active: toggleCheckbox })}
            onClick={() => {
                handleSelect();
                onSelect(3);
            }}
        >
            <span>{name}</span>
        </div>
    );
}

export default BoxCheckbox;
