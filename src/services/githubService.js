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

export const buscarEstatisticasGithub = async (githubUsername) => {
  const res = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100`);
  if (!res.ok) throw new Error("Usuário não encontrado no GitHub.");
  
  const repos = await res.json();
  
  const contagemLinguagens = {};
  let totalStars = 0;
  let totalForks = 0;

  repos.forEach(repo => {
    // 1. Agrupa as Linguagens
    if (repo.language) {
      contagemLinguagens[repo.language] = (contagemLinguagens[repo.language] || 0) + 1;
    }
    // 2. Soma as Métricas Globais
    totalStars += repo.stargazers_count || 0;
    totalForks += repo.forks_count || 0;
  });

  const linguagensArr = Object.keys(contagemLinguagens).map(key => ({
    name: key,
    value: contagemLinguagens[key]
  }));

  // Retorna um Objeto Completo com tudo que precisamos para o Dashboard
  return {
    linguagens: linguagensArr,
    metricas: {
      stars: totalStars,
      forks: totalForks,
      repositorios: repos.length
    }
  };
};