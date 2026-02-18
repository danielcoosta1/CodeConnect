import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const PerfilContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 1.5rem;
  gap: 2.5rem;

  color: #bcbcbc;

  /* Centraliza em monitores muito largos */
  max-width: 100rem;
  margin: 0 auto;
`;

export const PerfilHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 3rem;

  background-color: #171d1f;
  padding: 2.5rem; /* 40px */
  border-radius: 1rem; /* 16px */

  position: relative;
  box-shadow: 0px 0.25rem 0.625rem rgba(0, 0, 0, 0.2); /* Sombra sutil */

  /* --- MODO MOBILE (Pilha Vertical) --- */
  /* --- MUDANÇA IMPORTANTE --- */
  /* Abaixo de 1024px (Tablet), o layout vira vertical para não quebrar */
  @media ${device.tablet} {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem 1.25rem;
    gap: 1.5rem;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem; /* 12px */
  flex: 1;

  h2 {
    color: #ffffff;
    font-size: 2.5rem; /* 40px */
    font-weight: 700;
    line-height: 1.1;
    margin: 0;
  }

  span {
    font-size: 1.4rem; /* ~22px */
    color: #888888;
  }

  p.funcao {
    color: #81fe88;
    font-weight: bold;
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 0.06rem;
    margin-top: 0.3rem;
  }

  p.bio {
    margin-top: 0.625rem; /* 10px */
    font-size: 1.4rem;
    line-height: 1.5;
    color: #cccccc;
    max-width: 50rem; /* 800px - limita largura da leitura */
  }

  /* Ajustes para Tablet/Mobile */
  @media ${device.tablet} {
    align-items: center;

    h2 {
      font-size: 2rem;
    }
    p.bio {
      font-size: 1.1rem;
      text-align: center;
    }
  }
`;

/* --- Container dos Números (Seguidores/Compartilhamentos) --- */
export const StatsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 15px;

  @media ${device.tablet} {
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.05);
    padding: 0.625rem 1.25rem;
    border-radius: 0.5rem;
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
    font-size: 1.5rem;
  }

  span {
    font-size: 1.25rem;
    color: #888888;
  }
  @media ${device.tablet} {
    gap: 0.25rem;
    span {
      font-size: 1.1rem;
      text-transform: none;
    }
  }
`;

export const BtnEditar = styled.button`
  /* --- ESTILO PADRÃO (DESKTOP) --- */
  position: absolute;
  top: 2.5rem; /* 40px */
  right: 2.5rem; /* 40px */


  background: transparent;
  border: 1px solid #81fe88;
  color: #81fe88;

  padding: 0.625rem 1.25rem; /* 10px 20px */
  border-radius: 0.5rem; /* 8px */

  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 0.625rem; /* 10px */

  transition: all 0.2s;

  &:hover {
    background: #81fe88;
    color: #171d1f;
    transform: translateY(-2px);
  }

  /* --- MODO TABLET E MOBILE --- */
  @media ${device.tablet} {
    position: static; /* Sai do absolute */
    width: 100%;
    justify-content: center;
    margin-top: 0.625rem;
    padding: 0.75rem;
    background-color: rgba(129, 254, 136, 0.1);
  }
`;

/* --- NOVO: Barra de Navegação Interna (Abas) --- */
export const ProfileNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  margin-top: 0.625rem;

  @media ${device.tablet} {
    gap: 1.25rem;
  }
`;

// Botão que finge ser um Link (Tab)
export const ProfileTab = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  padding-bottom: 0.9rem; /* ~15px */
  cursor: pointer;
  color: ${({ $active }) => ($active ? "#81fe88" : "#888888")};

  /* Pseudo-elemento para a linha animada */
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 0.18rem; /* ~3px */
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
