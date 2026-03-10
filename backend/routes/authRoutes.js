import express from "express";

import { registerUser, loginUser, verifyEmailCode } from "../controllers/authController.js";

const router = express.Router();

router.post("/cadastro", registerUser);
router.post("/login", loginUser);
router.post("/verify-email", verifyEmailCode);

export default router;
