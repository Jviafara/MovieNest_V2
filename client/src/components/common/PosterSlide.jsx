import React from 'react';
import { SwiperSlide } from 'swiper/react';
import tmdbConfigs from '../../api/config/tmdbConfigs';
import AutoSwiper from './AutoSwiper';

const PosterSlide = ({ posters }) => {
    return (
        <AutoSwiper>
            {posters.splice(0, 10).map((item, index) => (
                <SwiperSlide
                    key={index}
                    className='className="swiper-slide w-[50%] sm:w-[35%] md:w-[25%] lg:w-[20.5%]"'>
                    <div
                        style={{
                            backgroundImage: `url(${tmdbConfigs.posterPath(
                                item.file_path
                            )})`,
                        }}
                        className="pt-[160%] bg-cover bg-center bg-base-300"
                    />
                </SwiperSlide>
            ))}
        </AutoSwiper>
    );
};

export default PosterSlide;
