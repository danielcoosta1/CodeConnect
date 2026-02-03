import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// --- ANIMAÇÃO DE ENTRADA (FADE IN) ---
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// --- WRAPPER GERAL ---
export const ContainerWrapper = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: #01080e;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e1e1e1;
  padding: 2rem;
`;

// --- O CARTÃO CENTRAL ---
export const ContainerContent = styled.section`
  display: flex;
  width: 100%;
  max-width: 1200px;
  background-color: #171d1f;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);

  @media (max-width: 900px) {
    flex-direction: column;
    max-width: 600px;
  }
`;

// --- ÁREA DA IMAGEM ---
export const ContainerImg = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #171d1f;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 900px) {
    display: none; 
  }
`;

// --- ÁREA DO FORMULÁRIO ---
export const ContainerForm = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem;
  gap: 2rem;
  position: relative; // Para centralizar o sucesso

  h1 {
    font-size: 3rem;
    font-weight: 700;
    color: #fff;
  }

  p {
    font-size: 1.3rem;
    color: #a0a0a0;
  }

  @media (max-width: 1024px) {
    padding: 3rem;
    h1 { font-size: 2.5rem; }
  }

  @media (max-width: 480px) {
    padding: 2rem;
    h1 { font-size: 2rem; }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

// --- INPUTS PADRONIZADOS ---
export const CampoInput = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #e1e1e1;
    font-weight: 600;
  }

  input {
    padding: 1.2rem 1.5rem;
    border: 2px solid transparent;
    border-radius: 8px;
    background-color: #2a3236;
    color: white;
    font-size: 1.2rem;
    transition: all 0.2s ease-in-out;

    &::placeholder {
      color: #888;
      font-size: 1.1rem;
    }

    &:focus {
      outline: none;
      background-color: #333c42;
      border-color: #81fe88;
    }
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1.2rem;
  border: none;
  border-radius: 8px;
  background-color: #81fe88;
  color: #01080e;
  font-weight: 800;
  font-size: 1.3rem;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
  margin-top: 1rem;

  p {
    color: #132E35;
    margin: 0;
  }

  &:hover {
    background-color: #6be276;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

// --- LINKS DE LOGIN (Rodapé do form) ---
export const ContainerLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
  margin-top: 1rem;
  
  p {
    font-size: 1.3rem;
  }
`;

export const LinkLogin = styled(Link)`
  color: #81fe88;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.4rem;
  gap: 0.5rem;
  text-decoration: none;
  transition: 0.2s;

  &:hover {
    text-decoration: underline;
    color: #fff;
  }
`;

// --- TELA DE SUCESSO (CAPRICHADA) 🚀 ---
export const ContainerSucesso = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%; // Ocupa a altura toda do container pai
  gap: 2rem;
  text-align: center;
  animation: ${fadeIn} 0.6s ease-out; // Animação de entrada suave

  // O texto "Cadastro realizado com sucesso"
  > p {
    color: #81fe88;
    font-size: 2.2rem; // Bem grande
    font-weight: 800;
    line-height: 1.2;
    text-shadow: 0 0 10px rgba(129, 254, 136, 0.2); // Leve brilho
  }
`;

export const ContainerLoginSucesso = styled.div`
  width: 100%; // Ocupa largura total
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
  font-size: 1.3rem;
  color: #e1e1e1;
  
  // Texto "Você já pode fazer..."
  p {
    font-size: 1.4rem;
    color: #ccc;
  }
`;

export const LinkLoginSucesso = styled(Link)`
  background-color: #81fe88;
  color: #132e35; // Cor escura para contraste alto
  
  padding: 1.5rem 2rem; // Botão GORDO
  width: 100%; // Botão LARGO
  
  border-radius: 8px;
  font-weight: 800;
  font-size: 1.5rem; // Letra GRANDE
  
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  text-decoration: none;
  
  box-shadow: 0 4px 15px rgba(129, 254, 136, 0.3); // Sombra verde
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    background-color: #6be276;
    box-shadow: 0 6px 20px rgba(129, 254, 136, 0.5);
  }

  &:active {
    transform: translateY(0);
  }
`;