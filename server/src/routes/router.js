import express from 'express';
import mediaRoute from './mediaRoute.js';
import personRoute from './personRoute.js';
import reviewRoute from './reviewRoute.js';
import userRoute from './userRoute.js';

const router = express.Router();

router.use('/user', userRoute);
router.use('/:mediaType', mediaRoute);
router.use('/person', personRoute);
router.use('/reviews', reviewRoute);

export default router;
