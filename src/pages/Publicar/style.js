import styled from "styled-components";
import { device } from "../../styles/breakpoints";

// --- MIXINS DE ESTILO (Sincronizados com o Modal) ---
const commonInputStyles = `
  width: 100%;
  padding: 1.2rem 1.6rem;
  font-size: 1.6rem; 
  color: #171d1f; 
  background-color: #888888; /* Escurecido para bater com o padrão */
  border: 0.2rem solid transparent;
  border-radius: 0.8rem;
  font-family: inherit;
  transition: 0.2s;

  &::placeholder {
    color: #333;
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    border-color: #81fe88;
    background-color: #999;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const commonLabelStyles = `
  display: block;
  margin-bottom: 0.8rem;
  font-size: 1.4rem; 
  color: #e1e1e1;
  font-weight: 600;
`;

// --- WRAPPER GERAL ---
export const ContainerWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: #171d1f;
  
  padding: 4rem; 
  gap: 4rem; 
  max-width: 120rem; /* Limita largura em telas muito grandes */
  margin: 0 auto;

  @media ${device.tablet} {
    flex-direction: column;
    padding: 3rem 2rem;
    gap: 3rem;
    align-items: center;
  }

  @media ${device.mobile} {
    padding: 2rem 1.6rem;
    padding-bottom: 8rem; /* Espaço extra embaixo por conta da BottomBar */
  }
`;

// --- COLUNA DA ESQUERDA (IMAGEM) ---
export const ContainerUploadImg = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 40rem; 

  @media ${device.tablet} {
    max-width: 70%; 
  }
   @media ${device.mobile} {
    max-width: 100%; 
  }
`;

export const ContainerImg = styled.div`
  background-color: #2d3538; /* Fundo escuro elegante se imagem não carregar */
  border-radius: 1.6rem; 
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 0.1rem solid #333;
  box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.2);
`;

export const Img = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
  min-height: 30rem; /* Altura mínima elegante para a capa do projeto */
`;

export const ContainerButton = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  width: 100%;
`;

export const ButtonUploadImg = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  font-size: 1.4rem;
  font-weight: 600;
  color: #c1c1c1;

  padding: 1.2rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 0.1rem solid #888888;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: 0.3s;
  width: 100%;

  svg {
    font-size: 1.8rem;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: #81fe88;
    color: #fff;
  }
`;

export const ContainerSubtittle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #b0b0b0;
  margin-top: 1rem;
  font-size: 1.2rem;

  background: rgba(0, 0, 0, 0.2);
  padding: 1rem 1.6rem;
  border-radius: 0.8rem; 

  img {
    cursor: pointer;
    width: 1.6rem; 
    height: 1.6rem;
    transition: 0.2s;
    &:hover {
      filter: brightness(1.5);
    }
  }
`;

// --- COLUNA DA DIREITA (FORMULÁRIO) ---
export const ContainerForm = styled.div`
  flex: 1;
  width: 100%;
  color: #e1e1e1;

  h2 {
    font-size: 3.2rem;
    margin-bottom: 2.4rem;
    font-weight: 700;
  }

  @media ${device.mobile} {
    h2 {
      font-size: 2.4rem;
      text-align: center;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
    min-height: 20rem; 
    resize: vertical;
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

export const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.6rem;
`;

export const TagItem = styled.li`
  background-color: #81fe88;
  color: #132e35;
  padding: 0.6rem 1.2rem;
  border-radius: 2rem;

  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: bold;
  font-size: 1.2rem;
`;

export const TagRemoveButton = styled.button`
  background: none;
  border: none;
  color: #132e35;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  padding: 0;

  &:hover {
    color: #000;
  }
`;

export const ErrorText = styled.p`
  color: #ff6b6b;
  font-size: 1.4rem;
  margin-top: 0.8rem;

  @media ${device.mobile} {
    font-size: 1.2rem;
  }
`;

// --- BOTÕES DE AÇÃO ---
export const ContainerBotoes = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;

  @media ${device.mobile} {
    flex-direction: column-reverse; 
    gap: 1.6rem;

    button {
      width: 100%;
    }
  }
`;

export const BotaoDescartar = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  border: 0.2rem solid #81fe88;
  color: #81fe88;
  background-color: transparent;

  padding: 1.2rem 2.4rem;
  border-radius: 0.8rem;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: bold;
  transition: 0.2s;

  &:hover {
    background-color: rgba(129, 254, 136, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const BotaoPublicar = styled.button`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  font-size: 1.6rem;
  background-color: #81fe88;
  color: #132e35;

  padding: 1.2rem 3.2rem;
  border-radius: 0.8rem;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;

  &:hover:not(:disabled) {
    background-color: #6be276;
    transform: translateY(-0.2rem);
    box-shadow: 0 0.4rem 1.2rem rgba(129, 254, 136, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  svg {
    font-size: 1.8rem;
  }

  .spin {
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;