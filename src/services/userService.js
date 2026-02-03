import axios from "axios";

// Base URL aponta para a rota de users que você definiu no app.js
const API_URL = "http://localhost:51213/api/users";

export const updateProfileRequest = async (novosDados) => {
  // Bate exatamente em: PUT /api/users/perfil
  // O token já vai no header automaticamente graças ao AuthProvider
  const response = await axios.put(`${API_URL}/perfil`, novosDados);
  return response.data;
};

export const getUserProfile = async () => {
  // Bate exatamente em: GET /api/users/me
  const response = await axios.get(`${API_URL}/me`);
  return response.data;
};


export const getUserById = async (userId) => {
  // Bate exatamente em: GET /api/users/:id
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
}