import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import tmdbConfigs from '../../api/config/tmdbConfigs';
import personApi from '../../api/modules/personApi';
import LoadingButton from './LoadingButton';
import MediaItem from './MediaItem';

const PersonMediaGrid = ({ personId }) => {
    const [medias, setMedias] = useState([]);
    const [filteredMedias, setFilteredMedias] = useState([]);
    const [page, setPage] = useState(1);
    const skip = 8;

    useEffect(() => {
        const getMedias = async () => {
            const { response, err } = await personApi.medias({ personId });

            if (err) toast.error(err.message);
            if (response) {
                const mediaSorted = response.cast.sort(
                    (a, b) => getReleaseDate(b) - getReleaseDate(a)
                );
                setMedias(response.cast);
                setFilteredMedias([...mediaSorted].splice(0, skip));
            }
        };
        getMedias();
    }, [personId]);

    const getReleaseDate = (media) => {
        const date =
            media.media_type === tmdbConfigs.mediaType.movie
                ? new Date(media.release_date)
                : new Date(media.first_air_date);
        return date;
    };

    const onLoadMore = () => {
        setFilteredMedias([
            ...filteredMedias,
            ...[...medias].splice(page * skip, skip),
        ]);
        setPage(page + 1);
    };

    return (
        <>
            <div className="grid grid-flow-row grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredMedias.map((media, index) => (
                    <MediaItem
                        key={index}
                        media={media}
                        mediaType={media.media_type}
                    />
                ))}
            </div>
            {filteredMedias.length < medias.length && (
                <LoadingButton onLoadMore={onLoadMore} />
            )}
        </>
    );
};

export default PersonMediaGrid;
