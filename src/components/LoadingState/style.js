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

  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #88f2db;
  gap: 10px;
  background-color: #171d1f;
  height: 60vh;
  .spin {
    animation: ${rotate} 2s linear infinite;
  }

  span {
    color: #e1e1e1;
    font-size: ${(props) => (props.$size > 30 ? "1.5rem" : "1rem")};
  }
`;
