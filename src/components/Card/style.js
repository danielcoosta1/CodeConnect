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

  /* Altura fixa para garantir uniformidade no Grid */
  height: 48rem; /* 480px - Ajuste conforme necessidade */

  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.2);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  color: #bcbcbc;
  border: 1px solid #2d3538;

  &:hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.4);
    border-color: #81fe88;
  }

  @media ${device.mobile} {
    height: auto; /* No celular é melhor deixar crescer para não cortar texto importante */
    min-height: 40rem;
  }
`;

export const ImgCard = styled.div`
  width: 100%;

  /* Altura fixa da imagem é CRUCIAL para o alinhamento */
  height: 18rem;
  /* Garante que a imagem não encolha se o texto for grande */
  flex-shrink: 0;

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

  /* Ocupa todo o espaço disponível restante */
  flex: 1;

  gap: 1rem;
  overflow: hidden; /* Garante que nada vaze */
`;

export const TitleCard = styled.h3`
  margin: 0.5rem 0;
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.3;

  /* Limita Título a 2 linhas máx */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Description = styled.p`
  font-size: 1.6rem;
  line-height: 1.5;
  color: #bcbcbc;

  /* Limita o texto para caber no card fixo */
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Mostra apenas 3 linhas */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* Empurra para o fundo do card, garantindo alinhamento no rodapé */
  margin-top: auto;

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
