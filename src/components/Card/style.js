import styled from "styled-components";

export const CardContainer = styled.article`
  background-color: #171d1f;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ImgCard = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ContentCard = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const TitleCard = styled.h3`
  font-size: 1.1rem;
  color: #fff;
  margin-bottom: 8px;
`;

export const Description = styled.p`
  font-size: 0.9rem;
  color: #888;
  line-height: 1.4;
  margin-bottom: 16px;
  flex: 1; /* Empurra o rodapé para baixo se o texto for curto */
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }

  small {
    color: #bcbcbc;
    font-size: 0.85rem;
  }
`;

export const ActionIcons = styled.div`
  display: flex;
  gap: 12px;
`;

export const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #888;
  font-size: 0.85rem;
  cursor: pointer;

  &:hover {
    color: #81fe88;
  }
`;