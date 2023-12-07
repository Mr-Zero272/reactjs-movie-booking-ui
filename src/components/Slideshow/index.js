import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './Slideshow.module.scss';
import Item from './Item';
import baseUrl from '~/config/baseUrl';

// nho xoa

const cx = classNames.bind(styles);
function CustomNextArrow(props) {
    const { onClick } = props;
    return (
        <div className={cx('arrow', 'left')} onClick={onClick}>
            <FontAwesomeIcon icon={faChevronLeft} />
        </div>
    );
}

function CustomPrevArrow(props) {
    const { onClick } = props;
    return (
        <div className={cx('arrow', 'right')} onClick={onClick}>
            <FontAwesomeIcon icon={faChevronRight} />
        </div>
    );
}

const whiteTextArray = [6, 4];

function Slideshow({ data }) {
    var settings = {
        // customPaging: function (i) {
        //     return (
        //         <a>
        //             <img
        //                 style={{ width: '50px', height: '50px' }}
        //                 src={`https://i.pinimg.com/originals/18/c6/73/18c673214596744749d36e4495ced1ac.jpg`}
        //             />
        //         </a>
        //     );
        // },
        autoplay: true,
        dots: true,
        infinite: true,
        arrows: true,
        fade: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };
    return (
        <div className={cx('wrapper')}>
            <Slider {...settings}>
                {data.map((item) => {
                    const date = new Date(item.releaseDate);

                    return (
                        <Item
                            key={item.id}
                            showTextAnimation={'show'}
                            //hideTextAnimation={!showText}
                            heading={item.title}
                            desc={item.description.slice(0, 200)}
                            imgUrl={baseUrl.image + item.horizontalImage}
                            rating={item.rating / 10}
                            duration={item.duration_min}
                            releaseDate={date.getFullYear()}
                            href={'/detail/' + item.id}
                            cast={item.cast}
                            whiteText={whiteTextArray.includes(item.id)}
                            noContent={false}
                        />
                    );
                })}
            </Slider>
        </div>
    );
}

export default Slideshow;
