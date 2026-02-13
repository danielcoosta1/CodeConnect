import axios from "axios";

// A MÁGICA ACONTECE AQUI:
// O import.meta.env.VITE_API_URL vai ler do .env (local) ou da Vercel (produção).
// Se por algum motivo não achar, usa o localhost como segurança.
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:51213/api";

const api = axios.create({
  baseURL: baseURL,
  // Aqui você pode configurar headers globais se precisar no futuro
});

export default api;