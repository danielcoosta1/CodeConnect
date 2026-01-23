import styled from "styled-components";

// Esse componente é 100% focado em layout.
// Ele assume que, se foi chamado, é porque existem posts para exibir.
export const CardGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 20px;
  align-items: start;
`;
