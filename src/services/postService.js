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
  const response = await api.get(`/posts/user/${userId}`);
  return response.data;
};

export const fetchPostById = async (postId) => {
  const response = await api.get(`/posts/${postId}`);
  return response.data;
};


export const deletePostById = async (postId) => {
  const response = await api.delete(`/posts/${postId}`);
  return response.data;
}