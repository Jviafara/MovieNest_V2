import responseHandler from '../handlers/responseHandler.js';
import favoriteModel from '../models/favorite.js';

const addFavorite = async (req, res) => {
    try {
        const isFavorite = await favoriteModel.findOne({
            user: req.user.id,
            mediaId: req.body.mediaId,
        });
        if (isFavorite) return responseHandler.ok(res, isFavorite);

        const favorite = new favoriteModel({
            ...req.body,
            user: req.user.id,
        });

        await favorite.save();

        responseHandler.created(res, favorite);
    } catch {
        responseHandler.error(res);
    }
};

const removeFavorite = async (req, res) => {
    try {
        const { favoriteId } = req.params;
        const favorite = await favoriteModel.findOne({
            _id: favoriteId,
            user: req.user.id,
        });
        if (!favorite) return responseHandler.notFound(res);

        await favoriteModel.findByIdAndDelete(favoriteId);

        responseHandler.ok(res);
    } catch {
        responseHandler.error(res);
    }
};

const getFavoritesUser = async (req, res) => {
    try {
        const favorites = await favoriteModel
            .find({
                user: req.user.id,
            })
            .sort('-createdAt');

        responseHandler.ok(res, favorites);
    } catch {
        responseHandler.error(res);
    }
};

export default { addFavorite, removeFavorite, getFavoritesUser };
