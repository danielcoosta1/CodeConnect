import express from "express";

import { registerUser, loginUser, verifyEmailCode, forgotPassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/cadastro", registerUser);
router.post("/login", loginUser);
router.post("/verify-email", verifyEmailCode);
router.post("/esqueci-senha", forgotPassword);

export default router;
