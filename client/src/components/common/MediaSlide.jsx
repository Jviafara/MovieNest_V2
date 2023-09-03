import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { SwiperSlide } from 'swiper/react';
import mediaApi from '../../api/modules/mediaApi';
import AutoSwiper from './AutoSwiper';
import MediaItem from './MediaItem';

const MediaSlide = ({ mediaType, mediaCategory }) => {
    const [medias, setMedias] = useState([]);

    useEffect(() => {
        const getMedias = async () => {
            const { response, err } = await mediaApi.getList({
                mediaType,
                mediaCategory,
                page: 1,
            });

            if (response) setMedias(response.results);
            if (err) toast.error(err.message);
        };
        getMedias();
    }, [mediaType, mediaCategory]);

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

export default MediaSlide;
