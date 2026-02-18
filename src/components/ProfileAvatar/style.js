import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  /* AQUI A MÁGICA: Convertemos o valor numérico (ex: 40) para REM (2.5rem) */
  width: ${(props) => props.$size / 16}rem;
  height: ${(props) => props.$size / 16}rem;
  
  /* Garante que não esmague */
  min-width: ${(props) => props.$size / 16}rem;
  min-height: ${(props) => props.$size / 16}rem;

  border-radius: 50%;
  overflow: hidden;
  background-color: #2a2a2a;
  
  /* Borda em REM */
  border: ${(props) => (props.$hasBorder ? "0.3rem solid #81fe88" : "none")};

  /* Controlamos o tamanho do ícone SVG aqui dentro para ele ser responsivo */
  svg {
    width: 60%;
    height: 60%;
  }

  /* Ajuste fino para Mobile: Borda mais delicada */
  @media ${device.mobile} {
    border: ${(props) => (props.$hasBorder ? "0.1rem solid #81fe88" : "none")};
  }
`;

export const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;