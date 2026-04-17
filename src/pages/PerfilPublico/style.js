import styled from "styled-components";
import { device } from "../../styles/breakpoints";

// ESTE É O ÚNICO COMPONENTE EXCLUSIVO DO PERFIL PÚBLICO
export const BotaoSeguir = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 1.6rem;
  padding: 1.2rem 2.4rem;
  border-radius: 3rem; 
  font-weight: 600;
  font-size: 1.6rem;
  cursor: pointer;

  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: fit-content;

  svg {
    font-size: 2rem;
    transition: transform 0.2s;
  }

  .spin {
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }

  background: ${(props) =>
    props.$isFollowing
      ? "rgba(255, 255, 255, 0.05)" 
      : "linear-gradient(135deg, #28a745 0%, #218838 100%)"}; 

  color: ${(props) => (props.$isFollowing ? "#bcbcbc" : "#ffffff")};

  border: 1px solid
    ${(props) =>
      props.$isFollowing ? "rgba(255, 255, 255, 0.1)" : "transparent"};

  box-shadow: ${(props) =>
    props.$isFollowing ? "none" : "0 4px 15px rgba(40, 167, 69, 0.3)"};

  &:hover:not(:disabled) {
    transform: translateY(-2px); 

    background: ${(props) =>
      props.$isFollowing
        ? "rgba(220, 53, 69, 0.1)"
        : "linear-gradient(135deg, #218838 0%, #1e7e34 100%)"};

    border-color: ${(props) =>
      props.$isFollowing ? "#dc3545" : "transparent"};
    color: ${(props) => (props.$isFollowing ? "#dc3545" : "#ffffff")};

    box-shadow: ${(props) =>
      props.$isFollowing
        ? "0 4px 15px rgba(220, 53, 69, 0.2)"
        : "0 6px 20px rgba(40, 167, 69, 0.4)"};

    svg {
      transform: ${(props) =>
        props.$isFollowing ? "scale(1.1)" : "scale(1.1) rotate(5deg)"};
    }
  }

  &:active:not(:disabled) {
    transform: translateY(0); 
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media ${device.tablet} {
    width: 100%; 
    margin-top: 2rem;
    padding: 1.4rem;
    font-size: 1.8rem;
    border-radius: 1.2rem; 
    justify-content: center;
  }
`;