import axios from "axios";

const BASE_URL = "http://localhost:51213/api/posts";

export const fetchPosts = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};


export const criarPost = async (postData, token) => {
  const response = await axios.post(BASE_URL, postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};