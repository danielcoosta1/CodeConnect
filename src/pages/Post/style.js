import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { device } from "../../styles/breakpoints";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(1rem); }
  to { opacity: 1; transform: translateY(0); }
`;

export const PostContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100rem;
  margin: 0 auto;
  padding: 2.4rem;
  animation: ${fadeIn} 0.4s ease-out forwards;

  @media ${device.mobile} {
    padding: 1.6rem;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: none;
  border: none;
  color: #bcbcbc;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 2.4rem;
  transition: color 0.2s ease;
  width: max-content;

  &:hover {
    color: #81fe88;
  }
`;
export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.4rem;
  flex-wrap: wrap; /* Para não quebrar no mobile se o botão de voltar empurrar */
  gap: 1.6rem;

  /* Removemos a margem do BackButton original porque o HeaderTop já vai cuidar do espaçamento */
  ${BackButton} {
    margin-bottom: 0;
  }
`;

export const AuthorActions = styled.div`
  display: flex;
  gap: 1.2rem;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    padding: 0.8rem 1.6rem;
    border-radius: 0.8rem;
    font-size: 1.4rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    /* --- DESIGN NEUTRO (GHOST BUTTON) --- */
    background-color: transparent;
    color: #818388; /* Cinza discreto */
    border: 0.1rem solid #2d3538; /* Borda da mesma cor das outras divisões */
  }

  .btn-edit:hover {
    color: #fff;
    border-color: #81fe88;
    background-color: rgba(
      129,
      254,
      136,
      0.05
    ); /* Um fundo verde bem fraquinho */
  }

  .btn-delete:hover {
    color: #ff5f56;
    border-color: #ff5f56;
    background-color: rgba(
      255,
      95,
      86,
      0.05
    ); /* Um fundo vermelho bem fraquinho */
  }

  /* --- MÁGICA DO MOBILE AQUI --- */
  @media ${device.mobile} {
    gap: 0.8rem;

    button {
      padding: 0.8rem; /* Deixa o botão quadradinho */
    }

    span {
      display: none; /* Esconde o texto para poupar espaço */
    }

    svg {
      width: 1.6rem;
      height: 1.6rem;
    }
  }
`;
export const CoverImage = styled.div`
  width: 100%;
  height: 35rem;
  border-radius: 1.6rem;
  overflow: hidden;
  background-color: #2d3538;
  border: 0.1rem solid #333;
  margin-bottom: 3.2rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media ${device.mobile} {
    height: 20rem;
    border-radius: 0.8rem;
  }
`;

export const PostHeader = styled.header`
  display: flex;
  flex-direction: column;
  background-color: #171d1f;
  margin-bottom: 2.4rem;
  padding: 3.2rem;
  border-radius: 1.6rem;

  @media ${device.mobile} {
    padding: 1.6rem;
  }
`;

export const AuthorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-top: 1.5rem;
  border-top: 0.1rem solid #2d3538;
  margin-top: 3.2rem;

  /* --- ADD RESPONSIVIDADE --- */
  @media ${device.mobile} {
    flex-direction: column-reverse; /* Autor em cima, ícones embaixo */
    gap: 2.4rem;
    align-items: flex-start; /* Alinha tudo à esquerda */
  }
`;

export const ActionIcons = styled.div`
  display: flex;
  gap: 1.5rem;
  color: #818388;
`;

export const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: color 0.2s;

  font-size: 1.4rem;
  font-weight: bold;

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  &:hover {
    color: #81fe88;
  }
`;

export const AuthorInfo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  text-decoration: none;
  color: inherit;
  padding: 0.8rem;
  border-radius: 0.8rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  h3 {
    font-size: 1.8rem;
    color: #fff;
    margin: 0;
  }

  small {
    font-size: 1.4rem;
    color: #818388;
  }

  @media ${device.mobile} {
    gap: 1.2rem;
    padding: 0;
    h3 {
      font-size: 1.6rem;
    }
    small {
      font-size: 1.2rem;
    }
  }
`;

export const PostTitle = styled.h1`
  font-size: 3.3rem;
  color: #fff;
  margin-bottom: 2.4rem;
  line-height: 1.2;

  @media ${device.mobile} {
    font-size: 2.4rem;
  }
`;

export const PostContent = styled.article`
  font-size: 1.8rem;
  color: #cccccc;
  line-height: 1.6;
  margin-bottom: 3.2rem;

  @media ${device.mobile} {
    font-size: 1.4rem;
  }
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  text-transform: uppercase;
`;

export const TagItem = styled.span`
  background-color: rgba(129, 254, 136, 0.1);
  color: #81fe88;
  padding: 0.8rem 1.6rem;
  border-radius: 2rem;
  font-size: 1.4rem;
  font-weight: 600;
  border: 0.1rem solid rgba(129, 254, 136, 0.2);
`;

export const CodeContainer = styled.section`
  background-color: #0d1117; /* Uma cor bem escura, estilo tema de editor de código */
  border-radius: 1.6rem;
  padding: 2.4rem;
  margin-bottom: 2.4rem;
  border: 0.1rem solid #2d3538;
  overflow-x: auto; /* Se o código for muito largo, cria uma barra de rolagem horizontal */

  /* Esse ::before cria aquelas "bolinhas" estilo janela do Mac OS na barra superior! */
  &::before {
    content: "";
    display: block;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    background: #ff5f56; /* Bolinha Vermelha */
    box-shadow:
      2rem 0 0 #ffbd2e,
      4rem 0 0 #27c93f; /* Bolinha Amarela e Verde */
    margin-bottom: 2.4rem;
  }

  color: #e6edf3;
  line-height: 1.6;
  font-size: 1.6rem;

  h1,
  h2,
  h3 {
    color: #fff;
    margin-top: 2.4rem;
    margin-bottom: 1.6rem;
    border-bottom: 0.1rem solid #2d3538;
    padding-bottom: 0.8rem;
  }

  p {
    margin-bottom: 1.6rem;
  }

  /* Bloco de código */
  pre {
    background-color: #161b22;
    padding: 1.6rem;
    border-radius: 0.8rem;
    overflow-x: auto;
    border: 0.1rem solid #30363d;
  }

  /* Código na linha (inline) */
  code {
    font-family: "Fira Code", monospace;
    background-color: rgba(110, 118, 129, 0.4);
    padding: 0.2rem 0.4rem;
    border-radius: 0.4rem;
    font-size: 1.4rem;
  }

  /* Tira o fundo do code quando ele está dentro de um pre (bloco grande) */
  pre code {
    background-color: transparent;
    padding: 0;
  }

  @media ${device.mobile} {
    padding: 1.6rem;

    &::before {
      margin-bottom: 1.6rem;
    }
  }
`;

// --- SESSÃO DE COMENTÁRIOS ---

// --- SESSÃO DE COMENTÁRIOS (MINIMALISTA E RESPONSIVA) ---

export const CommentsContainer = styled.section`
  background-color: #ffffff;
  border-radius: 1.6rem;
  padding: 3.2rem;
  margin-bottom: 4rem;
  color: #171d1f;

  h2 {
    font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 0.8rem;
  }

  @media (max-width: 1024px) {
    /* TABLET */
    padding: 2.4rem;
  }

  @media ${device.mobile} {
    padding: 2.4rem 1.6rem;
    border-radius: 0.8rem;
  }
`;

export const InputComment = styled.form`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  margin-bottom: 3.2rem;

  input {
    flex: 1;
    padding: 1.6rem;
    border-radius: 0.8rem;
    border: 0.1rem solid #cccccc;
    background-color: #f9f9f9;
    font-size: 1.4rem;
    outline: none;
    color: #171d1f;
    transition: all 0.2s ease;

    &:focus {
      border-color: #81fe88;
      background-color: #ffffff;
      box-shadow: 0 0 0 0.3rem rgba(129, 254, 136, 0.2);
    }

    &:disabled {
      background-color: #e9e9e9;
      cursor: not-allowed;
    }
  }

  button {
    background-color: #171d1f;
    color: #81fe88;
    border: none;
    padding: 1.6rem 2.4rem;
    border-radius: 0.8rem;
    font-size: 1.4rem;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;

    &:hover:not(:disabled) {
      background-color: #2d3538;
    }

    &:disabled {
      background-color: #cccccc;
      color: #888888;
      cursor: not-allowed;
    }
  }

  @media ${device.mobile} {
    flex-direction: column;
    align-items: stretch;
    gap: 1.2rem;
    input,
    button {
      padding: 1.4rem;
    }
  }
`;

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem; /* Mais respiro entre comentários principais */
  margin-top: 2.4rem;
`;

export const CommentItem = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: flex-start;
  animation: ${fadeIn} 0.3s ease-out forwards;

  /* Se for marcado como Solução, ganha um destaque sutil no fundo e borda */
  background-color: ${(props) =>
    props.$isSolution ? "rgba(255, 215, 0, 0.05)" : "transparent"};
  border: 0.1rem solid
    ${(props) => (props.$isSolution ? "rgba(255, 215, 0, 0.5)" : "transparent")};
  border-radius: 1.2rem;
  padding: ${(props) => (props.$isSolution ? "1.6rem" : "0")};

  @media ${device.mobile} {
    gap: 1.2rem;
  }
`;

export const CommentContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  /* Removemos o fundo cinza de balão para um visual mais limpo (estilo Twitter/Threads) */
  p {
    font-size: 1.5rem;
    color: #333333;
    line-height: 1.6;
    margin: 0.8rem 0;
  }
`;

export const CommentsContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CommentHeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;

  h4 {
    font-size: 1.6rem;
    font-weight: 700;
    color: #171d1f;
    margin: 0;
  }

  span {
    font-size: 1.4rem;
    color: #818388;
    font-weight: 500;
  }
`;

export const SolutionBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #d4af37 !important; /* Dourado */
  font-weight: 700 !important;
  font-size: 1.2rem !important;
  background-color: rgba(255, 215, 0, 0.1);
  padding: 0.2rem 0.8rem;
  border-radius: 1.2rem;
`;

export const AuthorActionsComment = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  margin-top: 0.8rem;
  flex-wrap: wrap; /* Para não quebrar em telas finas */

  .confirm-action {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    background-color: #ff5f5615;
    padding: 0.4rem 0.8rem;
    border-radius: 0.8rem;
  }

  .confirm-text {
    font-size: 1.2rem;
    color: #ff5f56;
    font-weight: 600;
  }
  .btn-confirm-yes,
  .btn-confirm-no {
    font-size: 1.2rem;
    padding: 0.2rem 0.6rem;
    border-radius: 0.4rem;
    border: none;
    cursor: pointer;
  }
  .btn-confirm-yes {
    background-color: #ff5f56;
    color: #fff;
  }
  .btn-confirm-no {
    background-color: transparent;
    color: #818388;
  }
`;

// Botão Genérico Minimalista para Curtir, Responder e Favoritar
export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: transparent;
  border: none;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease;

  /* Recebe a prop $active (ex: se já curtiu, fica vermelho. Se for solução, dourado) */
  color: ${(props) =>
    props.$active ? props.$activeColor || "#171d1f" : "#818388"};

  &:hover {
    color: ${(props) => props.$hoverColor || "#171d1f"};
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

export const RepliesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  margin-top: 2.4rem;
  padding-left: 2.4rem;
  border-left: 0.2rem solid #eaeaea; /* Linha de thread minimalista */

  @media (max-width: 1024px) {
    /* TABLET */
    padding-left: 1.6rem;
    gap: 1.6rem;
  }

  @media ${device.mobile} {
    padding-left: 1.2rem;
    margin-top: 1.6rem;
    border-left-width: 0.1rem; /* Linha mais fina no mobile */
  }
`;

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin-bottom: 4rem;

  /* A MÁGICA: Limita a largura no PC para não virarem botões gigantes */
  max-width: 65rem;
`;

export const ActionRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.6rem;

  @media ${device.mobile} {
    gap: 1.2rem;
  }
`;

export const ActionDivider = styled.hr`
  border: none;
  height: 0.1rem;
  background-color: #2d3538; /* Linha bem sutil */
  width: 100%;
  margin: 0.4rem 0;
`;

// --- BOTÕES GÊMEOS (MENORES NO PC, ÍCONES NO CELULAR) ---

export const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  width: 100%;

  /* Menos "gordos" no desktop */
  padding: 1.2rem 2.4rem;
  border-radius: 0.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;

  background-color: ${(props) =>
    props.$desabilitado
      ? "transparent"
      : props.$primary
        ? "#81fe88"
        : "#2d3538"};
  color: ${(props) =>
    props.$desabilitado ? "#555555" : props.$primary ? "#171d1f" : "#ffffff"};
  border: 0.1rem solid
    ${(props) => (props.$desabilitado ? "#555555" : "transparent")};

  &:hover {
    transform: ${(props) =>
      props.$desabilitado ? "none" : "translateY(-0.2rem)"};
    background-color: ${(props) =>
      props.$desabilitado
        ? "transparent"
        : props.$primary
          ? "#6be276"
          : "#3a4448"};
  }

  ${(props) =>
    props.$desabilitado && `cursor: not-allowed; pointer-events: none;`}

  svg {
    width: 1.8rem;
    height: 1.8rem;
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: ${(props) => (props.$desabilitado ? "none" : "scale(1.1)")};
  }

  /* MÁGICA DO MOBILE (Apenas Ícones Grandes) */
  @media ${device.mobile} {
    padding: 1.4rem;
    border-radius: 1.2rem; /* Arredondado estilo app */

    span {
      display: none; /* Some com o texto */
    }

    svg {
      width: 2.2rem; /* Aumenta o ícone para o dedo acertar fácil */
      height: 2.2rem;
    }
  }
`;

export const BigSocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  width: 100%;

  padding: 1.2rem 2.4rem;
  border-radius: 0.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  background-color: ${(props) => {
    if (props.$variant === "like")
      return props.$hasLiked ? "rgba(255, 95, 86, 0.1)" : "#2d3538";
    return "#2d3538";
  }};

  border: 0.1rem solid
    ${(props) => {
      if (props.$variant === "like")
        return props.$hasLiked ? "#ff5f56" : "transparent";
      return "transparent";
    }};

  color: ${(props) => {
    if (props.$variant === "like") return props.$hasLiked ? "#ff5f56" : "#fff";
    return "#fff";
  }};

  &:hover {
    transform: translateY(-0.2rem);
    background-color: ${(props) => {
      if (props.$variant === "like")
        return props.$hasLiked ? "rgba(255, 95, 86, 0.2)" : "#3a4448";
      return "#3a4448";
    }};
    color: ${(props) => (props.$variant === "share" ? "#81fe88" : "")};
  }

  svg {
    width: 1.8rem;
    height: 1.8rem;
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }

  /* MÁGICA DO MOBILE (Apenas Ícones Grandes) */
  @media ${device.mobile} {
    padding: 1.4rem;
    border-radius: 1.2rem;

    span {
      display: none;
    }

    svg {
      width: 2.2rem;
      height: 2.2rem;
    }
  }
`;
