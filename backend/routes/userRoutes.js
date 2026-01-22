import express from "express";
import { atualizarPerfil } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rota PUT: localhost:51213/api/users/perfil
// O middleware garante que req.user exista dentro do controller
router.put("/perfil", authMiddleware, atualizarPerfil);

export default router;