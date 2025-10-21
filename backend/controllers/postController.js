import prisma from "../lib/prisma.js";
import { z } from "zod";

// Rota para buscar/listar todos os posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Rota para criar um novo post
export const createPost = async (req, res) => {
  const postSchema = z.object({
    title: z.string().min(1, { message: "O título é obrigatório." }),
    content: z.string().min(1, { message: "O conteúdo é obrigatório." }),
  });

  const validation = postSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error });
  }

  const { title, content } = validation.data;
  const authorId = req.user.id;
  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        // --- Adicione valores padrão temporários ---
        imageUrl: "placeholder.jpg", // Ou qualquer string temporária
        imageFileName: "placeholder", // Ou qualquer string temporária
        tags: [], // Um array vazio como padrão para as tags
        // ------------------------------------------
        author: {
          connect: {
            id: authorId,
          },
        },
        // createdAt é gerado automaticamente pelo @default(now())
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
