import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const CardGrid = styled.section`
  display: grid;

  /* Desktop: Tenta colocar cards de 400px a 1fr.
     Se a tela for grande, cabem 3. Se for média, cabem 2.
  */
  grid-template-columns: repeat(
    auto-fill,
    minmax(25rem, 1fr)
  ); /* 400px -> 25rem */

  gap: 1.5rem; /* 24px */
  align-items: start;
  width: 100%;

  /* --- MOBILE --- */
  /* No celular, o grid vira uma coluna só (1fr) */
  @media ${device.mobile} {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;
