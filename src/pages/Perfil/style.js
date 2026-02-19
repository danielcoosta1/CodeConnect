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

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem; 
  flex: 1;

  h2 {
    color: #ffffff;
    font-size: 3.2rem; /* 32px - Nome grande de destaque */
    font-weight: 700;
    line-height: 1.2;
    margin: 0;
  }

  span {
    font-size: 1.6rem; /* 16px */
    color: #888888;
  }

  p.funcao {
    color: #81fe88;
    font-weight: bold;
    font-size: 1.4rem; /* 14px */
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    margin-top: 0.4rem;
  }

  p.bio {
    margin-top: 1.2rem; 
    font-size: 1.6rem; /* 16px - Leitura agradável */
    line-height: 1.5;
    color: #cccccc;
    max-width: 60rem; 
  }

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
    font-size: 1.8rem; /* 18px */
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

export const BtnEditar = styled.button`
  position: absolute;
  top: 3.2rem; 
  right: 3.2rem; 

  background: transparent;
  border: 0.1rem solid #81fe88;
  color: #81fe88;

  padding: 0.8rem 1.6rem; 
  border-radius: 0.8rem; 

  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 0.8rem; 

  transition: all 0.2s;

  svg {
    width: 1.4rem;
    height: 1.4rem;
  }

  &:hover {
    background: #81fe88;
    color: #171d1f;
    transform: translateY(-0.2rem);
  }

  @media ${device.tablet} {
    position: static; 
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
    padding: 1.2rem;
    background-color: rgba(129, 254, 136, 0.1);
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
  font-size: 1.6rem; /* Aumentado para leitura no mobile */
  padding-bottom: 1rem; 
  cursor: pointer;
  color: ${({ $active }) => ($active ? "#81fe88" : "#888888")};

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