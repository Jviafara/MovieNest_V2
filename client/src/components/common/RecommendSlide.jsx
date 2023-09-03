import React from 'react';
import { SwiperSlide } from 'swiper/react';
import AutoSwiper from './AutoSwiper';
import MediaItem from './MediaItem';

const RecommendSlide = ({ medias, mediaType }) => {
    return (
        <AutoSwiper>
            {medias.map((media, index) => (
                <SwiperSlide
                    key={index}
                    className="swiper-slide w-[50%] sm:w-[35%] md:w-[25%] lg:w-[20.5%]">
                    <MediaItem media={media} mediaType={mediaType} />
                </SwiperSlide>
            ))}
        </AutoSwiper>
    );
};

export default RecommendSlide;
