import express from 'express';
import personController from '../controllers/personCTRL.js';

const router = express.Router();

router.get('/:personId/medias', personController.personMedias);
router.get('/:personId/detail', personController.personDetail);

export default router;
