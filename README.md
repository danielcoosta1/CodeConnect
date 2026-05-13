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

O **CodeConnect** é uma aplicação Full-Stack desenvolvida com a stack **MERN (com Prisma)**. O design inicial foi inspirado em um projeto da Alura no [Figma](https://www.figma.com/design/pMUevV7RLjHOOVZgU6RmwV/React--configurando-e-estruturando-projetos-com-Vite-%7C-CodeConnect--Community-?node-id=201-3522&t=amUl5DblRVGLEjhf-0). A arquitetura e as funcionalidades foram **profundamente expandidas e customizadas**, transformando um layout básico em um SaaS robusto focado em portfólios reais e dúvidas da comunidade.

Mais do que um simples CRUD, esta plataforma foi desenhada com foco em **Arquitetura Limpa, Segurança (RBAC), Performance e Experiência do Usuário (UX)**. 

---

## 🎨 Design & UI/UX

![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

A interface foi construída para ser fluida e responsiva, garantindo a melhor experiência tanto no Desktop quanto no Mobile.

- **Progressive Disclosure (Facepile):** Exibição elegante de equipas e coautores utilizando sobreposição visual (z-index dinâmico) no Feed, mantendo o foco no conteúdo, mas expandindo as informações na página de detalhes.
- **Painel de Métricas do GitHub:** Integração direta com a API do GitHub para exibição em tempo real de *stars*, *forks* e linguagens principais na vitrine dos projetos.
- **Optimistic UI:** Atualizações instantâneas na interface (como adicionar comentários ou curtir posts) antes mesmo da resposta do servidor, garantindo uma perceção de "Zero Latência".
- **Inline Confirmations:** Substituição de modais destrutivos genéricos por confirmações contextuais suaves para micro-interações (ex: exclusão de comentários).
- **Design Adaptativo:** Ajustes dinâmicos de *Touch Targets* (áreas de clique) via Media Queries e transição inteligente de SVGs locais para `react-icons` com Styled Components.

---

## 🏗️ Arquitetura e Decisões de Engenharia

Este projeto foi construído fugindo de atalhos, aplicando padrões de projeto modernos para resolver problemas reais de escalabilidade e performance:

### ⚛️ Front-end (React.js, Vite)
- **Gerenciamento de Estado Escalável:** Uso avançado de `Context API` + `useReducer` para centralizar a lógica global, mantendo os componentes `.jsx` extremamente limpos e focados apenas na renderização da UI.
- **Reuso Inteligente de Componentes (DRY):** O componente principal de Feed atua como um "camaleão", adaptando-se via *Props* para atuar como Vitrine de Projetos ou Fórum de Dúvidas, alternando regras de negócio sem duplicar código.
- **Otimização de Renderização (useMemo em Cascata):** Prevenção de re-renderizações custosas durante as buscas textuais, isolando filtros de vertente e buscas secundárias na memória para máxima fluidez na digitação do usuário.
- **Padronização Estrita de Estilos:** Abolição de CSS *inline*. Lógicas matemáticas visuais (como o empilhamento de avatares) foram delegadas para *Transient Props* no `styled-components`, utilizando componentes genéricos como `ProfileAvatar` para coesão visual.
- **Custom Hooks para Lógica Local:** Abstração de chamadas HTTP e estados locais efêmeros em hooks específicos (`useComments`, `usePost`).
- **Prevenção de State Leakage & Auto-Save:** Sistema de formulário com salvamento automático de rascunhos no `localStorage`, protegido contra vazamentos de memória ao transitar entre rotas.

### 🛡️ Back-end (Node.js, Express, Prisma, MongoDB)
- **Domain-Driven Routing:** Rotas e Controllers estritamente isolados por domínio de negócio (`Auth`, `Posts`, `Users`, `Comments`).
- **Segurança (JWT & Middlewares):** Implementação de JSON Web Tokens centralizados em middlewares (`authMiddleware.js`) para blindagem de rotas privadas sem repetição de código.
- **Role-Based Access Control (RBAC) Dinâmico:** Regras de negócio profundas no servidor. A exclusão de um comentário exige validação dupla: o usuário deve ser o autor do comentário **OU** o autor do Post onde o comentário foi feito.
- **Integridade de Dados e Cascata:** Relacionamentos N:N e exclusão em cascata (`onDelete: Cascade`) gerenciados via Prisma ORM, garantindo um banco MongoDB livre de "dados órfãos".
- **Tratamento Estratégico de Payloads:** Reconfiguração dos limites do Express (`express.json({ limit: "50mb" })`) para gerenciar arquivos pesados em Base64 sem estourar o limite de *Request Header*.

---

## 🧠 Estudos de Caso & Resolução de Problemas

Durante o desenvolvimento full-stack, diversos desafios arquiteturais e lógicos foram mapeados e resolvidos:

* **O Tratamento de "Ghost Users":** Para evitar contas travadas por falta de validação de e-mail (2FA), foi implementada uma "Limpeza sob Demanda". Se um novo cadastro tenta usar um e-mail existente não verificado (`isEmailVerified: false`), o sistema apaga o registro sujo silenciosamente e cria o novo registro.
* **Colisão de Unique Constraint (Erro P2002):** Tentativas de salvar usuários sem o campo opcional `@usuario` geravam colisões de `null` no MongoDB. A solução foi a extração do prefixo do e-mail, limpeza via Regex e adição de um hash numérico no back-end para gerar *usernames* dinâmicos e únicos.
* **Agnosticismo de Ambiente e CORS:** Para transitar perfeitamente entre o ambiente local e a produção (Vercel/Render), o *Service* da API via Axios foi configurado para leitura dinâmica de ambiente (`import.meta.env.VITE_API_URL`), direcionando os *fetchs* com segurança sem a necessidade de reescrever URLs.
* **Resiliência no OAuth 2.0 (Short-Circuit Fallbacks):** Durante o login com Google, implementou-se o *Short-Circuit Evaluation* no nível do banco de dados (ex: `user.imagem || picture`) para proteger os dados nativos. O sistema prioriza as personalizações feitas pelo usuário, usando os dados de terceiros apenas como plano de contingência.
* **O Colapso do *Lazy Loading*:** O feed principal sofria quebras ao tentar acessar a foto de perfil do autor devido à contenção de memória padrão do Prisma. O problema foi sanado alinhando o contrato de dados com o *Eager Loading* via injeção do comando `{ include: { author: true } }` no Controller.

---

## 🛠️ Stack Tecnológica Completa

### 💻 Front-end
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=flat&logo=styled-components&logoColor=white)
![React Router Dom](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)
![React Toastify](https://img.shields.io/badge/React_Toastify-FF4081?style=flat&logo=react&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat&logo=greensock&logoColor=white)

### ⚙️ Back-end & Banco de Dados
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat&logo=Prisma&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=JSON%20web%20tokens&logoColor=white)

