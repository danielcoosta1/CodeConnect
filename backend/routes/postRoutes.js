import express from 'express';
import { getAllPosts } from "../controllers/postController.js";

const router = express.Router();

// Rota para buscar/listar todos os posts
router.get('/', getAllPosts);

export default router;
