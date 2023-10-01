import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './Slideshow.module.scss';
import Item from './Item';

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

function Slideshow({ data }) {
    const [showText, setShowText] = useState(true);

    const handleBeforeChange = () => {
        setShowText(false);
    };
    const handleAfterChange = () => {
        setShowText(true);
    };
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
        dots: true,
        infinite: true,
        arrows: true,
        //fade: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };
    return (
        <div className={cx('wrapper')}>
            <Slider {...settings} beforeChange={handleBeforeChange} afterChange={handleAfterChange}>
                <Item
                    showTextAnimation={showText}
                    //hideTextAnimation={!showText}
                    heading={data[1].heading}
                    desc={data[1].desc}
                    button={data[1].button}
                    imgUrl={data[1].imgUrl}
                    href={data[1].href}
                    whiteText={data[1].whiteText}
                    noContent={data[1].noContent}
                />
                <Item
                    showTextAnimation={showText}
                    //hideTextAnimation={!showText}
                    heading={data[0].heading}
                    desc={data[0].desc}
                    button={data[0].button}
                    imgUrl={data[0].imgUrl}
                    href={data[0].href}
                    whiteText={data[0].whiteText}
                    noContent={data[0].noContent}
                />
            </Slider>
        </div>
    );
}

export default Slideshow;
