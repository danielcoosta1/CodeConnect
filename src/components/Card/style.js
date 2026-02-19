import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const CardContainer = styled.article`
  display: flex;
  flex-direction: column;

  background-color: #171d1f;
  border-radius: 0.8rem;
  padding: 1.6rem;
  gap: 1.6rem;

  width: 100%;

  height: 44rem;

  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.2);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  color: #bcbcbc;
  border: 0.1rem solid #2d3538;

  &:hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.4);
    border-color: #81fe88;
  }

  /* No mobile, é melhor deixar crescer para não cortar texto importante */
  @media ${device.mobile} {
    height: auto;
    min-height: 40rem;
  }
`;

export const ImgCard = styled.div`
  width: 100%;
  height: 18rem; /* Altura fixa para a imagem */
  flex-shrink: 0; /* Impede a imagem de encolher se o texto for grande */

  border-radius: 0.4rem;
  overflow: hidden;
  background-color: #2d3538;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  ${CardContainer}:hover & img {
    transform: scale(1.05);
  }
`;

export const ContentCard = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; /* Ocupa o espaço restante */
  gap: 1rem;
  overflow: hidden;
`;

export const TitleCard = styled.h3`
  margin: 0.5rem 0;
  font-size: 2.2rem; /* 22px visual */
  font-weight: 700;
  color: #fff;
  line-height: 1.3;

  /* Limita a 2 linhas */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media ${device.mobile} {
    font-size: 2rem;
  }
`;

export const Description = styled.p`
  font-size: 1.6rem;
  line-height: 1.5;
  color: #bcbcbc;

  /* Limita a 3 linhas */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media ${device.mobile} {
    font-size: 1.5rem;
    -webkit-line-clamp: 4;
  }
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto; /* Empurra para o fundo, mantendo alinhado */
  padding-top: 1.5rem;
  border-top: 0.1rem solid #2d3538;
  gap: 1rem;
`;

export const ActionIcons = styled.div`
  display: flex;
  gap: 1.5rem;
  color: #818388;
`;

export const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: color 0.2s;

  font-size: 1.4rem;
  font-weight: bold;

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  &:hover {
    color: #81fe88;
  }
`;

export const AuthorInfo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2d3538;
  }

  .author-text {
    display: flex;
    flex-direction: column;
  }

  small {
    color: #bcbcbc;
    font-size: 1.4rem;
    font-weight: 500;
  }

  @media ${device.mobile} {
    small {
      font-size: 1.2rem;
    }
  }
`;
