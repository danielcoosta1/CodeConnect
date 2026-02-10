import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const ContainerEstilizado = styled.div`
  display: flex;
  min-height: 100vh;
  gap: 2rem;
  max-width: 120rem;
  margin: 0 auto;
  padding: 4rem 1rem 0 1rem; 

 /* --- TABLET (Barra fina) --- */
  @media ${device.tablet} {
    gap: 1rem;
    padding: 2rem 1rem 0 1rem;
  }

/* --- MOBILE (Barra fixa embaixo) --- */
  @media ${device.mobile} {
    display: block; /* Remove o flex lateral */
    padding: 1rem 1rem 0 1rem; 
    
    /* Padding bottom para a barra fixa não cobrir conteúdo */
    /* 90px -> ~5.6rem */
    padding-bottom: 5.6rem; 
  }

  main {
    flex: 1;
    width: 100%;
    background-color: #00090e;
    border-radius: 8px;
    padding: 1rem;
    overflow-x: hidden;
  }
`;