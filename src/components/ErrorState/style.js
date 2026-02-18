import styled from "styled-components";

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: #171d1f;
  height: 60vh; /* Mantém a mesma altura do LoadingState para a tela não pular */
  text-align: center;
  gap: 15px;

  svg {
    color: #ff6b6b; /* Um vermelho/salmão moderno para indicar erro */
  }

  h3 {
    color: #e1e1e1;
    font-size: 1.5rem;
    margin: 0;
  }

  p {
    color: #a0a0a0;
    max-width: 400px;
    margin: 0;
    line-height: 1.5;
  }
`;

export const RetryButton = styled.button`
  margin-top: 15px;
  background-color: transparent;
  color: #88f2db;
  border: 1px solid #88f2db;
  padding: 10px 24px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #88f2db;
    color: #171d1f; /* Inverte a cor no hover */
  }

  &:active {
    transform: scale(0.98);
  }
`;