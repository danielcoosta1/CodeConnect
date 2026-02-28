import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const PerfilContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 2rem;
  gap: 2.4rem;

  color: #bcbcbc;

  max-width: 100rem;
  margin: 0 auto;

  @media ${device.mobile} {
    padding: 1rem;
    gap: 1.6rem;
  }
`;

export const PerfilHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 3.2rem;

  background-color: #171d1f;
  padding: 3.2rem;
  border-radius: 1.6rem;

  position: relative;
  box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.2);

  /* Abaixo de 1024px (Tablet), o layout vira vertical para não quebrar */
  @media ${device.tablet} {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2.4rem 1.6rem;
    gap: 1.6rem;
  }
`;

export const BotaoSeguir = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 1.6rem;
  padding: 1.2rem 2.4rem;
  border-radius: 3rem; /* Bordas bem arredondadas estilo pílula */
  font-weight: 600;
  font-size: 1.6rem;
  cursor: pointer;

  /* Animação super suave para todas as transições */
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: fit-content;

  /* Ajuste dos Ícones */
  svg {
    font-size: 2rem;
    transition: transform 0.2s;
  }

  /* Animação de Loading */
  .spin {
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }

  /* ESTADO: NÃO SEGUE (Verde Vibrante e Convidativo) */
  background: ${(props) =>
    props.$isFollowing
      ? "rgba(255, 255, 255, 0.05)" /* Fundo de vidro escuro se já segue */
      : "linear-gradient(135deg, #28a745 0%, #218838 100%)"}; /* Gradiente se não segue */

  color: ${(props) => (props.$isFollowing ? "#bcbcbc" : "#ffffff")};

  border: 1px solid
    ${(props) =>
      props.$isFollowing ? "rgba(255, 255, 255, 0.1)" : "transparent"};

  box-shadow: ${(props) =>
    props.$isFollowing ? "none" : "0 4px 15px rgba(40, 167, 69, 0.3)"};

  /* EFEITO DE HOVER (Quando o mouse passa por cima) */
  &:hover:not(:disabled) {
    transform: translateY(-2px); /* Botão levanta levemente */

    /* Se já segue, fica vermelho sinalizando perigo (Destructive Action) */
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

    /* Mudança no ícone ao passar o mouse */
    svg {
      transform: ${(props) =>
        props.$isFollowing ? "scale(1.1)" : "scale(1.1) rotate(5deg)"};
    }
  }

  /* EFEITO DE CLIQUE */
  &:active:not(:disabled) {
    transform: translateY(0); /* Botão afunda de volta */
  }

  /* EFEITO DESABILITADO (Carregando) */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  /* RESPONSIVIDADE: MOBILE E TABLET */
  @media ${device.tablet} {
    width: 100%; /* Ocupa a tela inteira para facilitar o toque */
    margin-top: 2rem;
    padding: 1.4rem;
    font-size: 1.8rem;
    border-radius: 1.2rem; /* Borda menos redonda para preencher bem o espaço */
    justify-content: center;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  flex: 1;

  h2 {
    color: #ffffff;
    font-size: 3.2rem; /* Fonte grande no desktop */
    font-weight: 700;
    line-height: 1.2;
    margin: 0;
  }

  span {
    font-size: 1.6rem;
    color: #888888;
  }

  p.funcao {
    color: #81fe88;
    font-weight: bold;
    font-size: 1.4rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    margin-top: 0.4rem;
  }

  p.bio {
    margin-top: 1.2rem;
    font-size: 1.6rem;
    line-height: 1.5;
    color: #cccccc;
    max-width: 60rem; /* Limita largura para leitura confortável */
  }

  /* Ajustes Mobile */
  @media ${device.tablet} {
    align-items: center;

    h2 {
      font-size: 2.4rem;
    }
    p.bio {
      font-size: 1.4rem;
      text-align: center;
    }
  }
`;

export const StatsContainer = styled.div`
  display: flex;
  gap: 2.4rem;
  margin-top: 1.6rem;

  @media ${device.tablet} {
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.05);
    padding: 1rem 1.6rem;
    border-radius: 0.8rem;
    width: 100%;
  }
`;

export const StatItem = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;

  strong {
    color: #ffffff;
    font-size: 1.8rem;
  }

  span {
    font-size: 1.4rem;
    color: #888888;
  }

  @media ${device.tablet} {
    gap: 0.4rem;
    span {
      font-size: 1.2rem;
      text-transform: none;
    }
  }
`;

export const ProfileNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3.2rem;
  margin-top: 1.6rem;

  @media ${device.tablet} {
    gap: 1.6rem;
  }
`;

export const ProfileTab = styled.button`
  background: none;
  border: none;
  font-size: 1.6rem; /* Ajustado para padrão 16px visual */
  padding-bottom: 1rem;
  cursor: pointer;
  color: ${({ $active }) => ($active ? "#81fe88" : "#888888")};

  /* Pseudo-elemento para a linha animada */
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -0.1rem;
    left: 0;
    width: 100%;
    height: 0.2rem;
    background-color: #81fe88;
    transform: scaleX(${({ $active }) => ($active ? "1" : "0")});
    transition: transform 0.3s ease;
  }

  font-weight: ${({ $active }) => ($active ? "600" : "400")};
  transition: all 0.2s;

  &:hover {
    color: #ffffff;
  }
`;
