import api from "./api";

export const fetchPosts = async () => {
  const response = await api.get("/posts/");
  return response.data;
};

export const createPostRequest = async (postData) => {
  // O header Authorization vai automático graças ao AuthProvider
  const response = await api.post("/posts/", postData);
  return response.data;
};

export const fetchMyPosts = async () => {
  // O middleware de autenticação já adiciona o token automaticamente - user.id
  const response = await api.get(`/posts/me`);
  return response.data;
};

export const getPostsByUserId = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};
