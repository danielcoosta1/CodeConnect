import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getMyPosts,
  getPostById,
  getPostsByUserId,
  updatePost,
} from "../controllers/postController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

// Rota para buscar/listar todos os posts
router.get("/", getAllPosts);

// Rota para criar um novo post
router.post("/", authMiddleware, createPost);

router.get("/me", authMiddleware, getMyPosts);

router.get("/user/:id", authMiddleware, getPostsByUserId);

router.get("/:id", authMiddleware, getPostById);

router.delete("/:id", authMiddleware, deletePost);

router.put("/:id", authMiddleware, updatePost);

export default router;
