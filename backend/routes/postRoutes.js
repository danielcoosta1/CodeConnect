import express from 'express';
import { createPost, getAllPosts, getMyPosts, getPostsByUserId } from "../controllers/postController.js";
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

// Rota para buscar/listar todos os posts
router.get('/', getAllPosts);

// Rota para criar um novo post
router.post('/', authMiddleware, createPost);

router.get("/me", authMiddleware, getMyPosts );

router.get("/user/:id", authMiddleware, getPostsByUserId );



export default router;
