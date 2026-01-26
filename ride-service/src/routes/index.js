import express from 'express';
import RideController from '../controllers/index.js';
import { auth } from '../../middleware/auth.js';

const router = express.Router();

router.post('/route', auth ,RideController.getRouteInformation);
router.post('/quote', auth, RideController.getRidesFair);

export default router;