import styled from "styled-components";

export const ContainerEstilizado = styled.div`
  display: flex;
  min-height: 100vh;
  gap: 2rem;
  max-width: 100rem;
  margin: 0 auto;
  padding: 5rem 0 0 0;

  main {
    flex: 1;
    overflow-x: auto; /* Permite scroll horizontal */
    width: 100%;
    padding: 0 1rem;
    background-color: #00090e;
    border-radius: 8px;
  }
`;
