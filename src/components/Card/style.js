import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const CardContainer = styled.article`
  display: flex;
  flex-direction: column;
  
  background-color: #171d1f;
  border-radius: 0.5rem; /* 8px */
  padding: 1rem;
  gap: 1rem;
  
  width: 100%;
  min-height: 28rem; /* ~450px */
  
  box-shadow: 0 0.125rem 0.3rem rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: #bcbcbc;

  &:hover {
    transform: translateY(-0.3rem); /* Levanta um pouco mais */
    box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.3);
  }

  /* Ajuste Mobile */
  @media ${device.mobile} {
    min-height: auto; /* Deixa altura automática no celular */
  }
`;

export const ImgCard = styled.div`
  width: 100%;
  height: 12.5rem; /* 200px (Aumentei um pouco) */
  border-radius: 0.25rem;
  overflow: hidden;
  background-color: #2d3538; 

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; 
    transition: transform 0.5s ease;
  }

  /* Efeito de zoom na imagem ao passar o mouse no card */
  ${CardContainer}:hover & img {
    transform: scale(1.05);
  }
`;

export const ContentCard = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; 
  gap: 0.5rem;
`;

export const TitleCard = styled.h3`
  margin: 0.5rem 0;
  font-size: 1.5rem; /* Aumentado para Desktop */
  font-weight: 700;
  color: #fff;
  line-height: 1.2;

  @media ${device.mobile} {
    font-size: 1.3rem;
  }
`;

export const Description = styled.p`
  font-size: 1.125rem; /* 18px - Texto mais legível */
  line-height: 1.6;
  color: #bcbcbc;
  
  /* Limita linhas */
  display: -webkit-box;
  -webkit-line-clamp: 3; 
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media ${device.mobile} {
    font-size: 1rem; /* 16px no mobile */
    -webkit-line-clamp: 4; /* Mostra um pouco mais no mobile  */
  }
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto; /* Empurra para o fundo */
  padding-top: 1rem;
  border-top: 1px solid #333; /* Linha sutil separando footer */
`;

export const ActionIcons = styled.div`
  display: flex;
  gap: 1rem; 
  color: #818388;
`;

export const IconGroup = styled.div`
  display: flex;
  align-items: center; /* Ícone ao lado do número */
  gap: 0.4rem; 
  cursor: pointer;
  transition: color 0.2s;
  
  font-size: 0.9rem;
  font-weight: bold;

  &:hover {
    color: #81fe88; /* Verde do tema */
  }

  svg {
    font-size: 1.2rem;
  }
`;

export const AuthorInfo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  text-decoration: none; 
  color: inherit; 

  padding: 0.4rem 0.6rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2d3538; 
  }

  small {
    color: #bcbcbc;
    font-size: 1rem; /* Nome maior */
    font-weight: 500;
  }
  
  @media ${device.mobile} {
    small { font-size: 0.9rem; }
  }
`;