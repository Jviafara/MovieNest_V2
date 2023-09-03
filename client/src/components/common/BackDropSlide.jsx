import React from 'react';
import { SwiperSlide } from 'swiper/react';
import tmdbConfigs from '../../api/config/tmdbConfigs';
import NavigationSwiper from './NavigationSwiper';

const BackDropSlide = ({ backdrops }) => {
    return (
        <div className="w-full ">
            <NavigationSwiper>
                {[...backdrops].splice(0, 10).map((item, index) => (
                    <SwiperSlide key={index} className="swipper-slide">
                        <div
                            style={{
                                backgroundImage: `url(${tmdbConfigs.backdropPath(
                                    item.file_path
                                )})`,
                            }}
                            className="pt-[60%] bg-cover bg-top bg-base-300"
                        />
                    </SwiperSlide>
                ))}
            </NavigationSwiper>
        </div>
    );
};

export default BackDropSlide;
