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
    title: z
      .string()
      .min(3, { message: "O título precisa ter pelo menos 3 caracteres." }),
    content: z
      .string()
      .min(10, { message: "O conteúdo precisa ter pelo menos 10 caracteres." }),
    // Adicionando validação para os novos campos (opcionais, como no schema)
    image: z.string().optional().nullable(),
    imageFileName: z.string().optional().nullable(),
    tags: z
      .array(z.string())
      .max(4, { message: "Você pode adicionar no máximo 4 tags." })
      .optional()
      .default([]), // Permite array vazio
  });

  const validation = postSchema.safeParse(req.body);
  if (!validation.success) {
    // Ajuste o tratamento de erro se necessário para mostrar múltiplos erros
    return res.status(400).json({ error: validation.error.issues[0].message }); //sempre o primeiro [0]
  }
  const { title, content, image, imageFileName, tags } = validation.data;
  const authorId = req.user.id; // Vem do authMiddleware(JWT)
  try {
    const newPost = await prisma.post.create({
      data: {
        title, // Vem do Zod
        content, // Vem do Zod
        image, // Vem do Zod (será null se não enviado)
        imageFileName, // Vem do Zod (será null se não enviado)
        tags, // Vem do Zod (será [] se não enviado)
        author: {
          connect: { id: authorId },
        },
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
