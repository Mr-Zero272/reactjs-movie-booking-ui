import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh, faClock, faPenToSquare, faListCheck, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import styles from './Home.module.scss';
import Slideshow from '~/components/Slideshow';
import ScrollList from '~/components/ScrollList';
import FormInputText from '~/components/Form/FormInput/FormInputText';
import { MovieServiceItem } from '~/components/MovieItem';
import FloatingButton from '~/components/FloatingButton';
import * as searchService from '~/apiServices/searchService';

const cx = classNames.bind(styles);

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

function Home() {
    const [focusInputAdv, setFocusInputAdv] = useState(false);
    const [listMovie1, setListMovie1] = useState([]);
    const [listMovie2, setListMovie2] = useState([]);

    const handleFocusInputAdv = () => {
        setFocusInputAdv(!focusInputAdv);
    };

    useEffect(() => {
        const fetchApi = async () => {
            const result1 = await searchService.search('', 'less', 1);
            const result2 = await searchService.search('', 'less', 2);
            setListMovie1(result1);
            setListMovie2(result2);
        };

        fetchApi();
    }, []);

    //console.log(listMovie1);
    // console.log(listMovie2);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('slide-new-item')}>
                <Slideshow data={listMovie1} />
            </div>

            <div className={cx('common-movie')}>
                <ScrollList
                    subHeading={{ amount: '33.252+', desc: 'people watched' }}
                    title={'Popular movies'}
                    moreBtn={'Watch full'}
                    data={listMovie1}
                />
            </div>

            <div className={cx('common-movie')}>
                <ScrollList
                    subHeading={{ amount: '33.252+', desc: 'people watched' }}
                    title={'New movies'}
                    moreBtn={'Watch full'}
                    data={listMovie2}
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
            <FloatingButton icon={<FontAwesomeIcon icon={faChevronUp} />} />
        </div>
    );
}
export default Home;
