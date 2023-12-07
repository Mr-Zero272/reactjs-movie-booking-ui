import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './SelectOption.module.scss';
//import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles);
const dfnFn = () => {};

function SelectOption({ options, defaultOption = 'Select genre movie', onSelectOption = dfnFn }) {
    const [toggleMenu, setToggleMenu] = useState(false);
    //default = 0
    const [activeOption, setActiveOption] = useState('');
    const menuRef = useRef(null);

    const handleOpenSelectMenu = () => {
        setToggleMenu(!toggleMenu);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setToggleMenu(false);
            }
        };

        if (toggleMenu) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [toggleMenu]);

    const handleSetOptionMenu = (option) => {
        setActiveOption(option);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('select-field')} onClick={handleOpenSelectMenu} ref={menuRef}>
                <p>{activeOption === '' ? defaultOption : options.find((ele) => ele.name === activeOption).name}</p>
                <FontAwesomeIcon className={cx('arrow-icon', { rotate: toggleMenu })} icon={faChevronDown} />
            </div>

            <ul className={cx('list', { active: toggleMenu })}>
                {options.map((option) => (
                    <li
                        className={cx('option')}
                        key={option.id}
                        onClick={() => {
                            onSelectOption(option.name);
                            handleSetOptionMenu(option.name);
                        }}
                    >
                        <p>{option.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SelectOption;
