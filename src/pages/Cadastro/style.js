import { Link } from "react-router-dom";
import styled from "styled-components";

// --- WRAPPER GERAL (Idêntico ao Login) ---
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

// --- O CARTÃO CENTRAL (Idêntico ao Login) ---
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

// --- ÁREA DA IMAGEM (Idêntico ao Login) ---
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

// --- ÁREA DO FORMULÁRIO (Ajustado para Cadastro) ---
export const ContainerForm = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem;
  gap: 2rem;

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
  gap: 1.5rem; // Um pouco menos de gap pois tem mais campos que o login
  width: 100%;
`;

// --- INPUTS PADRONIZADOS (Idêntico ao Login) ---
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
  color: #01080e; // Cor escura do Figma
  font-weight: 800;
  font-size: 1.3rem;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
  margin-top: 1rem;

  p{
    color: #132E35;
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
  flex-direction: column; // Mudei para coluna para ficar mais limpo em mobile
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

// --- TELA DE SUCESSO (Específico do Cadastro) ---
export const ContainerSucesso = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  text-align: center;
  
  // O texto de sucesso fica maior
  p {
    color: #81fe88;
    font-size: 1.5rem; 
    font-weight: bold;
  }
`;

export const ContainerLoginSucesso = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  font-size: 1.2rem;
  color: #e1e1e1;
`;

export const LinkLoginSucesso = styled(Link)`
  background-color: #81fe88; // Botão sólido para chamar atenção
  color: #01080e;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: 0.2s;

  &:hover {
    transform: translateY(-2px);
    background-color: #6be276;
  }
`;