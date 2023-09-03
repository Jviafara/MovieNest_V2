import React, { useEffect, useRef } from 'react';
import { SwiperSlide } from 'swiper/react';
import tmdbConfigs from '../../api/config/tmdbConfigs';
import NavigationSwiper from './NavigationSwiper';

const MediaVideo = ({ video }) => {
    const iFrameRef = useRef();

    useEffect(() => {
        const height = (iFrameRef.current.offsetWidth * 9) / 16 + 'px';
        iFrameRef.current.setAttribute('height', height);
    }, []);

    return (
        <div className="h-max">
            <iframe
                key={video.key}
                src={tmdbConfigs.youtubePath(video.key)}
                ref={iFrameRef}
                width="100%"
                title={video.id}
                style={{ border: 0 }}></iframe>
        </div>
    );
};

const MediaVideosSlide = ({ videos }) => {
    return (
        <div className="w-full ">
            <NavigationSwiper>
                {videos.map((video, index) => (
                    <SwiperSlide key={index}>
                        <MediaVideo video={video} />
                    </SwiperSlide>
                ))}
            </NavigationSwiper>
        </div>
    );
};

export default MediaVideosSlide;
