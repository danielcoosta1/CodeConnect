import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";

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
      return res.status(409).json({ error: "E-mail já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    const user = await prisma.user.create({
      data: {
        nome,
        email,
        senha: hashedPassword,
      },
    });
    const { senha: _, ...userSemSenha } = user;
    res.status(201).json(userSemSenha);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues[0].message });
    }

    res.status(500).json({ error: "Erro ao cadastrar usuário" });
    console.error(error);
  }
};

// L.ogin de usuário

export const loginUser = async (req, res) => {
  const registerSchema = z.object({
    email: z.string().email({ message: "Formato de e-mail inválido." }),
    senha: z
      .string()
      .min(6, { message: "A senha precisa ter pelo menos 6 caracteres." }),
  });

  try {
    const { email, senha } = registerSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "E-mail não encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { senha: _, ...userSemSenha } = user;
    res.json({ user: userSemSenha, token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues[0].message });
    }
    res.status(500).json({ error: "Erro ao fazer login" });
    console.error(error);
  }
};
