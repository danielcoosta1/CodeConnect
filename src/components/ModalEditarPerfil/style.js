import styled from "styled-components";
import { device } from "../../styles/breakpoints";

// --- VARIÁVEIS DE PADRONIZAÇÃO ---
const InputStyles = `
  width: 100%;
  padding: 1.2rem 1.6rem;
  font-size: 1.6rem; /* 16px para boa leitura */
  color: #171d1f;
  background-color: #888888;
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
`;

const LabelStyles = `
  display: block;
  margin-bottom: 0.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: #e1e1e1;
`;

// --- ESTRUTURA DO MODAL ---
export const ModalContainer = styled.div`
  position: fixed;
  inset: 0; /* Substitui top: 0, left: 0, width, height */
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(0.5rem);
`;

export const ModalContent = styled.div`
  background-color: #171d1f;
  border-radius: 1.6rem; 
  border: 0.1rem solid #333;
  padding: 4rem;
  width: 95%;
  max-width: 60rem; 
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 1rem 4rem rgba(0, 0, 0, 0.5);

  &::-webkit-scrollbar {
    width: 0.6rem;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 1rem;
  }

  /* Ajuste Mobile */
  @media ${device.mobile} {
    padding: 2rem;
    max-height: 95vh;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  border-bottom: 0.1rem solid #333; 
  padding-bottom: 2rem;

  h3 {
    margin: 0;
    font-size: 2.4rem; /* 24px */
    color: #fff;
    font-weight: 700;
  }

  button {
    background: transparent;
    border: none;
    color: #888;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    padding: 0.8rem;
    border-radius: 50%;
    font-size: 2rem;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: #ff6b6b; 
      transform: rotate(90deg);
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem; 
`;

// --- INPUTS PADRONIZADOS ---
export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    ${LabelStyles}
  }

  input {
    ${InputStyles}
  }

  textarea {
    ${InputStyles}
    min-height: 12rem; 
    resize: vertical;
    line-height: 1.5;
  }
`;

// Lógica para o "@" fixo dentro do Input
export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .input-com-prefixo {
    padding-left: 3.5rem; /* Abre espaço para o arroba */
  }
`;

export const InputPrefix = styled.span`
  position: absolute;
  left: 1.2rem;
  color: #171d1f;
  font-weight: bold;
  font-size: 1.6rem;
  z-index: 1;
`;

export const ErrorText = styled.span`
  color: #ff6b6b;
  font-size: 1.2rem;
  margin-top: 0.5rem;
  text-align: center;
`;

// --- ÁREA DA IMAGEM ---
export const ContainerUploadImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;  
  gap: 1.6rem;
  margin-bottom: 1rem;
`;

export const ContainerButton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
  align-items: center;
`;

export const ButtonUploadImg = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: #c1c1c1;
  padding: 1rem 2rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 0.1rem solid #888888;
  border-radius: 3rem; 
  cursor: pointer;
  transition: 0.3s;

  svg {
    font-size: 1.6rem;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: #81fe88;
    color: #fff;
  }
`;

// --- RODAPÉ E BOTÕES DE AÇÃO ---
export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end; 
  gap: 1.6rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 0.1rem solid #333; 

  /* No celular, os botões empilham para facilitar o clique com o polegar */
  @media ${device.mobile} {
    flex-direction: column-reverse;
  }
`;

export const BotaoCancelar = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
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

  @media ${device.mobile} {
    width: 100%;
  }
`;

export const BotaoSalvar = styled.button`
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

  &:hover {
    background-color: #6be276;
    transform: translateY(-0.2rem);
    box-shadow: 0 0.4rem 1.2rem rgba(129, 254, 136, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  @media ${device.mobile} {
    width: 100%;
  }
`;