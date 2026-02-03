import axios from "axios";

const API_URL = "http://localhost:51213/api/posts";

export const fetchPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createPostRequest = async (postData) => {
  // O header Authorization vai automático graças ao AuthProvider
  const response = await axios.post(API_URL, postData);
  return response.data;
};

export const fetchMyPosts = async () => {
  // O middleware de autenticação já adiciona o token automaticamente - user.id
  const response = await axios.get(`${API_URL}/me`);
  return response.data;
};

export const getPostsByUserId = async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
};
