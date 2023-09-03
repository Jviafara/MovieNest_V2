import React, { useEffect, useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import favoriteApi from '../api/modules/favoriteApi';
import Container from '../components/common/Container';
import LoadingButton from '../components/common/LoadingButton';
import MediaItem from '../components/common/MediaItem';
import { setGlobalLoading } from '../redux/features/globalLoadinSlice';
import { removeFavorite } from '../redux/features/userSlice';

const FavoriteItem = ({ media, onRemoved }) => {
    const dispatch = useDispatch();

    const [onRequest, setOnRequest] = useState(false);

    const onRemove = async () => {
        if (onRequest) return;
        setOnRequest(true);
        const { response, err } = await favoriteApi.remove({
            favoriteId: media.id,
        });
        setOnRequest(false);
        if (err) toast.error(err.message);
        if (response) {
            toast.success('Removed Succesfully');
            dispatch(removeFavorite({ mediaId: media.mediaId }));
            onRemoved(media.id);
        }
    };
    return (
        <div>
            <MediaItem media={media} mediaType={media.mediaType} />
            {onRequest ? (
                <button className="flex items-center mt-3 gap-2 w-full p-2 bg-secondary text-white uppercase font-semibold  rounded-md">
                    <span className="loading loading-spinner text-white"></span>
                    <h1>loading</h1>
                </button>
            ) : (
                <button
                    onClick={onRemove}
                    className="w-full mt-3 flex gap-2 justify-center items-center p-2 bg-secondary text-white uppercase font-semibold text-sm rounded-md">
                    <BsFillTrashFill size={16} />
                    <h1>Remove</h1>
                </button>
            )}
        </div>
    );
};

const FavoritesList = () => {
    const [medias, setMedias] = useState([]);
    const [filteredMedias, setFilteredMedias] = useState([]);
    const [page, setpage] = useState(1);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const skip = 8;

    useEffect(() => {
        const getFavorites = async () => {
            dispatch(setGlobalLoading(true));
            const { response, err } = await favoriteApi.getList();
            dispatch(setGlobalLoading(false));

            if (err) toast.error(err.message);
            if (response) {
                setCount(response.length);
                setMedias([...response]);
                setFilteredMedias([...response].splice(0, skip));
            }
        };
        getFavorites();
    }, [dispatch]);

    const onLoadMore = () => {
        setLoading(true);
        setFilteredMedias([
            ...filteredMedias,
            ...[...medias].splice(page * skip, skip),
        ]);
        setpage(page + 1);
        setLoading(false);
    };

    const onRemoved = (id) => {
        const newMedias = [...medias].filter((e) => e.id !== id);
        setMedias(newMedias);
        setFilteredMedias([...newMedias].splice(0, page * skip));
        setCount(count - 1);
    };

    console.log(filteredMedias);

    return (
        <div className="w-full min-h-screen max-w-[1366px] mx-auto p-12 my-10 flex flex-col gap-8">
            <Container header={`Your Favorites (${count})`}>
                <div className="grid grid-flow-row grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredMedias?.map((media, index) => (
                        <FavoriteItem
                            media={media}
                            onRemoved={onRemoved}
                            key={index}
                        />
                    ))}
                </div>
            </Container>

            {filteredMedias.length < medias.length && (
                <LoadingButton loading={loading} onLoadMore={onLoadMore} />
            )}
        </div>
    );
};

export default FavoritesList;
