import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { device } from "../../styles/breakpoints"; // <--- Importando nossos breakpoints

// --- ANIMAÇÃO DE ENTRADA (FADE IN) ---
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(1.25rem); /* 20px -> 1.25rem */
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
  max-width: 75rem; /* 1200px -> 75rem */

  background-color: #171d1f;
  border-radius: 1rem; /* 16px -> 1rem */
  overflow: hidden;
  box-shadow: 0 0.625rem 2.5rem rgba(0, 0, 0, 0.5); /* 10px 40px */

  /* RESPONSIVIDADE PADRONIZADA */
  /* Abaixo de 1280px (Tablet/Laptop pequeno), vira coluna única */
  @media ${device.tablet} {
    flex-direction: column;
    max-width: 37.5rem; /* ~600px */
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

  /* Some com a imagem no Tablet para focar no formulário */
  @media ${device.tablet} {
    display: none;
  }
`;

// --- ÁREA DO FORMULÁRIO ---
export const ContainerForm = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 4rem; /* 64px */
  gap: 2rem;
  position: relative;

  h1 {
    font-size: 3rem;
    font-weight: 700;
    color: #fff;
  }

  p {
    font-size: 1.3rem;
    color: #a0a0a0;
  }

  /* Ajustes finos para Mobile */
  @media ${device.mobile} {
    padding: 2rem;

    h1 {
      font-size: 2rem;
    }
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
    border-radius: 0.5rem; /* 8px */
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
  border-radius: 0.5rem; /* 8px */
  background-color: #81fe88;
  color: #01080e;

  font-weight: 800;
  font-size: 1.3rem;
  cursor: pointer;

  transition:
    transform 0.2s,
    background-color 0.2s;
  margin-top: 1rem;

  p {
    color: #132e35;
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

// --- LINKS DE LOGIN ---
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

// --- TELA DE SUCESSO ---
export const ContainerSucesso = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 2rem;
  text-align: center;
  animation: ${fadeIn} 0.6s ease-out;

  > p {
    color: #81fe88;
    font-size: 2.2rem;
    font-weight: 800;
    line-height: 1.2;
    /* Sombra em REM */
    text-shadow: 0 0 0.625rem rgba(129, 254, 136, 0.2);
  }
`;

export const ContainerLoginSucesso = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
  font-size: 1.3rem;
  color: #e1e1e1;

  p {
    font-size: 1.4rem;
    color: #ccc;
  }
`;

export const LinkLoginSucesso = styled(Link)`
  background-color: #81fe88;
  color: #132e35;

  padding: 1.5rem 2rem;
  width: 100%;

  border-radius: 0.5rem;
  font-weight: 800;
  font-size: 1.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  text-decoration: none;

  box-shadow: 0 0.25rem 0.9rem rgba(129, 254, 136, 0.3);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    background-color: #6be276;
    box-shadow: 0 0.375rem 1.25rem rgba(129, 254, 136, 0.5);
  }

  &:active {
    transform: translateY(0);
  }
`;
