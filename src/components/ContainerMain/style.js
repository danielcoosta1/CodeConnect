import styled from "styled-components";

export const ContainerEstilizado = styled.div`
  display: flex;
  min-height: 100vh;
  gap: 2rem;
  max-width: 120rem;
  margin: 0 auto;
  padding: 4rem 1rem 0 1rem; 

  /* TABLET: Ajusta o gap da barra lateral fina */
  @media (max-width: 1024px) {
    gap: 1rem;
    padding: 2rem 1rem 0 1rem;
  }

  /* MOBILE: Layout Vertical (Barra Fixa Embaixo) */
  @media (max-width: 768px) {
    display: block; /* Remove o flex lateral */
    padding: 1rem;
    
    /* CRUCIAL: Empurra o conteúdo pra cima para a barra não cobrir o último post */
    padding-bottom: 90px; 
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