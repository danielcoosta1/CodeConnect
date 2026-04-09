import prisma from "../lib/prisma.js";

// Criar um comentário para um post específico
export const createComment = async (req, res) => {
  try {
    const { postId } = req.params; // Pegamos o ID do post pela URL
    const { text, parentId } = req.body; // O texto que o usuário digitou e o ID do comentário pai (se for resposta)
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
        parentId: parentId || null, // Se for resposta a outro comentário, tem parentId. Se for comentário principal, é null
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
      // ---> SÓ TRAZ COMENTÁRIOS PRINCIPAIS (QUE NÃO TÊM PAI)
      where: { postId: postId, parentId: null },
      orderBy: { createdAt: "asc" },
      include: {
        author: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            usuario: true,
            imagem: true,
          },
        },
        // ---> TRAZ AS RESPOSTAS (THREADS) DE CADA COMENTÁRIO
        replies: {
          include: {
            author: {
              select: {
                id: true,
                nome: true,
                sobrenome: true,
                usuario: true,
                imagem: true,
              },
            },
          },
          orderBy: { createdAt: "asc" },
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

// Excluir comentário por ID

export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.params; // ID do comentário a ser excluído
    const userId = req.user.id; // ID do usuário logado (do AuthMiddleware)

    // Verifica se o comentário existe e pertence ao usuário
    const comment = await prisma.comment.findUnique({
      where: { id: id },
    });

    if (!comment) {
      return res.status(404).json({ error: "Comentário não encontrado." });
    }

    // Trava de segurança: só o autor do comentário pode excluir ou o dono do post pode excluir (opção para moderar comentários indesejados)
    if (comment.authorId !== userId) {
      // Verifica se o usuário é o dono do post
      const post = await prisma.post.findUnique({
        where: { id: comment.postId },
      });

      // Se o usuário não é nem o autor do comentário nem o dono do post, proíbe a ação
      if (!post || post.authorId !== userId) {
        return res.status(403).json({
          error: "Ação proibida. Você não pode excluir este comentário.",
        });
      }
    }

    await prisma.comment.deleteMany({
      where: { parentId: id },
    });

    // Se passou por tudo isso, pode excluir o comentário
    await prisma.comment.delete({
      where: { id: id },
    });

    return res
      .status(200)
      .json({ message: "Comentário excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir comentário:", error);
    return res
      .status(500)
      .json({ error: "Erro interno ao excluir comentário." });
  }
};

//Curtir ou descurtir um comentário (toggle)
export const toggleLikeComment = async (req, res) => {
  try {
    const { id } = req.params; // ID do comentário
    const userId = req.user.id; // Usuário que está curtindo

    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      return res.status(404).json({ error: "Comentário não encontrado." });
    }

    let updatedLikeIds = [...comment.likeIds];
    const hasLiked = updatedLikeIds.includes(userId);

    // Se já curtiu, remove o ID da lista. Se não curtiu, adiciona.
    if (hasLiked) {
      updatedLikeIds = updatedLikeIds.filter((likeId) => likeId !== userId);
    } else {
      updatedLikeIds.push(userId);
    }

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { likeIds: updatedLikeIds },
    });

    return res.status(200).json(updatedComment);
  } catch (error) {
    console.error("Erro ao curtir comentário:", error);
    return res
      .status(500)
      .json({ error: "Erro interno ao curtir comentário." });
  }
};

// Marcar ou desmarcar um comentário como a "Solução de Ouro"
export const toggleSolutionStatus = async (req, res) => {
  try {
    const { id } = req.params; // ID do comentário
    const userId = req.user.id;

    // Busca o comentário e já traz as informações do Post junto
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: { post: true }, // Precisamos do post para verificar se o usuário é o autor do post
    });

    if (!comment) {
      return res.status(404).json({ error: "Comentário não encontrado." });
    }

    // Trava de segurança: Verifica se quem clicou é realmente o dono do Post
    if (comment.post.authorId !== userId) {
      return res
        .status(403)
        .json({
          error: "Apenas o autor do post pode marcar a Solução de Ouro.",
        });
    }

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { isSolution: !comment.isSolution }, // Inverte o valor (se era true, vira false e vice-versa)
    });

    return res.status(200).json(updatedComment);
  } catch (error) {
    console.error("Erro ao marcar solução:", error);
    return res
      .status(500)
      .json({ error: "Erro interno ao atualizar comentário." });
  }
};
