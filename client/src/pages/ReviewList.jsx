import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import tmdbConfigs from '../api/config/tmdbConfigs';
import reviewApi from '../api/modules/reviewApi';
import Container from '../components/common/Container';
import LoadingButton from '../components/common/LoadingButton';
import RemoveButton from '../components/common/RemoveButton';
import { setGlobalLoading } from '../redux/features/globalLoadinSlice';
import { routesGen } from '../routes/routes';

const ReviewItem = ({ review, onRemoved }) => {
    const dispatch = useDispatch();

    const [onRequest, setOnRequest] = useState(false);

    const onRemove = async () => {
        if (onRequest) return;
        setOnRequest(true);
        const { response, err } = await reviewApi.remove({
            reviewId: review.id,
        });
        setOnRequest(false);
        if (err) toast.error(err.message);
        if (response) {
            toast.success('Removed Succesfully');
            onRemoved(review.id);
        }
    };

    return (
        <div
            className={`relative w-full flex flex-col md:flex-row gap-2 md:gap-0 justify-between ${
                onRequest ? 'opacity-60' : 'opacity-100'
            }`}>
            <div className="w-0 md:w-[15%]">
                <Link
                    to={routesGen.mediaDetail(
                        review.mediaType,
                        review.mediaId
                    )}>
                    <div
                        style={{
                            backgroundImage: `url(${tmdbConfigs.posterPath(
                                review.mediaPoster
                            )})`,
                        }}
                        className="pt-[160%] bg-cover bg-top bg-base-300"
                    />
                </Link>
            </div>
            <div className="w-full md:-[80%] md:px-[2rem] flex flex-col gap-2">
                <div className="flex flex-col md:flex-row items-center md:gap-2">
                    <Link
                        to={routesGen.mediaDetail(
                            review.mediaType,
                            review.mediaId
                        )}>
                        <h1 className="line-clamp-1 text-left text-lg font-semibold text-primary">
                            {review.mediaTitle}
                        </h1>
                    </Link>
                    <h1>
                        ( {dayjs(review.createdAt).format('DD/MM/YYYY HH:mm')} )
                    </h1>
                    <div className=" py-1 px-2 mx-4  border border-secondary rounded-full flex items-center">
                        <RemoveButton loading={onRequest} onRemove={onRemove} />
                    </div>
                </div>
                <h1 className="line-clamp-4 text-primary">{review.content}</h1>
            </div>
        </div>
    );
};

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const [filteredReviews, setFilteredReviewss] = useState([]);
    const [page, setpage] = useState(1);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const skip = 4;

    useEffect(() => {
        const getReviews = async () => {
            dispatch(setGlobalLoading(true));
            const { response, err } = await reviewApi.getList();
            dispatch(setGlobalLoading(false));

            if (err) toast.error(err.message);
            if (response) {
                setCount(response.length);
                setReviews([...response]);
                setFilteredReviewss([...response].splice(0, skip));
            }
        };
        getReviews();
    }, [dispatch]);

    const onLoadMore = () => {
        setLoading(true);
        setFilteredReviewss(
            [...filteredReviews],
            ...[...reviews].splice(page * skip, skip)
        );
        setpage(page + 1);
        setLoading(false);
    };

    const onRemoved = (id) => {
        const newReviews = [...reviews].filter((e) => e.id !== id);
        setReviews(newReviews);
        setFilteredReviewss([...newReviews].splice(0, page * skip));
        setCount(count - 1);
    };

    return (
        <div className="w-full min-h-screen max-w-[1366px] mx-auto p-12 my-10 flex flex-col gap-8">
            <div className="">
                <Container header={`Your Reviews (${count})`}>
                    <div className="flex flex-col gap-2">
                        {filteredReviews.map((item, index) => (
                            <div key={index}>
                                <ReviewItem
                                    review={item}
                                    onRemoved={onRemoved}
                                />
                                <hr className="my-2 border-primary" />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
            {filteredReviews.length < reviews.length && (
                <LoadingButton loading={loading} onLoadMore={onLoadMore} />
            )}
        </div>
    );
};

export default ReviewList;
