import prisma from "../lib/prisma.js";

export const atualizarPerfil = async (req, res) => {
  try {
    // 1. Pegamos o ID de quem está logado (vem do token/middleware)
    const userId = req.user.id;

    // 2. Pegamos os dados que o front-end enviou
    const { nome, usuario, funcao, bio, imagem } = req.body;

    // 3. Atualizamos no Banco
    const userAtualizado = await prisma.user.update({
      where: { id: userId },
      data: {
        nome,
        nomeDeUsuario: usuario, // Lembra que no Schema é nomeDeUsuario?
        funcao,
        bio,
        imagem,
      },
      // Selecionamos o que queremos devolver para o front (não devolva a senha!)
      select: {
        id: true,
        nome: true,
        nomeDeUsuario: true,
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

    const { senha:_, ...userSemSenha } = user;

    return res.status(200).json(userSemSenha);
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    return res.status(500).json({ error: "Erro interno ao buscar perfil." });
  }
};
