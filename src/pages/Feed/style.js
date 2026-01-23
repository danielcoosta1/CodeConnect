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
export const FeedGrid = styled.section`
  /* Comportamento padrão: Flex (para centralizar quando vazio) */
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;

  width: 100%;

  /* SE tiver posts ($hasPosts for true), vira Grid */
  /* Recebe a prop $hasPosts para determinar o layout -  Essa parte sobescreve o display flex */
  ${({ $hasPosts }) =>
    $hasPosts &&
    `
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 20px;
    align-items: start; /* Importante para cards não esticarem se tiverem alturas diferentes */
  `}
`;
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 15px;
  gap: 10px;
  min-height: 450px;
  width: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #171d1f;
  transition: transform 0.3s ease;
  color: #bcbcbc;
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
  font-size: 1.4rem;
`;

export const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
  margin-top: 8px; /* Espaço entre título e texto */

  /* A MÁGICA DO CSS PARA LIMITAR LINHAS: */
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limita a exatas 3 linhas */
  -webkit-box-orient: vertical;
  overflow: hidden; /* Esconde o que passar de 3 linhas */
  text-overflow: ellipsis; /* Adiciona o "..." no final */
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

export const ActionIcons = styled.div`
  display: flex;
  gap: 12px; /* Espaço entre o ícone de código e o de comentário */
  color: #818388;

  /* Estilo para os ícones */
  svg {
    cursor: pointer;
    transition: color 0.2s;
    &:hover {
      color: #88f2db; /* Cor de destaque ao passar o mouse */
    }
  }
`;

export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%; /* Deixa a imagem redonda */
    object-fit: cover;
    background-color: #2d3538; /* Cor de fundo se não tiver foto */
  }

  small {
    color: #818388;
    font-size: 1rem;
  }
`;

export const IconGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px; /* Espaço entre o ícone e o número */
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #88f2db;
  }

  span {
    font-size: 15px;
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
