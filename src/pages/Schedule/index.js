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

function Schedule() {
    const initialState = {
        genre: '',
        cinemaType: [],
    };
    const [filter, setFilter] = useState(initialState);

    // neu duoc thi gop 2 cai function nay chung vo luon lay y tuong tu input :v
    const handleSelectOption = useCallback((value) => {
        setFilter((prev) => ({ ...prev, genre: value }));
    }, []);

    const handleSelectCheckbox = useCallback((value) => {
        setFilter((prev) => ({ ...prev, cinemaType: [...prev.cinemaType, value] }));
    }, []);

    console.log(filter);
    return (
        <div className={cx('wrapper')}>
            <TitleHeadingPage titleHeadingPageName={'schedule'} />
            <div className={cx('filter')}>
                <SelectOption options={MENU_OPTION} defaultValue={MENU_OPTION[0]} onSelectOption={handleSelectOption} />
                {/* {them mot cai div o day lam cai list loc goi fucntion dang hoan} */}
                <BoxCheckbox name={'3D'} onSelect={handleSelectCheckbox} />
                <BoxCheckbox name={'2D'} onSelect={handleSelectCheckbox} />
                <BoxCheckbox name={'IMAX 3D'} onSelect={handleSelectCheckbox} />
            </div>
            <MovieScheduleItem />
        </div>
    );
}

export default Schedule;
