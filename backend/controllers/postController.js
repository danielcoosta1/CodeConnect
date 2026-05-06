import prisma from "../lib/prisma.js";
import { z } from "zod";

const selectColaboradoresPadrao = {
  select: {
    id: true,
    nome: true,
    sobrenome: true,
    usuario: true,
    imagem: true,
    funcao: true,
  },
};

// Rota para buscar/listar todos os posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            usuario: true,
            imagem: true,
            funcao: true,
          },
        },
        comments: true,
        collaborators: selectColaboradoresPadrao,
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
    type: z.enum(["PROJECT", "QUESTION"]).optional().default("PROJECT"),
    title: z
      .string()
      .min(3, { message: "O título precisa ter pelo menos 3 caracteres." }),
    content: z
      .string()
      .min(10, { message: "O conteúdo precisa ter pelo menos 10 caracteres." }),
    codeContent: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
    imageFileName: z.string().optional().nullable(),
    tags: z
      .array(z.string())
      .max(4, { message: "No máximo 4 tags." })
      .optional()
      .default([]),
    projectUrl: z.string().url().optional().nullable(),
    repoUrl: z.string().url().optional().nullable(),
    collaboratorIds: z.array(z.string()).optional().default([]),
  });

  const validation = postSchema.safeParse(req.body);
  if (!validation.success)
    return res.status(400).json({ error: validation.error.issues[0].message });

  const {
    type,
    title,
    content,
    codeContent,
    image,
    imageFileName,
    tags,
    projectUrl,
    repoUrl,
    collaboratorIds,
  } = validation.data;

  const authorId = req.user.id;

  try {
    const newPost = await prisma.post.create({
      data: {
        type,
        title,
        content,
        codeContent,
        image,
        imageFileName,
        tags,
        projectUrl,
        repoUrl,
        author: { connect: { id: authorId } },

        ...(collaboratorIds.length > 0 && {
          collaborators: {
            connect: collaboratorIds.map((id) => ({ id })),
          },
        }),
      },
      include: {
        author: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            usuario: true,
            imagem: true,
            funcao: true,
          },
        },
        comments: true,
        collaborators: selectColaboradoresPadrao,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Busca os posts do usuário logado
export const getMyPosts = async (req, res) => {
  try {
    const meuId = req.user.id;

    const meusPosts = await prisma.post.findMany({
      where: {
        OR: [{ authorId: meuId }, { collaboratorIds: { has: meuId } }], // has verifica se o ID do usuário está presente no array de colaboradores
      },
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            usuario: true,
            imagem: true,
            funcao: true,
          },
        },
        comments: true,
        collaborators: selectColaboradoresPadrao,
      },
    });

    res.status(200).json(meusPosts);
  } catch (error) {
    console.error("Erro ao buscar meus posts:", error);
    res.status(500).json({ error: "Erro ao buscar seus posts." });
  }
};

// Busca todos os posts de um usuário específico
export const getPostsByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findMany({
      where: {
        OR: [{ authorId: id }, { collaboratorIds: { has: id } }], // has verifica se o ID do usuário está presente no array de colaboradores
      },
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            usuario: true,
            imagem: true,
            funcao: true,
          },
        },
        comments: true,
        collaborators: selectColaboradoresPadrao,
      },
    });
    return res.status(200).json(post);
  } catch (error) {
    console.error("Erro ao buscar post por ID:", error);
    return res.status(500).json({ error: "Erro interno ao buscar post." });
  }
};

// Busca um post específico pelo ID
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id: id },
      include: {
        author: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            usuario: true,
            imagem: true,
            funcao: true,
          },
        },
        comments: true,
        collaborators: selectColaboradoresPadrao,
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Projeto não encontrado." });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error("Erro ao buscar projeto por ID:", error);
    return res.status(500).json({ error: "Erro interno ao buscar projeto." });
  }
};

// Excluir um post (Apenas o autor pode fazer isso)
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await prisma.post.findUnique({
      where: { id: id },
    });

    if (!post) {
      return res.status(404).json({ error: "Projeto não encontrado." });
    }

    // Apenas o DONO original pode excluir o post inteiro.
    if (post.authorId !== userId) {
      return res.status(403).json({
        error: "Acesso negado. Você só pode excluir seus próprios projetos.",
      });
    }

    await prisma.post.delete({
      where: { id: id },
    });

    return res.status(200).json({ message: "Projeto excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir o projeto:", error);
    return res.status(500).json({ error: "Erro interno ao excluir projeto." });
  }
};

// Rota para atualizar um post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const {
      type,
      title,
      content,
      codeContent,
      tags,
      image,
      projectUrl,
      repoUrl,
      collaboratorIds,
    } = req.body;

    const post = await prisma.post.findUnique({
      where: { id: id },
    });

    if (!post) {
      return res.status(404).json({ error: "Publicação não encontrada." });
    }

    if (post.authorId !== userId) {
      return res.status(403).json({
        error: "Acesso negado. Você só pode editar suas próprias publicações.",
      });
    }

    const updatedPost = await prisma.post.update({
      where: { id: id },
      data: {
        type: type || post.type,
        title: title || post.title,
        content: content || post.content,
        codeContent: codeContent || post.codeContent,
        tags: tags || post.tags,
        image: image !== undefined ? image : post.image,
        projectUrl: projectUrl !== undefined ? projectUrl : post.projectUrl,
        repoUrl: repoUrl !== undefined ? repoUrl : post.repoUrl,

        ...(collaboratorIds !== undefined && {
          collaborators: {
            set: collaboratorIds.map((id) => ({ id })),
          },
        }),
      },
      include: {
        author: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            usuario: true,
            imagem: true,
            funcao: true,
          },
        },
        comments: true,
        collaborators: selectColaboradoresPadrao,
      },
    });

    return res.status(200).json({
      message: "Publicação atualizada com sucesso.",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Erro ao atualizar a publicação:", error);
    return res
      .status(500)
      .json({ error: "Erro interno ao atualizar a publicação." });
  }
};

// Alternar Curtida no Post (Like / Unlike)
export const toggleLikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return res.status(404).json({ error: "Projeto não encontrado." });
    }

    const hasLiked = post.likeIds.includes(userId);

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        likeIds: hasLiked
          ? { set: post.likeIds.filter((likerId) => likerId !== userId) }
          : { push: userId },
      },
      include: {
        author: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            usuario: true,
            imagem: true,
            funcao: true,
          },
        },
        comments: true,
        collaborators: selectColaboradoresPadrao,
      },
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Erro ao curtir projeto:", error);
    res.status(500).json({ error: "Erro interno ao processar curtida." });
  }
};

// Incrementar Compartilhamentos do Post
export const sharePost = async (req, res) => {
  try {
    const { id } = req.params;

    const postAtual = await prisma.post.findUnique({
      where: { id },
      select: { shares: true },
    });

    if (!postAtual) {
      return res.status(404).json({ error: "Projeto não encontrado." });
    }

    const novosShares = (postAtual.shares || 0) + 1;

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        shares: novosShares,
      },
      include: {
        author: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            usuario: true,
            imagem: true,
            funcao: true,
          },
        },
        comments: true,
        collaborators: selectColaboradoresPadrao, 
      },
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Erro ao compartilhar projeto:", error);
    res
      .status(500)
      .json({ error: "Erro interno ao computar compartilhamento." });
  }
};
