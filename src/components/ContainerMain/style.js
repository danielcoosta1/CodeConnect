import styled from "styled-components";

export const ContainerEstilizado = styled.div`
  display: flex;
  min-height: 100vh;
  gap: 2rem;
  max-width: 75rem;
  margin: 0 auto;
  padding: 5rem 0 0 0;

  main {
    flex: 1;
    overflow-x: auto; /* Permite scroll horizontal */
    padding: 0 1.5rem;
    background-color: #171d1f;
    border-radius: 8px; 
  }
`;
