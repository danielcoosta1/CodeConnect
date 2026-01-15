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
  /* Comportamento padrão: Flex (para centralizar quando vazio) */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 100%;

  /* SE tiver posts ($hasPosts for true), vira Grid */
  ${({ $hasPosts }) =>
    $hasPosts &&
    `
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    align-items: start; /* Importante para cards não esticarem se tiverem alturas diferentes */
  `}
`;
export const Card = styled.div`
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #171d1f;
  transition: transform 0.3s ease;
`;

export const ImgCard = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 10px;
  img {
    width: 100%;
    height: auto;
    min-width: 70px;
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
