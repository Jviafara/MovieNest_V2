import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import reviewApi from '../../api/modules/reviewApi';
import Container from './Container';
import LoadingButton from './LoadingButton';
import RemoveButton from './RemoveButton';
import TextAvatar from './TextAvatar';

const ReviewItem = ({ review, onRemoved }) => {
    const { user } = useSelector((state) => state.user);

    const [onRequest, setOnRequest] = useState(false);

    const onRemove = async () => {
        if (onRequest) return;
        setOnRequest(true);
        const { response, err } = await reviewApi.remove({
            reviewId: review.id,
        });

        if (err) toast.error(err.message);
        if (response) onRemoved(review.id);

        setOnRequest(false);
    };

    return (
        <div
            className={`p-2 relative ${
                onRequest ? 'opacity-60' : 'opacity-100'
            } `}>
            <div className="flex gap-4 items-center">
                {/* avatar */}
                <TextAvatar text={review.user.name} />
                {/* avatar */}

                <div className="flex flex-col flex-shrink-0 items-center justify-center gap-1 text-primary">
                    <h1 className="font-bold">{review.user.name}</h1>
                    <div>
                        <p>{dayjs(review.createdAt).format('DD-MM-YYYY')}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center flex-grow">
                    <p className="text-justify text-primary">
                        {review.content}
                    </p>

                    {user && user.id === review.user.id && (
                        <div className=" py-3 px-4 mx-4 flex-shrink-0 border border-secondary rounded-full">
                            <RemoveButton
                                loading={onRequest}
                                onRemove={onRemove}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const MediaReview = ({ reviews, media, mediaType }) => {
    const { user } = useSelector((state) => state.user);
    const [listReviews, setListReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [page, setPage] = useState(1);
    const [onRequest, setOnRequest] = useState(false);
    const [content, setContent] = useState('');
    const [reviewCount, setReviewCount] = useState(0);
    const [reviewsLoading, setReviewsLoading] = useState(false);

    const skip = 4;

    useEffect(() => {
        setListReviews([...reviews]);
        setFilteredReviews([...reviews].splice(0, skip));
        setReviewCount(reviews.length);
    }, [reviews]);

    const onAddReview = async () => {
        if (onRequest) return;
        setOnRequest(true);

        const body = {
            content,
            mediaId: media.id,
            mediaType,
            mediaTitle: media.title || media.name,
            mediaPoster: media.poster_path,
        };

        const { response, err } = await reviewApi.add(body);

        setOnRequest(false);

        if (err) toast.error(err.message);
        if (response) {
            toast.success('Post review success');

            setFilteredReviews([...filteredReviews, response]);
            setReviewCount(reviewCount + 1);
            setContent('');
        }
    };

    const onLoadMore = () => {
        setReviewsLoading(true);
        setFilteredReviews([
            ...filteredReviews,
            ...[...listReviews].splice(page * skip, skip),
        ]);
        setPage(page + 1);
        setReviewsLoading(false);
    };

    const onRemoved = (id) => {
        if (listReviews.findIndex((e) => e.id === id) !== -1) {
            const newListReviews = [...listReviews].filter((e) => e.id !== id);
            setListReviews(newListReviews);
            setFilteredReviews([...newListReviews].splice(0, page * skip));
        } else {
            setFilteredReviews([...filteredReviews].filter((e) => e.id !== id));
        }

        setReviewCount(reviewCount - 1);

        toast.success('Remove review success');
    };

    return (
        <>
            {mediaType === 'movie' ? (
                <div>
                    <Container header={`Reviews (${reviewCount})`}>
                        <div className="flex flex-col gap-4 mb-2">
                            {filteredReviews.map((item, index) =>
                                item.user ? (
                                    <div key={index}>
                                        <ReviewItem
                                            review={item}
                                            onRemoved={onRemoved}
                                        />
                                        <hr />
                                    </div>
                                ) : null
                            )}
                            {filteredReviews.length < listReviews.length && (
                                <LoadingButton
                                    loading={reviewsLoading}
                                    onLoadMore={onLoadMore}
                                />
                            )}
                        </div>
                        {user && (
                            <>
                                {filteredReviews.length <= 0 && <hr />}
                                <div className="flex gap-2 items-center">
                                    <TextAvatar text={user.name} />
                                    <div className="flex flex-col gap-2 flex-grow">
                                        <h1 className="font-bold">
                                            {user.displayName}
                                        </h1>
                                        <textarea
                                            value={content}
                                            placeholder="Write your review"
                                            rows={4}
                                            maxLength={400}
                                            onChange={(e) =>
                                                setContent(e.target.value)
                                            }
                                            className="border border-primary rounded-lg py-2 px-4 w-full bg-base-100"
                                        />
                                        {onRequest ? (
                                            <button className="w-1/5 flex items-center gap-2 px-4 py-2 bg-secondary text-white uppercase font-semibold text-lg rounded-md">
                                                <span className="loading loading-spinner text-white"></span>
                                                <h1>loading</h1>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={onAddReview}
                                                className="w-1/5 md:px-4 py-2 bg-secondary text-center text-white uppercase rounded-md">
                                                post
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </Container>
                </div>
            ) : null}
        </>
    );
};

export default MediaReview;
