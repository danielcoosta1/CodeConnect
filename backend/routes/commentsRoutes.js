import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createComment,
  deleteCommentById,
  getCommentsByPostId,
} from "../controllers/commentController.js";


const router = express.Router();

// Rota para criar um comentário em um post específico
router.post("/:postId/comments", authMiddleware, createComment);

// Rota para buscar os comentários de um post específico - todos podem ver os comentários, não precisa de autenticação
router.get("/:postId/comments", getCommentsByPostId);

router.delete("/:id/comments", authMiddleware, deleteCommentById);

export default router;