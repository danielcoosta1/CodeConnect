import express from "express";

import {
  registerUser,
  loginUser,
  verifyEmailCode,
  forgotPassword,
  resetPassword,
  googleLogin,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/cadastro", registerUser);
router.post("/login", loginUser);
router.post("/google", googleLogin);

router.post("/verify-email", verifyEmailCode);
router.post("/esqueci-senha", forgotPassword);
router.post("/redefinir-senha", resetPassword);

export default router;
