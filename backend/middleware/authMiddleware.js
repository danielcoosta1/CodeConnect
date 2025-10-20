// Em backend/middleware/authMiddleware.js

import jwt from "jsonwebtoken";
/* global process */

export const authMiddleware = (req, res, next) => {
  // 1. Pega o cabeçalho 'Authorization' da requisição
  const authHeader = req.headers.authorization;

  // 2. Verifica se o cabeçalho existe e se está no formato 'Bearer TOKEN'
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Acesso negado. Nenhum token fornecido." });
  }

  // 3. Extrai o token (remove o "Bearer ")
  const token = authHeader.split(" ")[1];

  try {
    // 4. Verifica se a assinatura do token é válida
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Anexa os dados do usuário (o payload do token) ao objeto 'req'
    req.user = decoded;

    // 6. Passa para o próximo passo (o controller)
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido ou expirado." });
  }
};