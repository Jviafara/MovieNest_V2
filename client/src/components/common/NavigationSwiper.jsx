import React from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper } from 'swiper/react';

const NavigationSwiper = ({ children }) => {
    return (
        <div className="swiper-button">
            <Swiper
                spaceBetween={10}
                grabCursor={true}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Navigation, Pagination]}
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                className="w-full max-h-max px-[1rem] md:px-[4rem] ">
                {children}
            </Swiper>
        </div>
    );
};

export default NavigationSwiper;
