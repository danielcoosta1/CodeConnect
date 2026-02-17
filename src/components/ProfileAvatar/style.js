import styled from "styled-components";
import { device } from "../../styles/breakpoints";
export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  /* AQUI ESTÁ A MÁGICA:
     Convertemos o valor bruto (ex: 40) para REM base 16.
     Assim, quando o navegador aplicar o zoom de 62.5% (10px),
     o avatar vai encolher proporcionalmente. 
  */
  width: ${(props) => props.$size / 16}rem;
  height: ${(props) => props.$size / 16}rem;

  /* Garante que não esmague */
  min-width: ${(props) => props.$size / 16}rem;
  min-height: ${(props) => props.$size / 16}rem;

  border-radius: 50%;
  overflow: hidden;
  background-color: #2a2a2a;

  /* Borda também em rem para ficar fininha e proporcional */
  border: ${(props) => (props.$hasBorder ? "0.3rem solid #81fe88" : "none")};

  /* Isso garante que o ícone do React-Icons (SVG) obedeça ao tamanho do Wrapper */
  svg {
    width: 60%; /* O ícone geralmente fica melhor um pouco menor que a bola */
    height: 60%;
  }

  @media ${device.mobile} {
    border: ${(props) => (props.$hasBorder ? "0.1rem solid #81fe88" : "none")};
  }
`;

export const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
