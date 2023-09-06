import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh, faClock, faPenToSquare, faListCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './Home.module.scss';
import Slideshow from '~/components/Slideshow';
import ScrollList from '~/components/ScrollList';
import FormInputText from '~/components/Form/FormInput/FormInputText';
import { MovieServiceItem } from '~/components/MovieItem';
import videos from '~/assets/videos';
import { useState } from 'react';

const cx = classNames.bind(styles);

const listMovieCommon = [
    {
        imgURL: 'https://i.pinimg.com/originals/e3/42/75/e34275b3bfe1ca528b7aa79232f215a7.jpg',
        movieName: 'The forest',
        genres: 'Action & Adventure, Fantasy, Science-Fiction',
        runTime: '1h 24min',
        rating: 4.5,
        video: videos.testVideo,
    },
    {
        imgURL: 'https://i.pinimg.com/originals/27/84/dc/2784dc2e2ac4cb610cbb73917ccdfc6a.jpg',
        movieName: 'The sky',
        genres: 'Action & Adventure, Fantasy, Science-Fiction',
        runTime: '2h 2min',
        rating: 5,
    },
    {
        imgURL: 'https://i.pinimg.com/originals/c2/c0/d6/c2c0d6fa59c47dd6c6fae2db9216769f.jpg',
        movieName: 'The peace',
        genres: 'Action & Adventure, Fantasy, Science-Fiction',
        runTime: '1h 33min',
        rating: 4.7,
    },
    {
        imgURL: 'https://i.pinimg.com/originals/cb/0f/41/cb0f4132ea97c44632058fb497322538.jpg',
        movieName: 'No name',
        genres: 'Action & Adventure, Fantasy, Science-Fiction',
        runTime: '3h 4min',
        rating: 4.5,
    },
    {
        imgURL: 'https://i.pinimg.com/originals/53/d7/36/53d7360840743530cd7ae4553a297b2c.jpg',
        movieName: 'The girl',
        genres: 'Action & Adventure, Fantasy, Science-Fiction',
        runTime: '3h 56min',
        rating: 4.5,
    },
    {
        imgURL: 'https://i.pinimg.com/originals/d5/d2/64/d5d2647a998f126e009065530eda20a9.jpg',
        movieName: 'Color',
        genres: 'Action & Adventure, Fantasy, Science-Fiction',
        runTime: '2h 44min',
        rating: 5,
    },
];

const listMovieCommonWithVideo = [
    {
        imgURL: 'https://i.pinimg.com/564x/d0/d9/30/d0d930f76e80e3c77a4d59875bdecff3.jpg',
        movieName: 'The forest',
        genres: 'Action & Adventure, Fantasy, Science-Fiction',
        runTime: '1h 24min',
        rating: 4.5,
        video: videos.testVideo,
    },
    {
        imgURL: 'https://i.pinimg.com/564x/b0/03/80/b00380e92e6955c7f1a987dca001a3e2.jpg',
        movieName: 'The sky',
        genres: 'Action & Adventure, Fantasy, Science-Fiction',
        runTime: '2h 2min',
        rating: 5,
        video: videos.testVideo,
    },
    {
        imgURL: 'https://i.pinimg.com/564x/f3/4f/ab/f34fabd830006eda97aa1550d6b08715.jpg',
        movieName: 'The peace',
        genres: 'Action & Adventure, Fantasy, Science-Fiction',
        runTime: '1h 33min',
        rating: 4.7,
        video: videos.testVideo,
    },
    {
        imgURL: 'https://i.pinimg.com/564x/18/3b/2a/183b2a5672bd7b866c4256793d438869.jpg',
        movieName: 'No name',
        genres: 'Action & Adventure, Fantasy, Science-Fiction',
        runTime: '3h 4min',
        rating: 4.5,
        video: videos.testVideo,
    },
    {
        imgURL: 'https://i.pinimg.com/750x/39/c9/53/39c953571a4a86d52c8f980cc8e65193.jpg',
        movieName: 'The girl',
        genres: 'Action & Adventure, Fantasy, Science-Fiction',
        runTime: '3h 56min',
        rating: 4.5,
        video: videos.testVideo,
    },
    {
        imgURL: 'https://i.pinimg.com/564x/d7/d7/9f/d7d79f7ebd118ab16bd7b6d23b2d9bce.jpg',
        movieName: 'Color',
        genres: 'Action & Adventure, Fantasy, Science-Fiction',
        runTime: '2h 44min',
        rating: 5,
        video: videos.testVideo,
    },
];

const listServices = [
    {
        icon: <FontAwesomeIcon icon={faGaugeHigh} />,
        title: 'Fast processing',
        desc: 'Lorem ipsum dolor sit. Praesentium laboriosam aspernatur laudantium omnis totam et ipsum eum veritatis tenetur quasi.',
    },
    {
        icon: <FontAwesomeIcon icon={faClock} />,
        title: '24/7',
        desc: 'Lorem ipsum dolor sit. Praesentium laboriosam aspernatur laudantium omnis totam et ipsum eum veritatis tenetur quasi.',
    },
    {
        icon: <FontAwesomeIcon icon={faPenToSquare} />,
        title: 'Flexible',
        desc: 'Lorem ipsum dolor sit. Praesentium laboriosam aspernatur laudantium omnis totam et ipsum eum veritatis tenetur quasi.',
    },
    {
        icon: <FontAwesomeIcon icon={faListCheck} />,
        title: 'Diversity',
        desc: 'Lorem ipsum dolor sit. Praesentium laboriosam aspernatur laudantium omnis totam et ipsum eum veritatis tenetur quasi.',
    },
];

const SlideshowItems = [
    {
        heading: 'Film name 1',
        desc: 'Lorem Ipsum is simply dummy text oxt ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        button: 'Watch now',
        imgUrl: 'https://e0.pxfuel.com/wallpapers/463/940/desktop-wallpaper-made-an-arrival-poster-after-watching-it-last-night.jpg',
        href: '/booking?id=1',
        whiteText: false,
    },
    {
        heading: 'Film name 2',
        desc: 'Lorem I industry. Lorem Ipsum hase 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        button: 'Watch now',
        imgUrl: 'https://i.pinimg.com/originals/ed/9a/dc/ed9adc315eb73b70606f75c794b0702c.jpg',
        href: '/booking?id=2',
        whiteText: true,
    },
    {
        heading: '1917',
        desc: 'Lorem Ipsum is simply dustry. Lo ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        button: 'Watch now',
        imgUrl: 'https://i.pinimg.com/originals/83/ef/a6/83efa6577b979b6928d1565620b90eff.jpg',
        href: '/booking?id=3',
        whiteText: true,
    },
    {
        heading: 'Film name 4',
        desc: 'Lorem Ipsum is simply dmmy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        button: 'Watch now',
        imgUrl: 'https://i.pinimg.com/originals/32/b9/25/32b92506056c80dd7628b5c15ca72e34.jpg',
        href: '/booking?id=4',
        whiteText: true,
    },
];

function Home() {
    const [focusInputAdv, setFocusInputAdv] = useState(false);

    const handleFocusInputAdv = () => {
        setFocusInputAdv(!focusInputAdv);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('slide-new-item')}>
                <Slideshow data={SlideshowItems} />
            </div>

            <div className={cx('common-movie')}>
                <ScrollList
                    subHeading={{ amount: '33.252+', desc: 'people watched' }}
                    title={'Popular movies'}
                    moreBtn={'Watch full'}
                    data={listMovieCommon}
                />
            </div>

            <div className={cx('common-movie')}>
                <ScrollList
                    subHeading={{ amount: '33.252+', desc: 'people watched' }}
                    title={'New movies'}
                    moreBtn={'Watch full'}
                    data={listMovieCommonWithVideo}
                    horizontalItem
                />
            </div>
            <div className={cx('infrastructure')}>
                <ScrollList title={'Infrastructure'} moreBtn={'Detail'} classNameRow={'row-custom-responsive-wrap'}>
                    <div className={cx('infr-image')}>
                        <img
                            src="https://entrepreneurship.babson.edu/wp-content/uploads/2020/10/Movie-1200-630.jpg"
                            alt="furniture"
                        />
                    </div>
                    <ol className={cx('infr-content')}>
                        <li>
                            <strong>Large capacity</strong>
                            <p>
                                {' '}
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium laboriosam
                                aspernatur laudantium omnis totam et ipsum eum veritatis tenetur quasi.
                            </p>
                        </li>
                        <li>
                            <strong>High resolution screen</strong>
                            <p>
                                {' '}
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium laboriosam
                                aspernatur laudantium omnis totam et ipsum eum veritatis tenetur quasi.
                            </p>
                        </li>
                        <li>
                            <strong>High quality sound</strong>
                            <p>
                                {' '}
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium laboriosam
                                aspernatur laudantium omnis totam et ipsum eum veritatis tenetur quasi.
                            </p>
                        </li>
                        <li>
                            <strong>Comfortable and convenient seats</strong>
                            <p>
                                {' '}
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium laboriosam
                                aspernatur laudantium omnis totam et ipsum eum veritatis tenetur quasi.
                            </p>
                        </li>
                    </ol>
                </ScrollList>
            </div>

            <div className={cx('services')}>
                <ScrollList title={'Our Services'} centerEle classNameRow={'row-custom-responsive-wrap'}>
                    {listServices.map((item, index) => (
                        <MovieServiceItem key={index} icon={item.icon} title={item.title} desc={item.desc} />
                    ))}
                </ScrollList>
            </div>

            <div className={cx('adv-wrapper')}>
                <div className={cx('adv-content')}>
                    <h3>Newsletter</h3>
                    <p>Subscribe to our newsletter and get 20% off your first ticket reservation.</p>
                </div>
                <div className={cx('adv-form')}>
                    <FormInputText
                        onFocus={handleFocusInputAdv}
                        onBlur={handleFocusInputAdv}
                        focus={focusInputAdv ? true : false}
                        type="text"
                        whiteBg
                        placeholder={'Your email...'}
                        sideBtn={'Register'}
                    />
                </div>
            </div>
        </div>
    );
}
export default Home;
