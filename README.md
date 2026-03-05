# 🚀 CodeConnect

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" alt="Styled Components" />
</div>

<br>

> Uma rede social e plataforma de portfólios exclusiva para desenvolvedores compartilharem projetos, códigos e ideias.

O **CodeConnect** é uma aplicação Full-Stack desenvolvida com a stack **MERN (com Prisma)**. O design inicial foi inspirado em um projeto da Alura no [Figma](https://www.figma.com/design/pMUevV7RLjHOOVZgU6RmwV/React--configurando-e-estruturando-projetos-com-Vite-%7C-CodeConnect--Community-?node-id=201-3522&t=amUl5DblRVGLEjhf-0). Salvei este projeto no inicio dos meus estudos de HTML e CSS, usanddo o figma como base para a estilização. Com tempo de estudo em ReactJS e da atmosfera NodeJS, dei vida ao projeto, sendo a arquitetura e as funcionalidades **profundamente expandidas e customizadas**, transformando um layout básico em um SaaS robusto.

Mais do que um simples CRUD, esta plataforma foi desenhada com foco em **Arquitetura Limpa, Segurança (RBAC) e Experiência do Usuário (UX)**. 

---

## 🎨 Design & UI/UX

![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

A interface foi construída para ser fluida e responsiva, garantindo a melhor experiência tanto no Desktop quanto no Mobile.
- **Optimistic UI:** Atualizações instantâneas na interface (como adicionar comentários) antes mesmo da resposta do servidor, garantindo uma percepção de "Zero Latência".
- **Inline Confirmations:** Substituição de modais destrutivos genéricos por confirmações contextuais suaves para micro-interações (ex: exclusão de comentários).
- **Renderização de Markdown:** Suporte completo via `react-markdown` para exibição profissional de *snippets* de código.
- **Design Adaptativo:** Ajustes dinâmicos de *Touch Targets* (áreas de clique) via Media Queries no Styled Components para usabilidade perfeita em dispositivos móveis.

---

## 🏗️ Arquitetura e Decisões de Engenharia

Este projeto foi construído fugindo de atalhos, aplicando padrões de projeto modernos para resolver problemas reais de escalabilidade e performance:

### 🛡️ Back-end (Node.js, Express, Prisma, MongoDB)
- **Domain-Driven Routing:** Rotas e Controllers estritamente isolados por domínio de negócio (`Auth`, `Posts`, `Users`, `Comments`).
- **Segurança (JWT & Middlewares):** Implementação de JSON Web Tokens via Middlewares para blindagem de rotas privadas.
- **Role-Based Access Control (RBAC) Dinâmico:** Regras de negócio profundas no servidor. A exclusão de um comentário, por exemplo, exige validação dupla: o usuário deve ser o autor do comentário **ou** o autor do Post onde o comentário foi feito.
- **Integridade de Dados (Prisma ORM):** Relacionamentos complexos (1:N, N:N) e deleção em cascata (`onDelete: Cascade`), garantindo um banco MongoDB livre de "dados órfãos".

### ⚛️ Front-end (React.js, Vite)
- **Gerenciamento de Estado Escalável:** Uso avançado de `Context API` + `useReducer` para separar a lógica global (Feed, Auth) da camada visual, evitando *Prop Drilling* e *God Components*.
- **Custom Hooks para Lógica Local:** Abstração de chamadas HTTP e estados locais efêmeros em hooks como `useComments` e `usePost`, mantendo os componentes `.jsx` como *Presentational Components* (100% focados em UI).
- **Prevenção de State Leakage & Auto-Save:** Sistema inteligente de formulário (`formData`) com salvamento automático de rascunhos no `localStorage`. Imune a *reloads* (F5) e protegido contra vazamentos de memória ao transitar entre rotas.
- **Tratamento Estratégico de Base64:** Otimização do payload de imagens para evitar estouros de cabeçalho HTTP (`431 Request Header Fields Too Large`) e quebras de cota de memória no navegador.

---

## 🛠️ Stack Tecnológica Completa

### 💻 Front-end
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=flat&logo=styled-components&logoColor=white)
![React Router Dom](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)
![React Toastify](https://img.shields.io/badge/React_Toastify-FF4081?style=flat&logo=react&logoColor=white)

### ⚙️ Back-end & Banco de Dados
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat&logo=Prisma&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=JSON%20web%20tokens&logoColor=white)

---

## 🚀 Roadmap e Próximos Passos

O CodeConnect está em constante evolução. Nossas próximas metas de engenharia incluem:

- [ ] **Autenticação de 2 Fatores (2FA):** Aumento do nível de segurança das contas implementando validação real via e-mail e envio de códigos.
- [ ] **OAuth 2.0 (Social Login):** Integração com **Google** e **GitHub** para onboarding fluído de novos usuários com apenas um clique.
- [ ] **Sistema de Interações ("Likes"):** Implementação de upvotes para ranqueamento de projetos no Feed.
- [ ] **Migração de Storage:** Substituir o armazenamento local/Base64 por um serviço em nuvem (AWS S3 ou Cloudinary) para otimização extrema de tráfego.

---

## ⚙️ Como Rodar o Projeto Localmente

### Pré-requisitos
- Node.js (v18+)
- Conta no MongoDB Atlas (ou instância do MongoDB local)
- Git

### Instalação

**1. Clone o repositório:**

```bash

git clone https://github.com/danielcoosta1/codeconnect.git
cd codeconnect

```
**2. Configurando e Rodando o Back-end:**

```bash

cd backend
npm install

# Crie um arquivo .env na pasta backend com as variáveis: 
# DATABASE_URL="sua_string_do_mongodb"
# JWT_SECRET="sua_chave_secreta"

# Sincronize o banco de dados
npx prisma db push

# Inicie o servidor
npm run dev

```
**3. Configurando e Rodando o Front-end:**

```bash

# Volte para a raiz do projeto
cd ..
npm install

# Crie um arquivo .env na pasta raiz do front-end com:
# VITE_API_URL="http://localhost:51213/api"

# Inicie a aplicação React
npm run dev

```
<p align="center">
Sinta-se à vontade para abrir uma issue ou enviar um pull request!
</p>
