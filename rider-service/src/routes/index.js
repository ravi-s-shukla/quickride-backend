import express from "express";
import authController from "#src/controllers/auth-controller.js";
import { auth } from "../../middleware/auth.js";
const router = express.Router();

//Auth Routes
router.post("/register", authController.signUp);
router.post("/login", authController.login);
router.post("/logout",auth, authController.logout);
router.get("/me", auth, authController.details);

export default router;
