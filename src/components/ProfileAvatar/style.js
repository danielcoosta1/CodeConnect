import styled from "styled-components";

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  min-width: ${props => props.$size}px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #2a2a2a;
  border: ${props => props.$hasBorder ? "3px solid #81fe88" : "none"};
`;

export const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;