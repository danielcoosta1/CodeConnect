import axios from "axios";

// Base URL aponta para a rota de users que você definiu no app.js
const API_URL = "http://localhost:51213/api/users";

export const updateProfileRequest = async (novosDados) => {
  // Bate exatamente em: PUT /api/users/perfil
  // O token já vai no header automaticamente graças ao AuthProvider
  const response = await axios.put(`${API_URL}/perfil`, novosDados);
  return response.data;
};