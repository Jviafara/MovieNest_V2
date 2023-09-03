import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import tmdbConfigs from '../api/config/tmdbConfigs';
import mediaApi from '../api/modules/mediaApi';
import HeroSlide from '../components/common/HeroSlide';
import LoadingButton from '../components/common/LoadingButton';
import MediaGrid from '../components/common/MediaGrid';
import { setAppState } from '../redux/features/appStateSlice';
import { setGlobalLoading } from '../redux/features/globalLoadinSlice';

const MediaList = () => {
    const { mediaType } = useParams();

    const [medias, setMedias] = useState([]);
    const [mediaLoading, setMediaLoading] = useState(false);
    const [currCategory, setCurrCategory] = useState(0);
    const [currPage, setCurrPage] = useState(1);

    const dispatch = useDispatch();

    const mediaCategories = useMemo(() => ['popular', 'top_rated'], []);
    const category = ['popular', 'top rated'];

    useEffect(() => {
        dispatch(setAppState(mediaType));
        window.scrollTo(0, 0);
    }, [mediaType, dispatch]);

    useEffect(() => {
        const getMedias = async () => {
            if (currPage === 1) dispatch(setGlobalLoading(true));
            setMediaLoading(true);

            const { response, err } = await mediaApi.getList({
                mediaType,
                mediaCategory: mediaCategories[currCategory],
                page: currPage,
            });

            setMediaLoading(false);
            dispatch(setGlobalLoading(false));

            if (err) toast.error(err.message);
            if (response) {
                if (currPage !== 1)
                    setMedias((m) => [...m, ...response.results]);
                else setMedias([...response.results]);
            }
        };

        getMedias();
    }, [mediaType, currCategory, currPage, mediaCategories, dispatch]);

    const onCategoryChange = (categoryIndex) => {
        if (currCategory === categoryIndex) return;
        setMedias([]);
        setCurrPage(1);
        setCurrCategory(categoryIndex);
    };

    const onLoadMore = () => setCurrPage(currPage + 1);

    return (
        <div className="w-full h-full min-h-screen flex flex-col gap-8 last:mb-16">
            <HeroSlide
                mediaType={mediaType}
                mediaCategory={tmdbConfigs.mediaCategory.popular}
            />
            <div className="text-primary text-lg font-bold uppercase flex justify-between w-[70vw] mx-auto">
                <h1 className="text-xl">
                    {mediaType === tmdbConfigs.mediaType.movie
                        ? 'Movies'
                        : 'TV Series'}
                </h1>
                <div className="flex gap-2">
                    {category.map((cate, index) => (
                        <button
                            onClick={() => onCategoryChange(index)}
                            className={`uppercase ${
                                currCategory === index
                                    ? 'text-white bg-secondary py-1 px-2 rounded'
                                    : 'text-primary'
                            }`}
                            key={index}>
                            {cate}
                        </button>
                    ))}
                </div>
            </div>
            <div className="w-[70vw] mx-auto">
                <MediaGrid medias={medias} mediaType={mediaType} />
            </div>
            <LoadingButton loading={mediaLoading} onLoadMore={onLoadMore} />
        </div>
    );
};

export default MediaList;
