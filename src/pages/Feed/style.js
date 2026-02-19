import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const FeedContainerMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 3rem; 
  padding: 2rem;
  
  width: 100%;
  max-width: 120rem; /* Limita largura em telas muito grandes */
  margin: 0 auto;

  @media ${device.mobile} {
    padding: 1rem; 
    gap: 2rem;
  }
`;

export const FeedFilterContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100rem; /* Largura máxima para a busca não ficar esticada demais */
`;

export const InputSearch = styled.input`
  width: 100%;
  background-color: #171d1f;
  color: #ffffff;
  border: 0.1rem solid #444c4e; 
  
  padding: 1.2rem 1.6rem;
  font-size: 1.6rem; 
  border-radius: 0.8rem;
  margin-top: 1rem;

  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #81fe88;
  }

  &::placeholder {
    color: #5d6669;
  }
`;

export const TagsFiltersContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-top: 1.5rem;
  width: 100%;

  @media ${device.mobile} {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap; 
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const TagItem = styled.li`
  background-color: #2d3538;
  padding: 0.6rem 1.2rem;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  border: 0.1rem solid #444c4e;

  span {
    font-size: 1.2rem;
    color: #e1e1e1;
    font-weight: 600;
    text-transform: uppercase;
  }
`;

export const TagRemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff6b6b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  svg {
    font-size: 1.6rem;
  }

  &:hover {
    color: #ff4c4c;
  }
`;

export const ExcluirTudoButton = styled.button`
  background-color: transparent;
  color: #a0a0a0;
  border: none;
  cursor: pointer;
  font-size: 1.4rem;
  white-space: nowrap;
  
  &:hover {
    color: #ff6b6b;
    text-decoration: underline;
  }

  @media ${device.mobile} {
    align-self: flex-end;
  }
`;

export const NoPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  text-align: center;
  background-color: #171d1f;
  
  padding: 4rem;
  border-radius: 0.8rem;
  width: 100%;
  max-width: 60rem;
  margin-top: 4rem;

  p {
    font-size: 1.8rem;
    color: #e1e1e1;
  }
`;

export const LimparBuscaButton = styled.button`
  background-color: transparent;
  color: #88f2db;
  border: 0.1rem solid #88f2db;
  padding: 1rem 2rem;
  border-radius: 0.8rem;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: bold;
  transition: all 0.2s;

  &:hover {
    background-color: #88f2db;
    color: #171d1f;
  }

  @media ${device.mobile} {
    width: 100%;
  }
`;