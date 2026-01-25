import styled from "styled-components";

export const CardContainer = styled.article`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 12px;
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

export const ContentCard = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const TitleCard = styled.h3`
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

export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 40px;
    height: 40px;
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
