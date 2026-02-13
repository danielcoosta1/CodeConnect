import api from "./api";

export const loginRequest = async (email, senha) => {
  // Bate exatamente em: POST /api/auth/login
  const response = await api.post(`/auth/login`, { email, senha });
  return response.data;
};

export const registerRequest = async (nome, email, senha) => {
  const response = await api.post("/auth/cadastro", {
    nome,
    email,
    senha,
  });
  return response.data;
};
