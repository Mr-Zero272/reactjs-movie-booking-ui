import classNames from 'classnames/bind';

import styles from './Schedule.module.scss';
import TitleHeadingPage from '~/components/TitleHeadingPage';
import MovieScheduleItem from '~/components/MovieItem/MovieScheduleItem';
import BoxCheckbox from '~/components/Form/FormInput/BoxCheckbox';
import SelectOption from '~/components/Form/FormInput/SelectOption';
import { useCallback, useState } from 'react';

const cx = classNames.bind(styles);

//nho xoa
const MENU_OPTION = [
    {
        id: 1,
        title: 'Action',
    },
    {
        id: 2,
        title: 'Anime',
    },
    {
        id: 3,
        title: 'Horror',
    },
    {
        id: 4,
        title: 'Comedy',
    },
];

const LIST_TYPE = [
    {
        id: '3d',
        typeName: '3D',
    },
    {
        id: '2d',
        typeName: '2D',
    },
    {
        id: 'imax',
        typeName: 'IMAX',
    },
    {
        id: '4d',
        typeName: 'CINEMA 4D',
    },
];

function Schedule() {
    const initialState = {
        genre: '',
        cinemaType: [],
    };
    const [filter, setFilter] = useState(initialState);

    // check if an item exist in this obj
    const checkIncludes = useCallback((obj, item) => {
        return obj.includes(item);
    }, []);

    // neu duoc thi gop 2 cai function nay chung vo luon lay y tuong tu input :v
    const handleSelectOption = useCallback((value) => {
        setFilter((prev) => ({ ...prev, genre: value }));
    }, []);

    const handleSelectCheckbox = useCallback((value) => {
        setFilter((prev) => {
            if (checkIncludes(prev.cinemaType, value)) {
                return { ...prev, cinemaType: prev.cinemaType.filter((ele) => ele !== value) };
            } else {
                return { ...prev, cinemaType: [...prev.cinemaType, value] };
            }
        });
    }, []);

    return (
        <div className={cx('wrapper')}>
            <TitleHeadingPage titles={[{ title: 'schedule', size: 100 }]} />
            <div className={cx('filter')}>
                <SelectOption options={MENU_OPTION} defaultValue={MENU_OPTION[0]} onSelectOption={handleSelectOption} />
                {/* {them mot cai div o day lam cai list loc goi fucntion dang hoan} */}
                {LIST_TYPE.map((item) => (
                    <BoxCheckbox key={item.id} item={item} onSelect={handleSelectCheckbox} />
                ))}
            </div>
            <MovieScheduleItem />
            <MovieScheduleItem />
            <MovieScheduleItem />
            <MovieScheduleItem />
        </div>
    );
}

export default Schedule;
