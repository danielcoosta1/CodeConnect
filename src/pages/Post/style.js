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

// --- NOVOS CONTAINERS ---

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

  pre {
    margin: 0;
  }

  code {
    font-family: "Fira Code", "Courier New", Courier, monospace;
    font-size: 1.4rem;
    color: #e6edf3;
    line-height: 1.6;
  }

  /* --- ADD RESPONSIVIDADE NO FINAL --- */
  @media ${device.mobile} {
    padding: 1.6rem;

    &::before {
      margin-bottom: 1.6rem;
    }
  }
`;

export const CommentsContainer = styled.section`
  background-color: #ffffff; /* O fundo branco que você pediu! */
  border-radius: 1.6rem;
  padding: 3.2rem;
  margin-bottom: 4rem;
  color: #171d1f; /* Aqui o texto PRECISA ser escuro para dar contraste */

  h2 {
    font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 0.8rem;
  }

  p {
    font-size: 1.6rem;
    color: #555555;
    margin-bottom: 2.4rem;
  }

  @media ${device.mobile} {
    padding: 2.4rem 1.6rem;
  }
`;

export const FakeInputComment = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;

  input {
    flex: 1;
    padding: 1.6rem;
    border-radius: 0.8rem;
    border: 0.1rem solid #cccccc;
    background-color: #f9f9f9;
    font-size: 1.4rem;
    outline: none;

    &:focus {
      border-color: #81fe88;
    }
  }

  button {
    background-color: #171d1f;
    color: #81fe88;
    border: none;
    padding: 1.6rem 2.4rem;
    border-radius: 0.8rem;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background-color: #2d3538;
    }
  }
  @media ${device.mobile} {
    flex-direction: column; /* Empilha o input e o botão */
    align-items: stretch; /* Estica ambos até as bordas */
    gap: 1.2rem;

    button {
      width: 100%; /* Botão grandão no mobile */
      padding: 1.4rem;
    }
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  gap: 1.6rem;
  margin-bottom: 3.2rem;
  flex-wrap: wrap; /* Se a tela for pequena, eles quebram de linha bonitinhos */
`;

export const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center; /* Centraliza o ícone quando o texto sumir */
  gap: 0.8rem;
  padding: 1.2rem 2.4rem;
  border-radius: 0.8rem;
  font-size: 1.6rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;

  /* Se tiver a prop $primary, fica verdinho. Senão, fica cinza escuro. */
  background-color: ${(props) => (props.$primary ? "#81fe88" : "#2d3538")};
  color: ${(props) => (props.$primary ? "#171d1f" : "#ffffff")};

  &:hover {
    transform: translateY(-0.2rem);
    background-color: ${(props) => (props.$primary ? "#6be276" : "#3a4448")};
    box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.2);
  }

  /* --- MÁGICA DO MOBILE AQUI --- */
  @media ${device.mobile} {
    padding: 1.2rem; /* Deixa o botão mais quadradinho */

    span {
      display: none; /* Esconde o texto */
    }

    svg {
      width: 2.2rem; /* Aumenta um pouquinho o ícone para facilitar o clique */
      height: 2.2rem;
    }
  }
`;
