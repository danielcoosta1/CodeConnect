import styled from "styled-components";
import { Link } from "react-router-dom";

// 1. Reutilizamos a estrutura do Login para não duplicar código!
export {
  ContainerWrapper,
  ContainerContent,
  ContainerImg,
  ContainerForm,
  Form,
  CampoInput,
  Button
} from "../Login/style";

// 2. Criamos os componentes específicos apenas do Esqueci Senha:

export const LinkVoltar = styled(Link)`
  color: #a0a0a0;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.4rem;
  margin-bottom: 2rem;
  transition: 0.2s ease;

  &:hover {
    color: #81fe88;
  }
`;

export const BoxSucesso = styled.div`
  background-color: #2a3236;
  padding: 2rem;
  border-radius: 0.8rem;
  text-align: center;
  border: 1px solid rgba(129, 254, 136, 0.15); /* Um brilho sutil na borda */
`;

export const TituloSucesso = styled.p`
  color: #81fe88;
  font-size: 1.6rem;
  font-weight: bold;
  margin: 0;
`;

export const TextoSucesso = styled.p`
  color: #e1e1e1;
  font-size: 1.4rem;
  margin-top: 1rem;

  strong {
    color: #fff;
  }
`;