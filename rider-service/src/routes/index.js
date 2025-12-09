import express from "express";
import authController from "#src/controllers/auth-controller.js";
const router = express.Router();

//Auth Routes
router.post("/register", authController.signUp);
router.post("/login", authController.login);
router.delete("/logout", authController.logout);

export default router;
