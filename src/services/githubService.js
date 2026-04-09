// src/services/githubService.js

export const extrairDadosDoLink = (url) => {
  const regex = /github\.com\/([^/]+)\/([^/]+)/;
  const match = url.match(regex);
  if (!match) throw new Error("Link inválido.");
  return { owner: match[1], repo: match[2] };
};

export const buscarDadosDoRepo = async (owner, repo) => {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
  if (!res.ok) throw new Error("Repositório não encontrado.");
  return await res.json();
};

export const buscarReadme = async (owner, repo) => {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`);
  if (!res.ok) return "";
  const data = await res.json();
  return decodeURIComponent(escape(window.atob(data.content)));
};