import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { device } from "../../styles/breakpoints";

// 1. O Container principal
export const SidebarContainer = styled.aside`
  background-color: #171d1f;

  /* --- PADRÃO: DESKTOP (> 1024px) --- */
  width: 18rem;
  height: 100vh;
  position: sticky;
  top: 0;

  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  border-radius: 8px;
  z-index: 100;

  /* Transição suave para quando afinar no Tablet */
  transition: all 0.3s ease;

  /* --- MODO TABLET (Fina) --- */
  /* Usamos device.tablet (max-width: 1024px) */
  @media ${device.tablet} {
    width: 5rem; /* 80px */
    align-items: center;
    padding: 2rem 0.5rem;
  }

  /* --- MODO MOBILE (Barra Baixo) --- */
  /* Usamos device.mobile (max-width: 768px) */
  @media ${device.mobile} {
    position: fixed;
    bottom: 0;
    left: 0;
    top: auto;

    width: 100%;
    height: 4.375rem; /* 70px */

    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0 1rem;

    border-radius: 1rem 1rem 0 0; /* 16px */
    box-shadow: 0px -0.25rem 1.25rem rgba(0, 0, 0, 0.4);
  }
`;
// 2. A Logo
export const LogoImg = styled.img`
  transition: opacity 0.3s; /* Logo desaparece suavemente */

  @media ${device.tablet} {
    display: none;
    opacity: 0;
  }
`;

export const Nav = styled.nav`
  width: 100%;
  margin-top: 4rem;

  @media ${device.mobile} {
    margin-top: 0;
    width: 100%;
  }
`;

export const ListaNav = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  padding: 0;

  @media ${device.mobile} {
    flex-direction: row;
    justify-content: space-between;
    gap: 0;
  }
`;

// 3. O Botão Publicar
export const LinkPublicarEstilizado = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #81fe88;
  border: 1px solid #81fe88;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-size: 1.6rem;

  .icone-mobile {
    display: none;
  }

  /* TABLET: Vira Bolinha na Lateral */
  @media ${device.tablet} {
    border-radius: 50%;
    width: 3.125rem; /* 50px */
    height: 3.125rem; /* 50px */
    padding: 0;

    .texto-desktop {
      display: none;
    }
    .icone-mobile {
      display: block;
    }
  }
`;

// 4. Os Itens do Menu
export const ItemListaNav = styled.li`
  width: 100%;
  list-style: none;

  @media ${device.mobile} {
    width: auto;
  }
`;

/* O LINK CLICÁVEL */
export const LinkNavegacao = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1rem; /* ~16px */
  width: 100%;
  padding: 0.75rem 1rem; /* 12px 16px */
  border-radius: 0.5rem;
  text-decoration: none;
  color: #888888;
  transition: all 0.3s ease;

  img {
    width: 1.5rem; /* 24px */
    height: 1.5rem;
  }

  p {
    font-size: 1.2rem;
    margin: 0;
  }

  &:hover {
    background-color: #2d3538;
    color: #ffffff;
  }

  &.active {
    color: #ffffff;
    background-color: #2d3538;
    font-weight: bold;
    img {
      filter: brightness(1.5);
    }
  }

  /* TABLET e MOBILE: Esconde texto */
  @media ${device.tablet} {
    justify-content: center;
    padding: 0.625rem; /* 10px */

    .texto-link {
      display: none;
    }
  }

  @media ${device.mobile} {
    &.active {
      background-color: transparent;
      color: #81fe88;
    }
    &:hover {
      background-color: transparent;
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
  transition: all 0.3s ease;

  &:hover {
    background-color: #3a4448;
  }

  /* MODO FINO */
  @media ${device.tablet} {
    justify-content: center; /* Centraliza o avatar */
    padding: 10px 0;
    background-color: transparent; /* Tira o fundo para ficar limpo */
  }

  @media ${device.mobile} {
    justify-content: end;
  }
`;

// 6. As Informações do Usuário (Nome/Arroba)
export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 0.75rem;

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
  @media ${device.tablet} {
    display: none;
  }
`;
