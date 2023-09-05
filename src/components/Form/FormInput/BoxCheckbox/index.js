import classNames from 'classnames/bind';
import styles from './BoxCheckbox.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);
const dfFunction = () => {};

function BoxCheckbox({ item, onSelect = dfFunction }) {
    const [toggleCheckbox, setToggleCheckbox] = useState(false);
    const handleSelect = () => {
        setToggleCheckbox(!toggleCheckbox);
    };
    return (
        <div
            className={cx('wrapper', { active: toggleCheckbox })}
            onClick={() => {
                handleSelect();
                onSelect(item.id);
            }}
        >
            <span>{item.typeName}</span>
        </div>
    );
}

export default BoxCheckbox;
