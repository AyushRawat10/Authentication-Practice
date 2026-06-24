import { Router } from "express";
import {
  emailVerification,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendEmailVerification,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/verify-email/:verificationToken").get(emailVerification);
router.route("/resend-email-verification").post(verifyJWT, resendEmailVerification);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
