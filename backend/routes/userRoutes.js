import express from "express";
import {
  atualizarPerfil,
  buscarPerfil,
  buscarUsuarioPorId,
  toggleFollow,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rota PUT: localhost:51213/api/users/perfil
// O middleware garante que req.user exista dentro do controller
router.put("/perfil", authMiddleware, atualizarPerfil);
router.get("/me", authMiddleware, buscarPerfil);
router.get("/:id", authMiddleware, buscarUsuarioPorId);
router.post("/:id/follow", authMiddleware, toggleFollow);

export default router;
