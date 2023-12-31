import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import styles from './Detail.module.scss';
import FullViewBannerTrailer from '~/components/FullViewBannerTrailer';
import MovieScheduleItem from '~/components/MovieItem/MovieScheduleItem';
import TitleHeadingPage from '~/components/TitleHeadingPage';
import { LineTable, ListUserTable } from '~/components/Table';
import FloatingButton from '~/components/FloatingButton';
import * as searchService from '~/apiServices/searchService';
import Slider from 'react-slick';

const cx = classNames.bind(styles);
const testDataLineTable = [
    { fieldName: 'Country', value: 'USA' },
    { fieldName: 'Language', value: 'English' },
    { fieldName: 'Release date', value: '5 SEP 2019' },
    { fieldName: 'Director', value: 'Kenedy Kei' },
];

const testDataCastList = [
    { avatar: 'https://i.pinimg.com/originals/0d/f4/1e/0df41e107a53ff1a91ab564c05d0e19e.jpg', name: 'Olivia' },
    { avatar: 'https://i.pinimg.com/originals/84/a7/bb/84a7bb05a3b2a40a4aa90f38aa05cd92.jpg', name: 'Gilbert' },
    { avatar: 'https://i.pinimg.com/originals/71/cd/2c/71cd2c41b4262912978079aa4f4281d7.jpg', name: 'Jorge' },
    { avatar: 'https://i.pinimg.com/originals/8b/50/c5/8b50c5d33db39a0b13c9f1368936f618.jpg', name: 'David' },
    { avatar: 'https://i.pinimg.com/originals/18/c6/73/18c673214596744749d36e4495ced1ac.jpg', name: 'John' },
    { avatar: 'https://i.pinimg.com/originals/32/5e/5b/325e5b10dc78eb368ae07bd748da2d07.jpg', name: 'Sam' },
];

function Detail() {
    const [movieInfo, setMovieInfo] = useState({ galleries: [] });
    const [listTypes, setListTypes] = useState([]);
    const { movieId } = useParams('movieId');
    useEffect(() => {
        const fetchApi = async () => {
            const result = await searchService.getMovieInfo(movieId);
            const types = await axios.get('http://localhost:8081/api/v1/screening/type');
            //console.log(result);
            setMovieInfo(result);
            setListTypes((prev) => {
                let newArray = [];
                newArray = types.data.types.map((item) => item.name);
                //console.log(newArray);
                return newArray;
            });
            //console.log(types.data.types);
        };

        fetchApi();
    }, [movieId]);
    //console.log(movieInfo);
    var settings = {
        dots: true,
        autoplay: true,
        infinite: true,
        arrows: false,
        fade: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // nextArrow: <CustomNextArrow />,
        // prevArrow: <CustomPrevArrow />,
    };
    return (
        <div className={cx('wrapper')}>
            <FullViewBannerTrailer
                poster={movieInfo.horizontalImage}
                movieName={movieInfo.title}
                trailer={movieInfo.trailer}
            />

            <div className={cx('content')}>
                <div style={{ width: '100%', boxSizing: 'border-box' }}>
                    <MovieScheduleItem types={listTypes} data={movieInfo} />
                </div>

                <section className={cx('sub-detail')}>
                    <TitleHeadingPage title={'details'}>
                        <LineTable data={testDataLineTable} />
                    </TitleHeadingPage>
                    <TitleHeadingPage title={'storyline'} className={cx('story-line')}>
                        <p>{movieInfo.description}</p>
                    </TitleHeadingPage>
                </section>
                <section className={cx('sub-detail-2')}>
                    <TitleHeadingPage title={'Cast'}>
                        <ListUserTable data={testDataCastList} />
                    </TitleHeadingPage>
                    <TitleHeadingPage title={'photo gallery'} className={cx('story-line')}>
                        <Slider {...settings}>
                            {movieInfo.galleries.map((item) => (
                                <img
                                    key={item.id}
                                    src={'http://localhost:8081/movie/images/' + item.imgUrl}
                                    alt={item.imgUrl}
                                />
                            ))}
                        </Slider>
                    </TitleHeadingPage>
                </section>
            </div>

            <FloatingButton icon={<FontAwesomeIcon icon={faChevronUp} />} />
        </div>
    );
}

export default Detail;
