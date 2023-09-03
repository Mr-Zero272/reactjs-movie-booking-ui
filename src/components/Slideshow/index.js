import React from 'react';
import classNames from 'classnames/bind';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import styles from './Slideshow.module.scss';
import './Slideshow.css';
import Item from './Item';
import CustomDots from './CustomDots';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

// nho xoa

const cx = classNames.bind(styles);

function Slideshow({ data }) {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };

    const CustomRightArrow = ({ onClick, ...rest }) => {
        // const {
        //     carouselState: { currentSlide, deviceType },
        // } = rest;
        // onMove means if dragging or swiping in progress.
        return (
            <div className={cx('arrow', 'next')} onClick={() => onClick()}>
                <button>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        );
    };

    const CustomLeftArrow = ({ onClick, ...rest }) => {
        // const {
        //     carouselState: { currentSlide, deviceType },
        // } = rest;
        // onMove means if dragging or swiping in progress.
        return (
            <div className={cx('arrow', 'prev')} onClick={() => onClick()}>
                <button>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
            </div>
        );
    };

    const CustomDot = ({ onClick, ...rest }) => {
        const { index, active } = rest;
        // onMove means if dragging or swiping in progress.
        // active is provided by this lib for checking if the item is active or not.
        const carouselItems = [
            <CustomDots active={active ? true : false} imgUrl={data[0].imgUrl} />,
            <CustomDots active={active ? true : false} imgUrl={data[1].imgUrl} />,
            <CustomDots active={active ? true : false} imgUrl={data[2].imgUrl} />,
            <CustomDots active={active ? true : false} imgUrl={data[3].imgUrl} />,
        ];
        return <li onClick={() => onClick()}>{React.Children.toArray(carouselItems)[index]}</li>;
    };

    return (
        <div className={cx('wrapper')}>
            <Carousel
                responsive={responsive}
                showDots={true}
                autoPlay={true}
                infinite={true}
                autoPlaySpeed={5000}
                transitionDuration={2000}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                renderButtonGroupOutside={true}
                customDot={<CustomDot />}
                customRightArrow={<CustomRightArrow />}
                customLeftArrow={<CustomLeftArrow />}
            >
                {data.map((item, index) => (
                    <Item
                        key={index}
                        heading={item.heading}
                        desc={item.desc}
                        button={item.button}
                        imgUrl={item.imgUrl}
                        href={item.href}
                        whiteText={item.whiteText}
                    />
                ))}
            </Carousel>
        </div>
    );
}

export default Slideshow;
