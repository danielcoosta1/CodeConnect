import styled from "styled-components";
import { device } from "../../styles/breakpoints"; // Importando breakpoints

// --- WRAPPER GERAL ---
export const ContainerWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: #171d1f;

  padding: 3rem 4rem; /* 48px 64px */
  gap: 4rem; /* 64px */
  box-sizing: border-box;

  /* No Tablet (1280px), já vira coluna para não espremer o form */
  @media ${device.tablet} {
    flex-direction: column;
    padding: 2rem;
    gap: 2rem;
    align-items: center;
  }

  @media ${device.mobile} {
    padding: 1.5rem 1rem;
    padding-bottom: 6rem; /* Espaço extra embaixo por conta da BottomBar */
  }
`;

// --- COLUNA DA ESQUERDA (IMAGEM) ---
export const ContainerUploadImg = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 40rem; /* ~520px (limita a largura da imagem) */

  @media ${device.tablet} {
    max-width: 80%; /* No tablet, pode ocupar a largura toda */
    align-items: center;
  }
`;

export const ContainerImg = styled.div`
  background-color: #888888;
  border-radius: 1rem; /* 16px */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Img = styled.img`
  width: 100%; /* Ocupa 100% do ContainerImg */
  height: auto;
  object-fit: cover;
  display: block;

  /* Garante uma altura mínima visual se não tiver imagem */
  min-height: 15rem;
`;

export const ContainerButton = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  width: 100%;
`;

export const ButtonUploadImg = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  font-size: 1.1rem;
  font-weight: 600;
  color: #c1c1c1;

  padding: 1.2rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 2px solid #888888;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.3s;
  width: 100%;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: #e1e1e1;
    color: #fff;
  }

  img {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const ContainerSubtittle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #b0b0b0;
  margin-top: 1rem;
  font-size: 1rem;

  background: rgba(0, 0, 0, 0.2);
  padding: 0.8rem;
  border-radius: 0.375rem; /* 6px */

  img {
    cursor: pointer;
    width: 1.25rem; /* 20px */
    height: 1.25rem;
    transition: 0.2s;
    &:hover {
      opacity: 0.8;
    }
  }
`;

// --- COLUNA DA DIREITA (FORMULÁRIO) ---
export const ContainerForm = styled.div`
  flex: 1;
  width: 100%;
  color: #e1e1e1;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    font-weight: 700;
  }

  @media ${device.mobile} {
    h2 {
      font-size: 2rem;
      text-align: center;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media ${device.mobile} {
    gap: 1.5rem;
  }
`;

// --- MIXINS DE ESTILO (Para não repetir código) ---

const commonInputStyles = `
  width: 100%;
  padding: 1.2rem;
  font-size: 1.2rem; 
  color: #171d1f; 
  background-color: #bcbcbc; /* Um pouco mais claro que #888 para contraste */
  border: 2px solid transparent;
  border-radius: 0.5rem;
  font-family: inherit;
  transition: 0.2s;

  &::placeholder {
    color: #444;
    opacity: 0.8;
  }

  &:focus {
    outline: none;
    border-color: #81fe88;
    background-color: #d1d1d1;
  }
`;

const commonLabelStyles = `
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1.2rem; 
  color: #e1e1e1;
  font-weight: 600;
`;

export const CampoInput = styled.div`
  display: flex;
  flex-direction: column;

  label {
    ${commonLabelStyles}
  }
  input {
    ${commonInputStyles}
  }
`;

export const ContainerInputDescricao = styled.div`
  display: flex;
  flex-direction: column;

  label {
    ${commonLabelStyles}
  }

  textarea {
    ${commonInputStyles};
    min-height: 15rem; /* 240px */
    resize: vertical;
    line-height: 1.5;
  }
`;

export const ContainerTags = styled.div`
  display: flex;
  flex-direction: column;

  label {
    ${commonLabelStyles}
  }
  input {
    ${commonInputStyles}
  }
`;

// --- TAGS VISUAIS ---
export const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

export const TagItem = styled.li`
  background-color: #81fe88;
  color: #132e35;
  padding: 0.6rem 1rem;
  border-radius: 2rem;

  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
`;

export const TagRemoveButton = styled.button`
  background: none;
  border: none;
  color: #132e35;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  padding: 0;

  &:hover {
    color: #000;
  }
`;

// --- BOTÕES DE AÇÃO ---
export const ContainerBotoes = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;

  @media ${device.mobile} {
    flex-direction: column-reverse; /* Publicar em cima, Descartar embaixo */
    gap: 1rem;

    button {
      width: 100%;
    }
  }
`;

export const ErrorImg = styled.p`
  color: red;
  font-size: 1.4rem;
  margin-top: 1rem;

  @media ${device.tablet} {
    font-size: 1.25rem;
  }

  @media ${device.mobile} {
    font-size: 1rem;
  }
`;

export const BotaoDescartar = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  border: 2px solid #81fe88;
  color: #81fe88;
  background-color: transparent;

  padding: 1.2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  transition: 0.2s;

  &:hover {
    background-color: rgba(129, 254, 136, 0.1);
  }
`;

export const BotaoPublicar = styled.button`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  font-size: 1.1rem;
  background-color: #81fe88;
  color: #132e35;

  padding: 1.2rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;

  &:hover {
    background-color: #6be276;
    transform: translateY(-2px);
    box-shadow: 0 0.25rem 0.75rem rgba(129, 254, 136, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  /* SVG dentro do botão */
  svg {
    font-size: 1.3rem;
  }
`;
