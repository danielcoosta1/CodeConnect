import prisma from "../lib/prisma.js";

export const atualizarPerfil = async (req, res) => {
  try {
    const userId = req.user.id;
    const { nome, sobrenome, usuario, funcao, bio, imagem } = req.body;

    // --- BLOCO DE SEGURANÇA: Verificar se o @usuario já existe ---

    if (usuario) {
      // Buscamos se existe ALGUÉM com esse nome
      const usuarioExistente = await prisma.user.findFirst({
        where: {
          usuario: usuario, // O nome que a pessoa quer usar
          id: { not: userId }, // IMPORTANTE: Exclui a si mesmo da busca
        },
      });

      // Se encontrou alguém (que não sou eu), bloqueia!
      if (usuarioExistente) {
        return res
          .status(400)
          .json({ error: "Este nome de usuário já está em uso." });
      }
    }

    // --- FIM DO BLOCO DE SEGURANÇA ---

    // 3. Atualizamos no Banco
    const userAtualizado = await prisma.user.update({
      where: { id: userId },
      data: {
        nome,
        sobrenome,
        usuario,
        funcao,
        bio,
        imagem,
      },
      select: {
        id: true,
        nome: true,
        sobrenome: true,
        usuario: true,
        funcao: true,
        bio: true,
        imagem: true,
        email: true,
      },
    });

    return res.status(200).json(userAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    return res.status(500).json({ error: "Erro interno ao atualizar perfil." });
  }
};
export const buscarPerfil = async (req, res) => {
  try {
    // Pegamos o ID de quem está logado (vem do token/middleware)
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const { senha: _, ...userSemSenha } = user;

    return res.status(200).json(userSemSenha);
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    return res.status(500).json({ error: "Erro interno ao buscar perfil." });
  }
};

export const buscarUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params; // Pega o ID da URL

    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        nome: true,
        sobrenome: true,
        usuario: true,
        funcao: true,
        bio: true,
        imagem: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário por ID:", error);
    return res.status(500).json({ error: "Erro interno ao buscar usuário." });
  }
};


