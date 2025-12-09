import authController from '../controllers/auth-controller.js';
import express from 'express';

const router = express.Router();
//Auth Routes
router.post('/register', authController.signUp);
router.post('/login', authController.login);
router.delete('/logout', authController.logout);

export default router;
