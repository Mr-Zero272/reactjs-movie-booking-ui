import { useLayoutEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './ListTimeItem.module.scss';
import TimeItem from '../TimeItem';

const cx = classNames.bind(styles);

//responsive chua dung den de tam
const responsiveSample = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 7,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 7,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 5,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2,
    },
};

//get week
function getFullWeek(today) {
    //const today = new Date('2023/9/30'); // dayofweek = 3
    const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay(); // The day of the week as an integer, 0 for Sunday, 1 for Monday, etc.
    //console.log(today.toLocaleDateString());
    // const temp = new Date('2023/9/10');
    // console.log(temp.toLocaleDateString('en-us', { weekday: 'short' }));
    //cn la 0 th7 la 6 :v
    const daysOfWeek = [];
    for (let i = 0; i < dayOfWeek - 1; i++) {
        const numberOfDatesToSubtract = dayOfWeek - 1 - i;
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - numberOfDatesToSubtract);
        daysOfWeek.push({
            date: date,
        });
    }

    daysOfWeek.push({
        date: today,
    });

    for (let j = 0; j < 7 - dayOfWeek; j++) {
        const numberOfDatesToPlus = j + 1;
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + numberOfDatesToPlus);
        daysOfWeek.push({
            date: date,
        });
    }
    return daysOfWeek;
}

function ListTimeItem({ responsive = responsiveSample, activeDate, onChooseDate }) {
    const [width, setWidth] = useState(() => window.innerWidth);
    const [device, setDive] = useState({});
    const [dataDate, setDataDate] = useState(() => {
        const today = new Date();
        return getFullWeek(today);
    });
    useMemo(() => {
        for (const deviceName in responsiveSample) {
            if (width >= responsiveSample[deviceName].breakpoint.min) {
                setDive(responsiveSample[deviceName]);
                break;
            }
        }
    }, [width]);

    useLayoutEffect(() => {
        const handleResponsive = () => {
            for (const deviceName in responsiveSample) {
                if (width >= responsiveSample[deviceName].breakpoint.min) {
                    setDive(responsiveSample[deviceName]);
                    break;
                }
            }
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResponsive);

        return () => {
            window.removeEventListener('resize', handleResponsive);
        };
    }, [width]);

    const handleNextWeek = () => {
        const firstDateOfNextWeek = new Date(
            dataDate[6].date.getFullYear(),
            dataDate[6].date.getMonth(),
            dataDate[6].date.getDate() + 1,
        );
        setDataDate(getFullWeek(firstDateOfNextWeek));
    };

    const handlePreWeek = () => {
        const lastDateOfPrevWeek = new Date(
            dataDate[0].date.getFullYear(),
            dataDate[0].date.getMonth(),
            dataDate[0].date.getDate() - 1,
        );
        setDataDate(getFullWeek(lastDateOfPrevWeek));
    };

    const checkActiveDate = (d) => {
        return (
            d.date.getDate() === activeDate.date &&
            d.date.getMonth() + 1 === activeDate.month &&
            d.date.getFullYear() === activeDate.year
        );
    };

    const listItems = dataDate.map((item, index) => {
        if (index > device.items - 1) {
            return null;
        } else {
            return (
                <TimeItem
                    key={index}
                    widthNormal
                    active={checkActiveDate(item)}
                    onClick={() => onChooseDate(item.date.getDate(), item.date.getMonth() + 1, item.date.getFullYear())}
                    date={item.date.getDate()}
                    day={item.date.toLocaleDateString('en-us', { weekday: 'long' })}
                    month={item.date.toLocaleDateString('en-us', { month: 'short' })}
                />
            );
        }
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('list-dates')}>{listItems}</div>
            <div className={cx('control-btn')}>
                <button onClick={handlePreWeek}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button onClick={handleNextWeek}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </div>
    );
}

export default ListTimeItem;
