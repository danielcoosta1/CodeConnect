import styled from "styled-components";

// Esse componente é 100% focado em layout.
// Ele assume que, se foi chamado, é porque existem posts para exibir.
export const CardGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(400px, 1fr)
  ); /* Tamanho ideal para os cards */
  gap: 24px;
  width: 100%;
  align-items: start; /* Impede que um card estique o outro na mesma linha */
`;
