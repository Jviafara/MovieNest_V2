import privateClient from '../client/privateClient';

const reviewEndpoints = {
    list: 'reviews',
    add: 'reviews',
    remove: ({ reviewId }) => `reviews/${reviewId}`,
};

const reviewApi = {
    getList: async () => {
        try {
            const response = await privateClient.get(reviewEndpoints.list);
            return { response };
        } catch (err) {
            return { err };
        }
    },
    add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, content }) => {
        try {
            const response = await privateClient.post(reviewEndpoints.add, {
                mediaId,
                mediaType,
                mediaTitle,
                mediaPoster,
                content,
            });
            return { response };
        } catch (err) {
            return { err };
        }
    },
    remove: async ({ reviewId }) => {
        try {
            const response = await privateClient.delete(
                reviewEndpoints.remove({ reviewId })
            );
            return { response };
        } catch (err) {
            return { err };
        }
    },
};

export default reviewApi;
