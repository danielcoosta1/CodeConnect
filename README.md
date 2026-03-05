# 🚀 CodeConnect

> Uma rede social e plataforma de portfólios exclusiva para desenvolvedores compartilharem projetos, códigos e ideias.

O **CodeConnect** é uma aplicação Full-Stack desenvolvida com a stack **MERN (com Prisma)**. Mais do que um simples CRUD, esta plataforma foi desenhada com foco em **Arquitetura Limpa, Segurança (RBAC) e Experiência do Usuário (UX)**. Ela permite que desenvolvedores publiquem seus projetos com suporte a Markdown, interajam através de comentários e construam uma rede de networking através de um sistema de seguidores.

---

## 🏗️ Arquitetura e Decisões de Engenharia

Este projeto foi construído fugindo de atalhos e aplicando padrões de projeto modernos para resolver problemas reais de escalabilidade e performance:

### 🛡️ Back-end (Node.js, Express, Prisma, MongoDB)
- **Domain-Driven Routing:** Rotas e Controllers estritamente isolados por domínio de negócio (`Auth`, `Posts`, `Users`, `Comments`).
- **Autenticação e Autorização Segura:** Implementação de JWT via Middlewares de proteção.
- **Role-Based Access Control (RBAC):** Regras de negócio profundas no servidor (Ex: Exclusão de comentários permitida apenas para o autor do comentário **ou** o dono do post).
- **Integridade de Dados (Prisma ORM):** Relacionamentos complexos (1:N, N:N) e deleção em cascata (`onDelete: Cascade`) garantindo um banco de dados MongoDB livre de "dados órfãos".

### ⚛️ Front-end (React.js, Vite, Styled Components)
- **Gerenciamento de Estado Escalável (Redux-like):** Uso avançado de `Context API` + `useReducer` para separar a lógica global (Feed, Auth) da camada visual, evitando *Prop Drilling* e *God Components*.
- **Custom Hooks para Lógica Local:** Abstração de chamadas HTTP e estados locais efêmeros em hooks como `useComments` e `usePost`, mantendo os componentes `.jsx` como *Presentational Components* (100% focados em UI).
- **Prevenção de State Leakage & Auto-Save:** Sistema inteligente de formulário (`formData`) com salvamento automático de rascunhos no `localStorage`, imune a *reloads* (F5) e protegido contra vazamento de memória ao transitar entre rotas de Edição e Criação.
- **Tratamento Estratégico de Base64:** Otimização do payload de imagens para evitar estouro de cabeçalhos HTTP (`431 Request Header Fields Too Large`) e quebras de cota de memória no navegador.

### ✨ UX/UI (User Experience)
- **Optimistic UI:** Atualizações instantâneas na interface (como adicionar comentários) antes mesmo da resposta do servidor, garantindo uma percepção de "Zero Latência".
- **Inline Confirmations:** Substituição de modais destrutivos por confirmações contextuais suaves para micro-interações.
- **Renderização de Markdown:** Suporte completo via `react-markdown` para exibição profissional de *snippets* de código.
- **Design Totalmente Responsivo:** Ajustes dinâmicos de *Touch Targets* (áreas de clique) via Media Queries no Styled Components para usabilidade perfeita em dispositivos móveis.

---

## 🛠️ Tecnologias Utilizadas

**Front-end:**
- React (Vite)
- Styled Components
- React Router Dom
- React Icons & React Markdown
- Axios

**Back-end:**
- Node.js & Express
- Prisma ORM
- MongoDB
- JSON Web Token (JWT) & Bcrypt

---

## 🚀 Roadmap e Próximos Passos

O CodeConnect está em constante evolução. Nossas próximas metas de engenharia incluem:

- [ ] **OAuth 2.0 (Social Login):** Integração com **Google** e **GitHub** para onboarding fluído de novos usuários com apenas um clique.
- [ ] **Autenticação de 2 Fatores (2FA):** Aumento do nível de segurança das contas implementando validação real via e-mail.
- [ ] **Sistema de "Likes/Upvotes":** Para ranqueamento de projetos no Feed.
- [ ] **Migração de Storage:** Substituir o armazenamento de imagens em Base64 no MongoDB por um Bucket S3 (AWS) ou Cloudinary para otimização extrema de performance.

---

## ⚙️ Como Rodar o Projeto Localmente

### Pré-requisitos
- Node.js (v18+)
- Conta no MongoDB Atlas (ou MongoDB local)

### Instalação

**1. Clone o repositório:**
```bash
git clone [https://github.com/seu-usuario/codeconnect.git](https://github.com/seu-usuario/codeconnect.git)
