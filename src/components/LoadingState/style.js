import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column; /* Geralmente loadings ficam melhores em coluna (ícone em cima do texto) */
  align-items: center;
  justify-content: center;
  
  /* CONVERSÃO: 40px vira 4rem (base 10px) */
  padding: 4rem; 
  
  color: #88f2db;
  gap: 1.5rem; /* Ajustado para rem */
  background-color: #171d1f;
  
  /* Se quiser ocupar a tela toda, use 100vh, se for dentro de um componente, 100% */
  height: 60vh; 
  width: 100%;

  .spin {
    animation: ${rotate} 2s linear infinite;

    /* AQUI APLICAMOS O TAMANHO RESPONSIVO
       A mesma lógica do Avatar: divide por 16 para converter a escala.
       Se size=40 -> 2.5rem -> 25px visualmente.
    */
    width: ${(props) => props.$size / 16}rem;
    height: ${(props) => props.$size / 16}rem;
  }

  span {
    color: #e1e1e1;
    /* Ajustando a lógica do texto para rem */
    font-size: ${(props) => (props.$size > 30 ? "1.5rem" : "1.2rem")};
    text-align: center;
  }
`;
