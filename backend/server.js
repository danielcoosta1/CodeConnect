import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
/* global process */
import express from "express";
import cors from "cors";

import prisma from "./lib/prisma.js";

const app = express();

const PORT = process.env.PORT || 51213;

app.use(cors());
// Aumentamos o limite para aceitar as imagens pesadas
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//Rotas de  autenticação
app.use("/api/auth", authRoutes);

//Rotas de posts
app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});

prisma
  .$connect()
  .then(() => console.log("Conexão com o banco de dados estabelecida."))
  .catch((error) => {
    console.error("Erro ao conectar com o banco de dados:", error);
    process.exit(1);
  });
