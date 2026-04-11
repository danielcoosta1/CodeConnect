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
};

export const updatePostById = async (postId, postData) => {
  const response = await api.put(`/posts/${postId}`, postData);
  return response.data;
};

// Comentários

export const createCommentRequest = async (postId, text, parentId = null) => {
  const response = await api.post(`/posts/${postId}/comments`, {
    text,
    parentId,
  });
  return response.data;
};

export const fetchCommentsByPostId = async (postId) => {
  const response = await api.get(`/posts/${postId}/comments`);
  return response.data;
};

export const deleteCommentById = async (commentId) => {
  const response = await api.delete(`/posts/comment/${commentId}`);
  return response.data;
};

export const toggleLikeComment = async (commentId) => {
  const response = await api.patch(`/posts/comment/${commentId}/like`);
  return response.data;
};

export const toggleSolutionStatus = async (commentId) => {
  const response = await api.patch(`/posts/comment/${commentId}/solution`);
  return response.data;
};

// Rotas Sociais

export const toggleLikePostRequest = async (postId) => {
  const response = await api.patch(`/posts/${postId}/like`);
  return response.data;
};

export const sharePostRequest = async (postId) => {
  const response = await api.patch(`/posts/${postId}/share`);
  return response.data;
};
