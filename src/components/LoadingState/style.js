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
  flex-direction: column; /* Ícone em cima, texto embaixo */
  align-items: center;
  justify-content: center;

  /* Conversão de PX para REM (base 10px) */
  padding: 4rem; /* 40px */
  gap: 1.5rem; /* 15px */

  color: #88f2db;
  background-color: #171d1f;

  height: 60vh;
  width: 100%;

  .spin {
    animation: ${rotate} 2s linear infinite;

    /* MÁGICA DO TAMANHO RESPONSIVO:
       Se size=40 -> 2.5rem (25px visuais).
       Garante que escale junto com o zoom do site.
    */
    width: ${(props) => props.$size / 16}rem;
    height: ${(props) => props.$size / 16}rem;
  }

  span {
    color: #e1e1e1;

    font-size: ${(props) => (props.$size > 30 ? "1.6rem" : "1.4rem")};
    text-align: center;
  }
`;
