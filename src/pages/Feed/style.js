import styled from "styled-components";

export const FeedContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #00090E;
`;

export const FeedFilterContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  background-color: #fff;
`;
