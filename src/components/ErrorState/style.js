import styled from "styled-components";
// Certifique-se de importar o device (breakpoints)
import { device } from "../../styles/breakpoints"; 

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  /* Desktop: 4rem (espaçoso) */
  padding: 4rem; 
  
  background-color: #171d1f;
  height: 60vh;
  text-align: center;
  gap: 1.5rem;
  width: 100%; /* Garante que ocupa a largura disponível */

  .error-icon {
    color: #ff6b6b;
    width: 6rem;
    height: 6rem;
    transition: width 0.3s ease; /* Efeito suave ao mudar de tela */
  }

  h3 {
    color: #e1e1e1;
    font-size: 2rem;
    margin: 0;
  }

  p {
    color: #a0a0a0;
    max-width: 40rem;
    margin: 0;
    line-height: 1.5;
    font-size: 1.6rem;
  }

  /* --- RESPONSIVIDADE FINA --- */
  @media ${device.mobile} {
    /* No celular, 4rem é muito espaço perdido. Reduzimos para 2rem. */
    padding: 2rem;
    height: auto; /* Deixa a altura flexível no mobile se precisar */
    min-height: 50vh;

    .error-icon {
      /* Ícone um pouco menor para não gritar na tela */
      width: 5rem;
      height: 5rem;
    }

    h3 {
      font-size: 1.8rem; /* Título levemente menor */
    }

    p {
      font-size: 1.4rem; /* Texto levemente menor */
      max-width: 100%; /* Aproveita a largura total do celular */
    }
  }
`;

export const RetryButton = styled.button`
  margin-top: 1.5rem;
  padding: 1rem 2.4rem;
  border-radius: 0.6rem;
  gap: 0.8rem;
  
  background-color: transparent;
  color: #88f2db;
  border: 0.1rem solid #88f2db;
  font-size: 1.6rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;

  svg {
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
    width: 100%; /* Botão full width no celular facilita o clique (dedo) */
    justify-content: center;
    padding: 1.2rem; /* Área de toque maior */
  }
`;