import express from 'express';
import { body } from 'express-validator';
import favoriteController from '../controllers/favoriteCTRL.js';
import userCotroller from '../controllers/userCTRL.js';
import requestHandler from '../handlers/requestHandler.js';
import tokenMiddleware from '../middlewares/tokenMiddleware.js';
import User from '../models/user.js';

const router = express.Router();

router.post(
    '/signup',
    body('name').exists().withMessage('Full Name is required'),
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email not valid')
        .custom(async (value) => {
            const user = await User.findOne({ email: value });
            if (user) throw new Error('User already exists');
        }),
    body('password')
        .exists()
        .withMessage('Password is required')
        .isLength({ min: 0 })
        .withMessage('Password minimun 8 characters'),
    body('confirmPassword')
        .exists()
        .withMessage('Confirm Password is required')
        .isLength({ min: 0 })
        .withMessage('Password minimun 8 characters')
        .custom((value, { req }) => {
            if (value !== req.body.password)
                throw new Error("Passwords don't match");
            return true;
        }),
    requestHandler.validate,
    userCotroller.signup
);

router.post(
    '/signin',
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email not valid'),
    body('password')
        .exists()
        .withMessage('Password is required')
        .isLength({ min: 0 })
        .withMessage('Password minimun 8 characters'),
    requestHandler.validate,
    userCotroller.signin
);

router.put(
    '/update-password',
    tokenMiddleware.auth,
    body('password')
        .exists()
        .withMessage('Password is required')
        .isLength({ min: 0 })
        .withMessage('Username minimun 8 characters'),
    body('newPassword')
        .exists()
        .withMessage('New Password is required')
        .isLength({ min: 0 })
        .withMessage('New Password minimun 8 characters'),
    body('confirmNewPassword')
        .exists()
        .withMessage('Confirm New Password is required')
        .isLength({ min: 0 })
        .withMessage('Confirm new Password minimun 8 characters')
        .custom((value, { req }) => {
            if (value !== req.body.newPassword)
                throw new Error("Passwords don't match");
            return true;
        }),
    requestHandler.validate,
    userCotroller.updatePassword
);

router.get('/info', tokenMiddleware.auth, userCotroller.getinfo);

router.get(
    '/favorites',
    tokenMiddleware.auth,
    favoriteController.getFavoritesUser
);

router.post(
    '/favorites',
    tokenMiddleware.auth,
    body('mediaType')
        .exists()
        .withMessage('Media type is required')
        .custom((type) => ['movie', 'tv'].includes(type))
        .withMessage('Media type is invalid'),
    body('mediaId')
        .exists()
        .withMessage('mediaId is required')
        .isLength({ min: 1 })
        .withMessage("mediaId can't be empty"),
    body('mediaTitle').exists().withMessage('Media title is required'),
    body('mediaPoster').exists().withMessage('Media poster is required'),
    body('mediaRate').exists().withMessage('Media rate is required'),
    requestHandler.validate,
    favoriteController.addFavorite
);

router.delete(
    '/favorites/:favoriteId',
    tokenMiddleware.auth,
    favoriteController.removeFavorite
);

export default router;
