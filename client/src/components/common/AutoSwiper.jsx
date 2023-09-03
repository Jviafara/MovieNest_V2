import React from 'react';
import { Swiper } from 'swiper/react';

const AutoSwiper = ({ children }) => {
    return (
        <div className="flex w-full">
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={0}
                grabCursor={true}
                style={{ width: '100%', height: 'max-content' }}>
                {children}
            </Swiper>
        </div>
    );
};

export default AutoSwiper;
