import styled from "styled-components";
import { NavLink } from "react-router-dom";

// 1. O Container principal
export const SidebarContainer = styled.aside`
  width: 280px; /* Largura padrão Desktop */
  height: 100vh;
  background-color: #171d1f;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 1rem;
  border-radius: 8px;
  
  /* Fixar na tela para não rolar junto com o feed */
  position: sticky;
  top: 0;

  /* --- MODO TABLET/MOBILE (Barra Fina) --- */
  @media (max-width: 1000px) {
    width: 80px; /* Encolhe a largura */
    padding: 2rem 0.5rem; /* Diminui o padding lateral */
    align-items: center; /* Centraliza tudo */
  }
`;

export const Nav = styled.nav`
  width: 100%;
  margin-top: 4rem;
`;

export const ListaNav = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.5rem;
`;

// 2. A Logo
export const LogoImg = styled.img`
  /* No modo fino, vamos esconder a logo ou diminuir muito */
  @media (max-width: 1000px) {
    display: none; /* Opção: esconder para ganhar espaço */
    /* Ou width: 40px; se quiser manter */
  }
`;

// 3. O Botão Publicar
export const LinkPublicarEstilizado = styled(NavLink)`
  color: #81fe88;
  border: 1px solid #81fe88;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  font-size: 1.6rem;
  
  /* Flex para alinhar ícone e texto */
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 0.6;
  }

  /* Controle de exibição Ícone vs Texto */
  .icone-mobile {
    display: none; /* Esconde ícone no desktop */
  }

  @media (max-width: 1000px) {
    border-radius: 50%; /* Vira uma bolinha */
    width: 50px;
    height: 50px;
    padding: 0;

    .texto-desktop {
      display: none; /* Esconde texto */
    }
    .icone-mobile {
      display: block; /* Mostra ícone */
    }
  }
`;

// 4. Os Itens do Menu
export const ItemListaNav = styled.li`
  width: 100%;
  list-style: none;
`;

export const LinkNavegacao = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px;
  border-radius: 8px;

  text-decoration: none;
  color: #888888;
  transition: all 0.2s ease;

  img {
    width: 24px;
    height: 24px;
    transition: filter 0.2s;
  }

  p {
    font-size: 1.2rem;
    margin: 0;
  }

  /* --- EFEITOS --- */
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05); /* Fundo sutil ao passar o mouse */
    color: #ffffff;
    opacity: 1;
  }

  &.active {
    color: #ffffff;
    
    /* Opcional: Um fundo para marcar o item ativo */
    /* background-color: rgba(255, 255, 255, 0.1); */

    img {
      filter: brightness(10) grayscale(0); /* Garante que o ícone fique branco/vivo */
    }

    p {
      font-weight: bold;
    }
  }

  /* --- RESPONSIVIDADE (Esconde o texto) --- */
  @media (max-width: 1000px) {
    .texto-link {
      display: none;
    }
  }
`;

// 5. O Perfil do Usuário (Rodapé da barra)
export const UserProfile = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 14px;
  background-color: #2d3538;
  border-radius: 8px;
  margin-top: auto;
  cursor: pointer;
  text-decoration: none;
  border: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3a4448;
  }

  /* MODO FINO */
  @media (max-width: 1000px) {
    justify-content: center; /* Centraliza o avatar */
    padding: 10px 0;
    background-color: transparent; /* Tira o fundo para ficar limpo */
  }
`;

// 6. As Informações do Usuário (Nome/Arroba)
export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 4px;

  h3 {
    color: #ffffff;
    font-size: 1.4rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
  }

  p {
    color: #888888;
    font-size: 1.2rem;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ESCONDE TUDO NO MODO FINO */
  @media (max-width: 1000px) {
    display: none;
  }
`;

