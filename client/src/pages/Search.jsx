import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import mediaApi from '../api/modules/mediaApi';
import LoadingButton from '../components/common/LoadingButton';
import MediaGrid from '../components/common/MediaGrid';

const mediaTypes = ['movie', 'tv', 'people'];
let timer;
const timeout = 1000;

const Search = () => {
    const [query, setQuery] = useState('');
    const [onSearch, setOnSearch] = useState(false);
    const [mediaType, setMediaType] = useState(mediaTypes[0]);
    const [medias, setMedias] = useState([]);
    const [page, setPage] = useState(1);

    const search = useCallback(async () => {
        setOnSearch(true);

        const { response, err } = await mediaApi.search({
            mediaType,
            query,
            page,
        });

        setOnSearch(false);
        if (err) toast.error(err.message);
        if (response) {
            if (page > 1) setMedias((m) => [...m, ...response.results]);
            else setMedias(response.results);
        }
    }, [mediaType, query, page]);

    useEffect(() => {
        if (query.trim().length === 0) {
            setMedias([]);
            setPage(1);
        } else search();
    }, [search, query]);

    useEffect(() => {
        setMedias([]);
        setPage(1);
    }, [mediaType]);

    const onCategoryChange = (selectedCategory) =>
        setMediaType(selectedCategory);

    const onQueryChange = (e) => {
        const newQuery = e.target.value;
        clearTimeout(timer);

        timer = setTimeout(() => {
            setQuery(newQuery);
        }, timeout);
    };

    return (
        <div className="w-full min-h-screen pt-32 flex flex-col gap-8">
            <div className="w-full flex justify-center gap-6">
                {mediaTypes.map((item, index) => (
                    <button
                        onClick={() => onCategoryChange(item)}
                        className={`uppercase text-xl font-semibold ${
                            mediaType === item
                                ? 'text-white bg-secondary py-1 px-4 rounded-lg'
                                : 'text-primary'
                        }`}
                        key={index}>
                        {item}
                    </button>
                ))}
            </div>
            <div className="w-[75vw] mx-auto">
                <input
                    type="text"
                    name="search"
                    placeholder="Search MovieNest"
                    on
                    onChange={onQueryChange}
                    className="w-full h-14 border-2 rounded-md placeholder:text-primary placeholder:font-light border-primary bg-base-100 text-lg font-semibold text-primary px-4 capitalize"
                />
            </div>
            <div className="w-[70vw] mx-auto">
                <MediaGrid medias={medias} mediaType={mediaType} />
            </div>

            {medias.length > 0 && (
                <LoadingButton
                    loading={onSearch}
                    onLoadMore={() => setPage(page + 1)}
                />
            )}
        </div>
    );
};

export default Search;
