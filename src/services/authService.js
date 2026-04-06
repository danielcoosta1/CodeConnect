import api from "./api";

export const loginRequest = async (email, senha) => {
  // Bate exatamente em: POST /api/auth/login
  const response = await api.post(`/auth/login`, { email, senha });
  return response.data;
};

export const loginGoogleRequest = async (credenciais) => {
  const response = await api.post("/auth/google", { credenciais });
  return response.data;
};

// No seu arquivo authService.js (Front-end)

export const loginGithubRequest = async (code) => {
  const response = await api.post("/auth/github", { code });
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

export const verifyEmailRequest = async (email, codigo) => {
  const response = await api.post("/auth/verify-email", { email, codigo });
  return response.data;
};

export const forgotPasswordRequest = async (email) => {
  const response = await api.post("/auth/esqueci-senha", { email });
  return response.data;
};

export const resetPasswordRequest = async (token, novaSenha) => {
  const response = await api.post("/auth/redefinir-senha", {
    token,
    novaSenha,
  });
  return response.data;
};
