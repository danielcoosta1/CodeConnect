import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const CardGrid = styled.section`
  display: grid;
  
  /* MUDANÇA CRUCIAL:
     De 25rem (250px) para 32rem (320px).
     Isso força os cards a serem mais largos. 
     Se a tela não tiver espaço para 3 cards de 320px, ele quebra para 2 automaticamente.
  */
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));

  /* Aumentei o gap para dar mais respiro entre os cards */
  gap: 2.4rem; /* ~24px */
  
  align-items: start;
  width: 100%;
  
  /* Centraliza o grid se sobrar espaço nas laterais */
  justify-content: center;

  /* --- MOBILE --- */
  @media ${device.mobile} {
    /* No celular, forçamos 1 coluna ocupando 100% */
    grid-template-columns: 1fr;
    gap: 1.6rem;
    
    /* Opcional: Se quiser que no celular os cards não colem na borda */
    width: 100%;
  }
`;