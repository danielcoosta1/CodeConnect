import styled from "styled-components";

export const FeedContainerMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FeedFilterContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const InputSearch = styled.input`
  padding: 10px;
  font-size: 16px;
`;

export const TagsFilterContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const FeedGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 10px;
`;

export const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #171d1f;
`;
