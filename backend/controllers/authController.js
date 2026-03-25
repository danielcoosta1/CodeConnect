import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";

import crypto from "crypto";

import {
  sendVerificationEmail,
  sendPasswordResetEmail,
} from "../utils/emailService.js";

import prisma from "../lib/prisma.js";

/* global process */

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

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetPasswordToken}`;

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
