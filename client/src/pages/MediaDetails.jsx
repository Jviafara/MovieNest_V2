import React, { useEffect, useRef, useState } from 'react';
import { BsPlayBtn } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import tmdbConfigs from '../api/config/tmdbConfigs';
import favoriteApi from '../api/modules/favoriteApi';
import mediaApi from '../api/modules/mediaApi';
import BackDropSlide from '../components/common/BackDropSlide';
import CastSlide from '../components/common/CastSlide';
import CircularRate from '../components/common/CircularRate';
import Container from '../components/common/Container';
import FavoriteButton from '../components/common/FavoriteButton';
import ImageHeader from '../components/common/ImageHeader';
import MediaReview from '../components/common/MediaReview';
import MediaSlide from '../components/common/MediaSlide';
import MediaVideosSlide from '../components/common/MediaVideosSlide';
import PosterSlide from '../components/common/PosterSlide';
import RecommendSlide from '../components/common/RecommendSlide';
import RedPills from '../components/common/RedPills';
import { setAuthModalOpen } from '../redux/features/authModalSlice';
import { setGlobalLoading } from '../redux/features/globalLoadinSlice';
import { addFavorite, removeFavorite } from '../redux/features/userSlice';
// import { routesGen } from '../routes/routes';

const MediaDetails = () => {
    window.scrollTo(0, 0);
    const { mediaType, mediaId } = useParams();
    const { user, listFavorites } = useSelector((state) => state.user);

    const [media, setMedia] = useState();
    const [isFavorite, setIsFavorite] = useState(false);
    const [onRequest, setOnRequest] = useState(false);
    const [genres, setGenres] = useState([]);

    const dispatch = useDispatch();
    const videoRef = useRef(null);

    useEffect(() => {
        const getMedia = async () => {
            dispatch(setGlobalLoading(true));
            const { response, err } = await mediaApi.getDetail({
                mediaType,
                mediaId,
            });
            dispatch(setGlobalLoading(false));
            if (response) {
                setMedia(response);
                setIsFavorite(response.isFavorite);
                setGenres(response.genres.splice(0, 2));
            }
            if (err) toast.error(err.message);
        };
        getMedia();
    }, [dispatch, mediaId, mediaType]);

    const onFavoriteClick = async () => {
        if (!user) return dispatch(setAuthModalOpen(true));
        if (isFavorite) {
            onRemoveFavorite();
            return;
        }

        setOnRequest(true);
        const body = {
            mediaId: media.id,
            mediaTitle: media.title || media.name,
            mediaType: mediaType,
            mediaPoster: media.poster_path,
            mediaRate: media.vote_average,
        };

        const { response, err } = await favoriteApi.add(body);

        setOnRequest(false);

        if (err) toast.error(err.message);
        if (response) {
            dispatch(addFavorite(response));
            setIsFavorite(true);
            toast.success(`${mediaType} added to favorites`);
        }
    };

    const onRemoveFavorite = async () => {
        if (onRequest) return;
        setOnRequest(true);

        const favorite = listFavorites.find(
            (e) => e,
            mediaId.toString() === media.id.toString()
        );

        const { response, err } = await favoriteApi.remove({
            favoriteId: favorite.id,
        });
        setOnRequest(false);

        if (err) toast.error(err.message);
        if (response) {
            dispatch(removeFavorite(response));
            setIsFavorite(false);
            toast.success(`${mediaType} remove from favorites`);
        }
    };

    return media ? (
        <div className="w-full h-full min-h-screen last:mb-16">
            <ImageHeader
                imgPath={tmdbConfigs.backdropPath(
                    media.backdrop_path || media.poster_path
                )}
            />
            <div className="relative  flex flex-col gap-16 w-full max-w-[1366px] p-2 m-auto">
                {/* Media Content */}
                <div className="mt-[-5rem] md:mt-[-10rem] lg:mt-[-15rem] xl:mt-[-20rem]">
                    <div className="flex flex-col md:flex-row items-center md:items-start  lg:mx-auto ">
                        {/* Poster */}
                        <div className="w-[70%] sm:w-[50%] md:w-[40%] mt-0 mb-[2rem] md:my-0 md:ml-[2rem]">
                            <div
                                style={{
                                    backgroundImage: `url(${tmdbConfigs.backdropPath(
                                        tmdbConfigs.posterPath(
                                            media.poster_path ||
                                                media.backdrop_path
                                        )
                                    )})`,
                                }}
                                className="pt-[140%] bg-cover bg-top"
                            />
                        </div>
                        {/* Poster */}
                        {/* Media Info */}
                        <div className="mt-[2rem] md:mt-0 w-full md:w-[60%] text-primary">
                            <div className="flex flex-col gap-8 px-8">
                                {/* Title */}
                                <h1 className="text-[2rem] md:text-[3rem] lg:text-[4rem] font-bold">{`${
                                    media.title || media.name
                                } - ${
                                    mediaType === tmdbConfigs.mediaType.movie
                                        ? media.release_date.split('-')[0]
                                        : media.first_air_date.split('-')[0]
                                }`}</h1>

                                {/* Title */}
                                {/* Rate and Genres */}
                                <div className="flex gap-4 items-center">
                                    {/*Rate */}
                                    <CircularRate
                                        value={
                                            media.vote_average ||
                                            media.mediaRate
                                        }
                                    />
                                    {/*Rate */}
                                    {/* Genres */}
                                    <div className="flex gap-2">
                                        {genres.map((genre, index) => (
                                            <RedPills
                                                key={index}
                                                item={genre.name}
                                            />
                                        ))}
                                    </div>
                                    {/* Genres */}
                                </div>
                                {/* Rate and Genres */}
                                {/* overview */}
                                <div className="text-primary">
                                    <p>{media.overview}</p>
                                </div>
                                {/* overview */}

                                {/* Buttons */}
                                <div className="flex gap-12 items-center">
                                    <FavoriteButton
                                        loading={onRequest}
                                        onFavoriteClick={onFavoriteClick}
                                        isFavorite={isFavorite}
                                    />
                                    {/* watch now */}
                                    <div className="px-4 py-2 text-xl font-semibold text-white bg-secondary w-fit rounded-lg">
                                        <button
                                            onClick={() =>
                                                videoRef.current.scrollIntoView()
                                            }
                                            className="flex gap-3">
                                            <BsPlayBtn size={28} /> Watch Now
                                        </button>
                                    </div>
                                    {/* watch now */}
                                </div>
                                {/* Buttons */}

                                {/* Cast */}
                                <Container header="Cast">
                                    <CastSlide cast={media.credits.cast} />
                                </Container>
                                {/* Cast */}
                            </div>
                        </div>
                        {/* Media Info */}
                    </div>
                </div>
                {/* Media Content */}

                {/* Media Video */}
                <div ref={videoRef} style={{ paddingTop: '2rem' }}>
                    <Container header="Videos">
                        <MediaVideosSlide
                            videos={[...media.videos.results].splice(0, 5)}
                        />
                    </Container>
                </div>
                {/* Media Video */}

                {/* Media Backdrops */}
                {media.images.backdrops.length > 0 && (
                    <Container header={'backdrops'}>
                        <BackDropSlide backdrops={media.images.backdrops} />
                    </Container>
                )}
                {/* Media Backdrops */}

                {/* Media Posters */}
                {media.images.posters.length > 0 && (
                    <Container header={'posters'}>
                        <PosterSlide posters={media.images.posters} />
                    </Container>
                )}
                {/* Media Posters */}

                {/* Media Reviews */}
                <MediaReview
                    reviews={media.reviews}
                    media={media}
                    mediaType={mediaType}
                />
                {/* Media Reviews */}

                {/* Media Recommendations */}
                {media.recommend.results.length > 0 && (
                    <Container header={'recommendations'}>
                        <RecommendSlide
                            medias={media.recommend.results}
                            mediaType={mediaType}
                        />
                    </Container>
                )}
                {media.recommend.results.length === 0 && (
                    <MediaSlide
                        mediaType={mediaType}
                        mediaCategory={tmdbConfigs.mediaCategory.top_rated}
                    />
                )}
                {/* Media Recommendations */}
            </div>
        </div>
    ) : null;
};

export default MediaDetails;
