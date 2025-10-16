import prisma from "../lib/prisma.js";

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
