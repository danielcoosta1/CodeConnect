import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const CardGrid = styled.section`
  display: grid;
  
  /* Forçamos a largura mínima de 320px (32rem) para os cards ficarem bem distribuídos */
  grid-template-columns: repeat(auto-fill, minmax(32rem, 1fr));
  gap: 2.4rem; /* Respiro entre os cards */
  
  align-items: start;
  width: 100%;
  justify-content: center;

  /* --- MOBILE --- */
  @media ${device.mobile} {
    grid-template-columns: 1fr; /* Uma coluna no celular */
    gap: 1.6rem;
    width: 100%;
  }
`;