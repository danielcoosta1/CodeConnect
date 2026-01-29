import axios from "axios";

// Base URL aponta para a rota de auth que você definiu no app.js
const API_URL = "http://localhost:51213/api/auth";

export const loginRequest = async (email, senha) => {
  // Bate exatamente em: POST /api/auth/login
  const response = await axios.post(`${API_URL}/login`, { email, senha });
  return response.data;
};

export const registerRequest = async (dadosCadastro) => {
  // Bate exatamente em: POST /api/auth/cadastro
  const response = await axios.post(`${API_URL}/cadastro`, dadosCadastro);
  return response.data;
};