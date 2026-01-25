import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  height: 60vh;
  align-items: center;
  border-radius: 8px;
  gap: 15px;
  font-size: 30px;
  color: #bcbcbc;
  justify-content: center;
  background-color: #171d1f;
  margin-top: 50px;
  .spin {
    animation: ${rotate} 3s linear infinite;
  }
`;

export const FeedContainerMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
`;

export const FeedFilterContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

export const TagsFiltersContainer = styled.section`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  justify-content: space-between;
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

export const TagItem = styled.li`
  background-color: #888888;
  padding: 0.3em 0.5em;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  display: flex;

  span {
    font-size: 0.85rem;
    color: #171d1f;
    margin-right: 0.5rem;
    text-transform: uppercase;
    font-weight: bold;
  }
`;

export const TagRemoveButton = styled.button`
  background: none;
  border: none;
  color: #171d1f;
  cursor: pointer;
  font-size: 1rem;
`;

export const InputSearch = styled.input`
  padding: 10px;
  font-size: 16px;
  margin-top: 10px;
  background-color: #171d1f;
  font-size: 20px;
  color: #ffffff;
  border: 1px solid #444c4e;
  padding: 12px 15px;

  &:focus {
    outline: none;
    border-color: #81fe88;
  }
`;

export const ExcluirTudoButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;

  cursor: pointer;
  font-size: 20px;

  &:hover {
    border: 1px solid #81fe88;
    padding: 2px 6px;
    border-radius: 4px;
  }
`;

export const NoPostsContainer = styled.div`
  text-align: center;
  font-size: 18px;
  background-color: #171d1f;
  padding: 40px; /* Um pouco mais de respiro */
  border-radius: 8px;
  color: #fff;
  width: 100%;
  max-width: 600px; /* Para não ficar muito largo em telas grandes */
`;
