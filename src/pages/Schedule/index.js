import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import classNames from 'classnames/bind';

import styles from './Schedule.module.scss';
import TitleHeadingPage from '~/components/TitleHeadingPage';
import MovieScheduleItem from '~/components/MovieItem/MovieScheduleItem';
import BoxCheckbox from '~/components/Form/FormInput/BoxCheckbox';
import SelectOption from '~/components/Form/FormInput/SelectOption';
import { listTodayScheduleActions } from '~/store/list-today-schedule-slice';
import * as searchService from '~/apiServices/searchService';
const cx = classNames.bind(styles);

function Schedule() {
    const dispatch = useDispatch();
    const [baseData, setBaseData] = useState({ cinemaTypes: [], genres: [], data: [] });
    const filter = useSelector((state) => state.listTodaySchedule);
    const types = useSelector((state) => state.listTodaySchedule.cinemaTypes);
    //console.log(types);
    useEffect(() => {
        const fetchApi = async () => {
            const tempGenre = filter.genre;
            const cinemaTypeResults = await axios.get('http://localhost:8081/api/v1/screening/type');
            const genresResults = await axios.get('http://localhost:8081/api/v1/genre');
            const result = await searchService.schedule('', 6, 1, tempGenre);
            //console.log(result);
            setBaseData((prev) => ({
                ...prev,
                cinemaTypes: cinemaTypeResults.data.types,
                genres: genresResults.data.genres,
                data: result.movies,
            }));
            //console.log(cinemaTypeResults);
        };

        fetchApi();
    }, [filter.genre]);

    const handleSelectMenuOption = (name) => {
        dispatch(listTodayScheduleActions.chooseGenre(name));
    };
    const handleSelectCheckbox = (id) => {
        dispatch(listTodayScheduleActions.chooseCinemaTypes(id));
    };
    return (
        <div className={cx('wrapper')}>
            <TitleHeadingPage title={'SCHEDULE'} />
            <div className={cx('filter')}>
                <SelectOption options={baseData.genres} defaultValue={''} onSelectOption={handleSelectMenuOption} />
                <div className={cx('filter-checkbox')}>
                    {baseData.cinemaTypes.map((item) => (
                        <BoxCheckbox
                            key={item.name}
                            item={item}
                            active={filter.cinemaTypes.includes(item.name)}
                            className={cx('box-checkbox')}
                            onSelect={handleSelectCheckbox}
                        />
                    ))}
                </div>
            </div>
            {baseData.data.map((item) => (
                <MovieScheduleItem key={item.id} data={item} types={types} />
            ))}
        </div>
    );
}

export default Schedule;
