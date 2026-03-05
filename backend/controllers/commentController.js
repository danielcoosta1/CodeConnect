import prisma from "../lib/prisma.js";

// Criar um comentário para um post específico
export const createComment = async (req, res) => {
  try {
    const { postId } = req.params; // Pegamos o ID do post pela URL
    const { text } = req.body; // O texto que o usuário digitou
    const authorId = req.user.id; // O ID do usuário logado (Vem do AuthMiddleware)

    //Validação básica

    if (!text || text.trim() === "") {
      return res
        .status(400)
        .json({ error: "O conteúdo do comentário não pode ser vazio." });
    }

    // Cria o comentário e já devolve ele populado com os dados do autor!
    const newComment = await prisma.comment.create({
      data: {
        text,
        postId,
        authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            usuario: true,
            imagem: true, // Precisamos da imagem para renderizar o Avatar no Front!
          },
        },
      },
    });

    return res.status(201).json(newComment);
  } catch (error) {
    console.error("Erro ao criar comentário:", error);
    return res.status(500).json({ error: "Erro interno ao criar comentário." });
  }
};

// Buscar os comentários de um post específico
export const getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await prisma.comment.findMany({
      where: { postId: postId }, // Filtra só os comentários daquele post específico
      orderBy: { createdAt: "asc" }, // Ordena do mais antigo para o mais novo
      include: {
        author: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            usuario: true,
            imagem: true, // Precisamos da imagem para renderizar o Avatar no Front!
          },
        },
      },
    });

    return res.status(200).json(comments);
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);
    return res
      .status(500)
      .json({ error: "Erro interno ao buscar comentários." });
  }
};
