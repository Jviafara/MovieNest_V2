import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import tmdbConfigs from '../../api/config/tmdbConfigs';
import { routesGen } from '../../routes/routes';

const CastSlide = ({ cast }) => {
    return (
        <div className="flex w-full">
            <Swiper
                spaceBetween={10}
                slidesPerView={'auto'}
                grabCursor={true}
                style={{ width: '100%', height: 'max-content' }}>
                {cast.map((actor, index) => (
                    <SwiperSlide
                        key={index}
                        className="swiper-slide w-[50%] sm:w-[35%] md:w-[25%] lg:w-[20.5%]">
                        <Link to={routesGen.person(actor.id)}>
                            <div
                                style={{
                                    backgroundImage: `url(${tmdbConfigs.posterPath(
                                        actor.profile_path
                                    )})`,
                                }}
                                className="pt-[120%] bg-cover bg-top bg-base-300"
                            />
                            <div className="w-full h-max absolute bottom-0 p-[10px] bg-black/60">
                                <h1 className="text-white font-semibold truncate">
                                    {actor.name}
                                </h1>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CastSlide;
