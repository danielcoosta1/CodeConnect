import api from "./api";

export const updateProfileRequest = async (novosDados) => {
  // Bate exatamente em: PUT /api/users/perfil
  // O token já vai no header automaticamente graças ao AuthProvider
  const response = await api.put(`/users/perfil`, novosDados);
  return response.data;
};

export const getUserProfile = async () => {
  // Bate exatamente em: GET /api/users/me
  const response = await api.get(`/users/me`);
  return response.data;
};

export const getUserById = async (userId) => {
  // Bate exatamente em: GET /api/users/:id
  const response = await api.get(`/users/${userId}`);
  return response.data;
};
