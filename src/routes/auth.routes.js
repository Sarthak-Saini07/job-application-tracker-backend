import express from "express";
import { register, login,getMe,verifyOTP, resendOTP } from "../controllers/auth.controller.js";
// import { protect } from "../middlewares/auth.Middleware.js";
import {protect} from "../middlewares/auth.middleware.js";
const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 * @access  Public
 */
router.post("/register", register);
router.get("/me", protect, getMe);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post("/login", login);

export default router;