import { auth } from '../../middleware/auth.js';
import authController from '../controllers/auth-controller.js';
import express from 'express';

const router = express.Router();
//Auth Routes
router.post('/register', authController.signUp);
router.post('/login', authController.login);
router.post('/logout', auth, authController.logout); //mdelete method is used when you want to delete a resource or somehtink from server side
router.get('/me', auth , authController.details);

export default router;
