import express from 'express';
import { createPost, getAllPosts } from "../controllers/postController.js";
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

// Rota para buscar/listar todos os posts
router.get('/', getAllPosts);

// Rota para criar um novo post
router.post('/', authMiddleware, createPost);


export default router;
