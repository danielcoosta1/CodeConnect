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
  /* Recebe a prop $hasPosts para determinar o layout -  Essa parte sobescreve o display flex */
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
  max-width: 500px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #171d1f;
  transition: transform 0.3s ease;
`;

export const ImgCard = styled.div`
  width: 100%;
  height: 180px; /* Altura fixa para alinhar o grid */
  background-color: #2d3538; /* Cor de fundo caso a imagem demore ou seja png transparente */
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* A MÁGICA: Corta a imagem para preencher sem distorcer */
    object-position: center;
  }
`;

export const TitleCard = styled.h2`
margin: 1rem 0 0.5rem;
  font-size: 1.2rem;
  color: #fff;
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
