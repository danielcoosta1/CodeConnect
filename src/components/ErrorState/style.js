import styled from "styled-components";
// Certifique-se de importar o device para os breakpoints
import { device } from "../../styles/breakpoints"; 

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  /* Conversão PX -> REM */
  padding: 4rem; /* 40px */
  gap: 1.5rem; /* 15px */
  
  background-color: #171d1f;
  height: 60vh;
  text-align: center;
  width: 100%;

  .error-icon {
    color: #ff6b6b;
    /* Tamanho do ícone controlado em REM (60px) */
    width: 6rem;
    height: 6rem;
    transition: width 0.3s ease, height 0.3s ease;
  }

  h3 {
    color: #e1e1e1;
    font-size: 2rem; /* Aumentado para destaque visual */
    margin: 0;
  }

  p {
    color: #a0a0a0;
    max-width: 40rem; /* 400px - evita que o texto fique comprido demais em PC */
    margin: 0;
    line-height: 1.5;
    font-size: 1.6rem; /* Garante os 16px */
  }

  /* --- RESPONSIVIDADE MOBILE --- */
  @media ${device.mobile} {
    padding: 2rem;
    height: auto; 
    min-height: 50vh;

    .error-icon {
      width: 5rem; /* Ícone diminui um pouco */
      height: 5rem;
    }

    h3 {
      font-size: 1.8rem; 
    }

    p {
      font-size: 1.4rem; 
      max-width: 100%; 
    }
  }
`;

export const RetryButton = styled.button`
  margin-top: 1.5rem;
  background-color: transparent;
  color: #88f2db;
  border: 0.1rem solid #88f2db;
  
  /* Conversão PX -> REM */
  padding: 1rem 2.4rem; 
  border-radius: 0.6rem; 
  gap: 0.8rem;
  
  font-size: 1.6rem; /* Texto do botão visível */
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;

  svg {
    /* Tamanho do ícone de refresh (18px) */
    width: 1.8rem;
    height: 1.8rem;
  }

  &:hover {
    background-color: #88f2db;
    color: #171d1f; 
  }

  &:active {
    transform: scale(0.98);
  }

  /* Ajuste no botão para mobile */
  @media ${device.mobile} {
    width: 100%; /* Botão full width facilita o toque */
    justify-content: center;
    padding: 1.2rem; 
  }
`;