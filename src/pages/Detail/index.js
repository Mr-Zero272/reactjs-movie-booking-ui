import classNames from 'classnames/bind';

import styles from './Detail.module.scss';
import FullViewBannerTrailer from '~/components/FullViewBannerTrailer';
import MovieScheduleItem from '~/components/MovieItem/MovieScheduleItem';
import TitleHeadingPage from '~/components/TitleHeadingPage';
import { LineTable, ListUserTable } from '~/components/Table';
import Slideshow from '~/components/Slideshow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';

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

const SlideshowItems = [
    {
        heading: 'Film name 1',
        desc: 'Lorem Ipsum is simply dummy text oxt ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        button: 'Watch now',
        imgUrl: 'https://i.pinimg.com/originals/3f/f9/6c/3ff96cece6525e421a760fc976688cb7.jpg',
        href: '/booking?id=1',
        whiteText: false,
        noContent: true,
    },
    {
        heading: 'Film name 2',
        desc: 'Lorem I industry. Lorem Ipsum hase 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        button: 'Watch now',
        imgUrl: 'https://i.pinimg.com/originals/38/19/80/3819805f78058157a38831ce1baf6363.png',
        href: '/booking?id=2',
        whiteText: true,
        noContent: true,
    },
    {
        heading: '1917',
        desc: 'Lorem Ipsum is simply dustry. Lo ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        button: 'Watch now',
        imgUrl: 'https://i.pinimg.com/originals/83/ef/a6/83efa6577b979b6928d1565620b90eff.jpg',
        href: '/booking?id=3',
        whiteText: true,
        noContent: true,
    },
    {
        heading: 'Film name 4',
        desc: 'Lorem Ipsum is simply dmmy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        button: 'Watch now',
        imgUrl: 'https://i.pinimg.com/originals/32/b9/25/32b92506056c80dd7628b5c15ca72e34.jpg',
        href: '/booking?id=4',
        noContent: true,
        whiteText: true,
    },
];
function Detail() {
    return (
        <div className={cx('wrapper')}>
            <FullViewBannerTrailer />

            <div className={cx('content')}>
                <div style={{ width: '100%', boxSizing: 'border-box' }}>
                    <MovieScheduleItem />
                </div>

                <section className={cx('sub-detail')}>
                    <TitleHeadingPage title={'details'}>
                        <LineTable data={testDataLineTable} />
                    </TitleHeadingPage>
                    <TitleHeadingPage title={'storyline'} className={cx('story-line')}>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae pariatur quaerat nobis
                            illo laudantium in perferendis adipisci qui fugit, saepe quo facilis dolore dicta corrupti
                            nam quas, deleniti tenetur magni! Deserunt id, ullam minima amet sed nesciunt. Illum et nam
                            sed suscipit natus? Saepe quaerat perspiciatis optio sint! Unde, obcaecati.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae pariatur quaerat nobis
                            illo laudantium in perferendis adipisci qui fugit, saepe quo facilis dolore dicta corrupti
                            nam quas, deleniti tenetur magni! Deserunt id, ullam minima amet sed nesciunt. Illum et nam
                            sed suscipit natus? Saepe quaerat perspiciatis optio sint! Unde, obcaecati.
                        </p>
                    </TitleHeadingPage>
                </section>
                <section className={cx('sub-detail-2')}>
                    <TitleHeadingPage title={'Cast'}>
                        <ListUserTable data={testDataCastList} />
                    </TitleHeadingPage>
                    <TitleHeadingPage title={'photo gallery'} className={cx('story-line')}>
                        <Slideshow data={SlideshowItems} />
                    </TitleHeadingPage>
                </section>
            </div>
            <div className={cx('floating-btn')}>
                <FontAwesomeIcon icon={faCalendarPlus} />
            </div>
        </div>
    );
}

export default Detail;
