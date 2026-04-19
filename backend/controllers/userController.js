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
    const { id } = req.params;

    // 1. Tira o 'select'. O Prisma traz o documento inteiro, com todos os arrays!
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // 2. A MÁGICA: Extraímos a 'senha' para o buraco negro (_),
    // e o Resto (...userPublico) guarda tudo que sobrou (nome, bio, followingIds, etc).
    const { senha: _, ...userPublico } = user;

    // 3. Enviamos o objeto limpo, sem a senha!
    return res.status(200).json(userPublico);
  } catch (error) {
    console.error("Erro ao buscar usuário por ID:", error);
    return res.status(500).json({ error: "Erro interno ao buscar usuário." });
  }
};

// Seguir ou Deixar de Seguir um usuário (Toggle)
export const toggleFollow = async (req, res) => {
  try {
    const targetUserId = req.params.id; // ID do perfil que está na tela (quem vai ser seguido)
    const loggedUserId = req.user.id; // ID de quem clicou no botão (você) // Vem do token e do middleware de autenticação

    // Regra de Ouro: Você não pode seguir a si mesmo!
    if (targetUserId === loggedUserId) {
      return res
        .status(400)
        .json({ error: "Você não pode seguir a si mesmo." });
    }

    // 1. Busca o usuário alvo para ter certeza de que ele existe
    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
    });

    if (!targetUser) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // 2. OTIMIZAÇÃO MONGODB: Pega só a lista de IDs de quem o usuário logado segue
    const currentUser = await prisma.user.findUnique({
      where: { id: loggedUserId },
      select: { followingIds: true }, // Só pega a lista de IDs que o usuário logado segue
    });

    // Checa se o ID do alvo está dentro do Array de strings
    const isFollowing = currentUser.followingIds.includes(targetUserId); // Verifica se já segue para decidir se vai seguir ou deixar de seguir
    if (isFollowing) {
      // 3A. DESCONECTAR (Deixar de seguir)
      const testeDesconectar = await prisma.user.update({
        where: { id: loggedUserId },
        data: { following: { disconnect: { id: targetUserId } } },
        select: { nome: true, followingIds: true }, // Pedimos pro banco devolver a prova do crime!
      });
      console.log("🚨 BANCO DEPOIS DE DESCONECTAR:", testeDesconectar);

      return res
        .status(200)
        .json({ message: "Deixou de seguir.", isFollowing: false });
    } else {
      // 3B. CONECTAR (Começar a seguir)
      const testeConectar = await prisma.user.update({
        where: { id: loggedUserId },
        data: { following: { connect: { id: targetUserId } } },
        select: { nome: true, followingIds: true }, // Pedimos pro banco devolver a prova do crime!
      });
      console.log("🚨 BANCO DEPOIS DE CONECTAR:", testeConectar);

      return res
        .status(200)
        .json({ message: "Começou a seguir.", isFollowing: true });
    }
  } catch (error) {
    console.error("Erro ao seguir/deixar de seguir:", error);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
};

export const obterRedeDoUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const rede = await prisma.user.findUnique({
      where: { id },
      select: {
        followers: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            usuario: true,
            imagem: true,
            bio: true,
            funcao: true,
          },
        },
        following: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            usuario: true,
            imagem: true,
            bio: true,
            funcao: true,
          },
        },
      },
    });

    if (!rede) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    return res.status(200).json({
      seguidores: rede.followers,
      seguindo: rede.following,
    });
  } catch (error) {
    console.error("Erro ao obter rede do usuário:", error);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
};
