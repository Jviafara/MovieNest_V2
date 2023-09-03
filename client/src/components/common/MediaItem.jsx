import React, { useEffect, useState } from 'react';
import { BsPlayFill } from 'react-icons/bs';
import { MdFavorite } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import tmdbConfigs from '../../api/config/tmdbConfigs';
import { routesGen } from '../../routes/routes';
import favoriteUtils from '../../utils/favoriteUtils';
import CircularRate from './CircularRate';

const MediaItem = ({ media, mediaType }) => {
    const { listFavorites } = useSelector((state) => state.user);
    const [title, setTitle] = useState('');
    const [posterPath, setPosterPath] = useState('');
    const [releaseDate, setReleaseDate] = useState(null);
    const [rate, setRate] = useState(null);

    useEffect(() => {
        setTitle(media.title || media.name || media.mediaTitle);

        setPosterPath(
            tmdbConfigs.posterPath(
                media.poster_path ||
                    media.backdrop_path ||
                    media.mediaPoster ||
                    media.profile_path
            )
        );
        if (mediaType === tmdbConfigs.mediaType.movie) {
            setReleaseDate(
                media.release_date && media.release_date.split('-')[0]
            );
        } else {
            setReleaseDate(
                media.first_air_date && media.first_air_date.split('-')[0]
            );
        }
        setRate(media.vote_average || media.mediaRate);
    }, [media, mediaType]);

    return (
        <Link
            to={
                mediaType !== 'people'
                    ? routesGen.mediaDetail(
                          mediaType,
                          media.mediaId || media.id
                      )
                    : routesGen.person(media.id)
            }
            className="group relative">
            <div
                style={{
                    backgroundImage: `url(${posterPath})`,
                }}
                className="pt-[160%] bg-cover bg-top bg-base-300"
            />
            {favoriteUtils.check({
                listFavorites,
                mediaId: media.id,
            }) && (
                <div className="absolute top-2 right-2 text-secondary">
                    <MdFavorite size={32} />
                </div>
            )}
            {/* Movie or tv Item */}
            {mediaType !== 'people' && (
                <div className="hidden group-hover:inline-flex flex-col gap-2 xl:gap-4 px-4 py-8 justify-end w-full min-h-fit h-full  absolute top-0 left-0 bg-gradient-to-t from-base-100">
                    <div className="w-full flex justify-center">
                        <div className="px-8 py-2 rounded-lg bg-secondary">
                            <BsPlayFill color="white" size={32} />
                        </div>
                    </div>
                    <CircularRate value={rate} />
                    <h1 className="font-semibold text-primary text-lg">
                        {releaseDate}
                    </h1>
                    <h1 className="font-bold text-primary text-lg truncate">
                        {title}
                    </h1>
                </div>
            )}
            {/* Movie or tv Item */}

            {/* People */}
            {mediaType === 'people' && (
                <div className="w-full h-max absolute bottom-0 p-[10px] bg-black/60">
                    <h1 className="text-white font-semibold">{media.name}</h1>
                </div>
            )}
            {/* People */}
        </Link>
    );
};

export default MediaItem;
