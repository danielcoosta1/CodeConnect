import bcrypt from "bcrypt";
import axios from "axios";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

import crypto from "crypto";

import {
  sendVerificationEmail,
  sendPasswordResetEmail,
} from "../utils/emailService.js";

import prisma from "../lib/prisma.js";

/* global process */

//Cria um cliente OAuth2 para o Google Sign-In, usando a variável de ambiente para o ID do cliente. Isso é necessário para validar os tokens do Google durante o login social.
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { credenciais: credential } = req.body; // Recebe o token do Google enviado pelo frontend

    // Verifica o token do Google e extrai as informações do usuário
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    // Extrai o email e nome do usuário do payload do token
    const payload = ticket.getPayload();

    const { email, name, picture } = payload;

    // Verifica se o usuário já existe no banco de dados
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Se o usuário não existir, cria um novo registro no banco de dados
      const senhaFantasma = crypto.randomBytes(16).toString("hex"); // Gera uma senha aleatória para o usuário do Google.
      const hashedPassword = await bcrypt.hash(senhaFantasma, 10); // Criptografa a senha aleatória.

      const baseUsername = email
        .split("@")[0]
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
      const generatedUsuario = `${baseUsername}${Math.floor(1000 + Math.random() * 9000)}`;

      user = await prisma.user.create({
        data: {
          nome: name,
          email,
          senha: hashedPassword,
          usuario: generatedUsuario, // Gera um nome de usuário único baseado no e-mail, para não ir como null e evitar erros de banco de dados. Exemplo: "joao1234" para o e-mail "
          imagem: picture, // Salva a foto do perfil do Google, se disponível
          isEmailVerified: true, // Marca o e-mail como verificado, já que o Google já fez essa verificação
        },
      });
    } else {
      if (!user.isEmailVerified) {
        // Se o usuário existe mas não está verificado, isso pode acontecer se ele tentou se cadastrar com o e-mail do Google antes. Nesse caso, vamos atualizar o registro existente para marcar como verificado e adicionar a foto do perfil.
        await prisma.user.update({
          where: { email },
          data: {
            isEmailVerified: true,
            imagem: user.imagem || picture, // Atualiza a imagem do perfil apenas se ainda não tiver uma (para não sobrescrever uma foto personalizada que o usuário já tenha colocado)
          },
        });
      }
    }

    // Gera um token JWT para o usuário autenticado
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    const { senha: _, ...userSemSenha } = user; //Desestruturação para excluir a senha da resposta

    res.json({ user: userSemSenha, token }); // Retorna o usuário sem a senha e o token(response data)
  } catch (error) {
    console.error("Erro no login do Google:", error);
    res.status(500).json({ error: "Erro ao fazer login com o Google" });
  }
};

// Registrar novo usuário (cadastro)
export const registerUser = async (req, res) => {
  const registerSchema = z.object({
    nome: z
      .string()
      .min(3, { message: "O nome precisa ter pelo menos 3 caracteres." }),
    email: z.string().email({ message: "Formato de e-mail inválido." }),
    senha: z
      .string()
      .min(6, { message: "A senha precisa ter pelo menos 6 caracteres." }),
  });

  try {
    const { nome, email, senha } = registerSchema.parse(req.body); // Lança um erro se a validação falhar

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // Se ele já validou a conta no passado, bloqueia!
      if (existingUser.isEmailVerified) {
        return res.status(409).json({ error: "E-mail já cadastrado." });
      } else {
        // Ele existe, mas é um "fantasma" não verificado.
        // Vamos apagar esse lixo do banco antes de criar um novo!
        await prisma.user.delete({
          where: { email },
        }); // Apaga o usuário não verificado é exlcuido para liberar o e-mail para um novo cadastro. Assim evitamos confusão de códigos de verificação antigos e damos uma segunda chance pro usuário se ele errou o e-mail na primeira vez.
      }
    }
    const hashedPassword = await bcrypt.hash(senha, 10);

    // VERIFICAÇÃO 2FA - Gerar código de verificação e enviar por e-mail

    // 1. Gerar um código de 6 dígitos aleatório
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    // 2. Define a validade do código (10 minutos)
    const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos a partir de agora

    // Pega o nome antes do @ e retira caracteres especiais

    const baseUsername = email
      .split("@")[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
    const generatedUsuario = `${baseUsername}${Math.floor(1000 + Math.random() * 9000)}`;

    // 3. Criar o usuário no banco de dados
    const user = await prisma.user.create({
      data: {
        nome,
        email,
        senha: hashedPassword,
        usuario: generatedUsuario, // Gera um nome de usuário único baseado no e-mail, para não ir como null e evitar erros de banco de dados. Exemplo: "joao1234" para o e-mail "joao@exemplo.com"
        verificationCode,
        verificationCodeExpires,
        isEmailVerified: false,
      },
    });

    // 4. Chama a função para enviar o e-mail de verificação

    await sendVerificationEmail(user.email, verificationCode);

    const { senha: _, ...userSemSenha } = user; //Desestruturação para excluir a senha da resposta

    res.status(201).json(userSemSenha); // Retorna os dados do usuário sem a senha (response data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues[0].message });
    }

    res.status(500).json({ error: "Erro ao cadastrar usuário" });
    console.error(error);
  }
};

export const verifyEmailCode = async (req, res) => {
  try {
    const { email, codigo } = req.body;

    // 1. Busca o usuário pelo e-mail
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // 2. Validações de segurança
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    if (user.isEmailVerified) {
      return res.status(400).json({ error: "Este e-mail já foi verificado." });
    }
    if (user.verificationCode !== codigo) {
      return res
        .status(400)
        .json({ error: "Código inválido. Tente novamente." });
    }
    if (new Date() > new Date(user.verificationCodeExpires)) {
      return res
        .status(400)
        .json({ error: "Código expirado. Por favor, cadastre-se novamente." });
    }

    // 3. Se passou em tudo, atualiza o banco: Verificado = true e limpa os códigos!
    await prisma.user.update({
      where: { email },
      data: {
        isEmailVerified: true,
        verificationCode: null, // Limpa o código usado
        verificationCodeExpires: null, // Limpa a validade
      },
    });

    return res.status(200).json({ message: "E-mail verificado com sucesso!" });
    // Mostra o balãozinho verde de sucesso
  } catch (error) {
    console.error("Erro na verificação de e-mail:", error);
    return res
      .status(500)
      .json({ error: "Erro interno ao verificar o código." });
  }
};

// Login de usuário

export const loginUser = async (req, res) => {
  const loginSchema = z.object({
    email: z.string().email({ message: "Formato de e-mail inválido." }),
    senha: z
      .string()
      .min(6, { message: "A senha precisa ter pelo menos 6 caracteres." }),
  });

  try {
    const { email, senha } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "E-mail não encontrado" });
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({
        error:
          "E-mail não verificado. Por favor, verifique sua caixa de entrada.",
      });
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    const { senha: _, ...userSemSenha } = user; //Desestruturação para excluir a senha
    res.json({ user: userSemSenha, token }); // Retorna o usuário sem a senha e o token(response data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues[0].message });
    }
    res.status(500).json({ error: "Erro ao fazer login" });
    console.error(error);
  }
};

export const loginGithub = async (req, res) => {
  console.log("chegou no back-end com o código:", req.body.code); // Log para verificar se o código está chegando
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Código do GitHub não fornecido." });
    }

    // 1. O Back-end pede o Token de Acesso para o GitHub
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
      },
      { headers: { Accept: "application/json" } },
    );

    console.log("RESPOSTA DO GITHUB:", tokenResponse.data);

    const accessToken = tokenResponse.data.access_token;

    if (!accessToken) {
      return res.status(401).json({ error: "Falha ao obter token do GitHub." });
    }

    // 2. Com o Token em mãos, pede os dados do perfil
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const githubUser = userResponse.data;

    // 3. Pede o e-mail (Muitos devs deixam o e-mail privado no perfil do GitHub)
    const emailResponse = await axios.get(
      "https://api.github.com/user/emails",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    // Filtra para pegar o e-mail principal e que já foi verificado pelo GitHub
    const primaryEmailObj = emailResponse.data.find(
      (email) => email.primary === true && email.verified === true,
    );
    const email = primaryEmailObj ? primaryEmailObj.email : githubUser.email;

    if (!email) {
      return res
        .status(400)
        .json({ error: "Não foi possível acessar o e-mail do GitHub." });
    }

    // 4. Lógica de Banco de Dados (Exatamente igual ao seu Google Login)
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      const senhaFantasma = crypto.randomBytes(16).toString("hex");
      const hashedPassword = await bcrypt.hash(senhaFantasma, 10);

      const baseUsername = email
        .split("@")[0]
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
      const generatedUsuario = `${baseUsername}${Math.floor(1000 + Math.random() * 9000)}`;

      user = await prisma.user.create({
        data: {
          nome: githubUser.name || githubUser.login, // Usa o nome real, se não tiver, usa o @
          email,
          senha: hashedPassword,
          usuario: generatedUsuario,
          imagem: githubUser.avatar_url,
          isEmailVerified: true,
          github_username: githubUser.login, // Preenchendo o campo novo do Prisma!
        },
      });
    } else {
      await prisma.user.update({
        where: { email },
        data: {
          isEmailVerified: true,
          imagem: user.imagem || githubUser.avatar_url,
          github_username: githubUser.login, // Atualiza para vincular a conta
        },
      });
    }

    // 5. Gera o NOSSO Token JWT do CodeConnect
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    const { senha: _, ...userSemSenha } = user;

    // 6. Devolve tudo certinho para o Front-end
    res.json({ user: userSemSenha, token });
  } catch (error) {
    console.error(
      "Erro no login do GitHub:",
      error.response?.data || error.message,
    );
    res.status(500).json({ error: "Erro ao fazer login com o GitHub" });
  }
};

// Rota para solicitar redefinição de senha (envia e-mail com link)

export const forgotPassword = async (req, res) => {
  const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Formato de e-mail inválido." }),
  });

  try {
    const { email } = forgotPasswordSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email },
    });
    // Se não achar o usuário, não diz nada (por segurança, para não revelar quais e-mails estão cadastrados)
    if (!user) {
      return res.status(200).json({
        message:
          "Se este e-mail estiver cadastrado, um link de redefinição de senha foi enviado.",
      });
    }

    const resetPasswordToken = crypto.randomBytes(32).toString("hex");

    const resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora de validade

    await prisma.user.update({
      where: { email },
      data: {
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpires: resetPasswordExpires,
      },
    });

    const resetLink = `${process.env.FRONTEND_URL}/redefinir-senha?token=${resetPasswordToken}`;

    await sendPasswordResetEmail(email, resetLink);

    res.status(200).json({
      message:
        "Se este e-mail estiver cadastrado, um link de redefinição de senha foi enviado.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues[0].message });
    }

    res
      .status(500)
      .json({ error: "Erro ao processar solicitação de redefinição de senha" });
    console.error(error);
  }
};

// Rota para redefinir a senha usando o token
export const resetPassword = async (req, res) => {
  // Validamos se o token chegou e se a nova senha atende aos requisitos
  const resetPasswordSchema = z.object({
    token: z.string(),
    novaSenha: z
      .string()
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
  });

  try {
    const { token, novaSenha } = resetPasswordSchema.parse(req.body);

    // 1. Busca o usuário que tem esse token E verifica se a data de expiração ainda não passou
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          gt: new Date(), // "gt" = greater than (a validade no banco tem que ser maior que a hora exata de agora)
        },
      },
    });

    // 2. Se não achar o usuário ou a data expirou
    if (!user) {
      return res.status(400).json({
        error: "Token inválido ou expirado. Solicite uma nova recuperação.",
      });
    }

    // 3. Criptografa a nova senha
    const hashedPassword = await bcrypt.hash(novaSenha, 10);

    // 4. Salva a nova senha e LIMPA os campos de segurança
    await prisma.user.update({
      where: { id: user.id },
      data: {
        senha: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    res.status(200).json({ message: "Senha redefinida com sucesso!" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues[0].message });
    }
    console.error("Erro no resetPassword:", error);
    res.status(500).json({ error: "Erro interno ao redefinir a senha." });
  }
};
