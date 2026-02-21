import styled, { keyframes } from "styled-components";
import { device } from "../../styles/breakpoints";

const scaleUp = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Fica acima de TUDO no site */
  backdrop-filter: blur(0.5rem);
  padding: 2rem;
`;

export const ModalBox = styled.div`
  background-color: #171d1f;
  border-radius: 1.6rem;
  padding: 4rem;
  max-width: 45rem;
  width: 100%;
  text-align: center;
  border: 0.1rem solid #333;
  box-shadow: 0 1rem 4rem rgba(0, 0, 0, 0.5);
  animation: ${scaleUp} 0.3s ease-out forwards;

  @media ${device.mobile} {
    padding: 3.2rem 2.4rem;
  }
`;

export const Title = styled.h3`
  font-size: 2.4rem;
  color: #fff;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 1.6rem;
`;

export const Message = styled.p`
  font-size: 1.6rem;
  color: #cccccc;
  line-height: 1.5;
  margin-bottom: 3.2rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.6rem;

  @media ${device.mobile} {
    flex-direction: column-reverse; /* Cancelar embaixo, Confirmar em cima */
  }
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 1.2rem 2.4rem;
  border-radius: 0.8rem;
  border: 0.2rem solid #888888;
  background-color: transparent;
  color: #cccccc;
  font-size: 1.6rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
    border-color: #fff;
  }
`;

export const ConfirmButton = styled.button`
  flex: 1;
  padding: 1.2rem 2.4rem;
  border-radius: 0.8rem;
  border: none;
  /* Se for destrutivo (excluir/sair), fica vermelho. Senão, verde padrão. */
  background-color: ${(props) => (props.$isDestructive ? "#ff6b6b" : "#81fe88")};
  color: #132e35;
  font-size: 1.6rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-0.2rem);
    background-color: ${(props) => (props.$isDestructive ? "#ff4c4c" : "#6be276")};
    box-shadow: 0 0.4rem 1.2rem ${(props) => 
      props.$isDestructive ? "rgba(255, 107, 107, 0.3)" : "rgba(129, 254, 136, 0.3)"};
  }
`;