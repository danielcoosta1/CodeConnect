import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { device } from "../../styles/breakpoints";

/* 1. O Container principal */
export const SidebarContainer = styled.aside`
  background-color: #171d1f;

  /* --- PADRÃO: DESKTOP --- */
  width: 22rem;
  height: 100vh;
  position: sticky;
  top: 0;

  display: flex;
  flex-direction: column;
  padding: 3rem 1.6rem;
  border-radius: 0.8rem;
  z-index: 100;

  transition: all 0.3s ease;

  /* --- MODO TABLET (Fina) --- */
  @media ${device.tablet} {
    width: 8rem;
    align-items: center;
    padding: 3rem 1rem;
  }

  /* --- MODO MOBILE (Barra Inferior) --- */
  @media ${device.mobile} {
    position: fixed;
    bottom: 0;
    left: 0;
    top: auto;

    width: 100%;
    height: 6rem;

    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0 1rem;

    border-radius: 1.6rem 1.6rem 0 0;
    box-shadow: 0 -0.2rem 1rem rgba(0, 0, 0, 0.3);
  }
`;

/* 2. A Logo */
export const LogoImg = styled.img`
  width: 12rem;
  transition: opacity 0.3s;

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
  gap: 1.6rem;
  width: 100%;

  @media ${device.tablet} {
    justify-content: space-around; /* Distribui os ícones por igual na barra */
    align-items: center;
  }

  @media ${device.mobile} {
    flex-direction: row;
    justify-content: space-around; /* Distribui os ícones por igual na barra */
    align-items: center;
    gap: 0;
  }
`;

/* 3. O Botão Publicar (versão FAB no Mobile) */
export const LinkPublicarEstilizado = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #81fe88;
  border: 0.1rem solid #81fe88;
  padding: 1.2rem;
  border-radius: 0.8rem;
  text-decoration: none;
  font-size: 1.6rem;
  font-weight: bold;
  transition: all 0.2s ease;

  .icone-mobile {
    display: none;
  }

  &:hover {
    background-color: #81fe88;
    color: #171d1f;
  }

  /* TABLET: Vira Bolinha na Lateral */
  @media ${device.tablet} {
    border-radius: 50%;
    width: 4.8rem;
    height: 4.8rem;
    padding: 0;
    margin-bottom: 5rem;

    .texto-desktop {
      display: none;
    }
    .icone-mobile {
      display: block;
      font-size: 2rem;
    }
  }

  /* MOBILE: Vira FAB (Floating Action Button) flutuando no canto direito! */
  @media ${device.mobile} {
    position: fixed;
    bottom: 8rem; /* Fica acima da barra inferior (que tem 6rem) */
    right: 2rem;

    width: 5.6rem;
    height: 5.6rem;
    border-radius: 50%;

    background-color: #81fe88;
    color: #171d1f;
    box-shadow: 0 0.4rem 1.2rem rgba(129, 254, 136, 0.3); /* Sombra neon */
    z-index: 1000;

    .icone-mobile {
      display: block;
      font-size: 2.2rem;
    }

    &:hover {
      transform: scale(1.05); /* Efeito de crescer ao invés de mudar a cor */
    }
  }
`;

/* 4. Os Itens do Menu */
export const ItemListaNav = styled.li`
  width: 100%;

  @media ${device.mobile} {
    width: auto;
  }
`;

export const LinkNavegacao = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  width: 100%;
  padding: 1.2rem 1.6rem;
  border-radius: 0.8rem;
  text-decoration: none;
  color: #888888;
  transition: all 0.2s ease;

  img {
    width: 2rem;
    height: 2rem;
  }

  p {
    font-size: 1.5rem;
    margin: 0;
    font-weight: 500;
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

  @media ${device.tablet} {
    justify-content: center;
    padding: 1.2rem;

    .texto-link {
      display: none;
    }
  }

  @media ${device.mobile} {
    padding: 1rem;
    &.active {
      background-color: transparent;
      /* Destaque verde no ícone da página atual */
      filter: sepia(100%) hue-rotate(80deg) saturate(300%) brightness(1.2);
    }
    &:hover {
      background-color: transparent;
    }
  }
`;

/* 5. O Perfil do Usuário (Ajuste de Padding e Ocultação no Mobile) */
export const UserProfile = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 100%;

  /* Ajuste do Padding: Mais equilibrado em Desktop */
  padding: 1.2rem 1.6rem;
  background-color: #2d3538;
  border-radius: 0.8rem;
  margin-top: auto;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: #3a4448;
  }

  @media ${device.tablet} {
    justify-content: center;
    padding: 1.2rem 0;
    background-color: transparent;
  }

  /* --- O CULPADO ELIMINADO --- */
  @media ${device.mobile} {
    display: none; /* Remove totalmente do DOM no celular */
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 0.4rem;

  h3 {
    color: #ffffff;
    font-size: 1.4rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    color: #888888;
    font-size: 1.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media ${device.tablet} {
    display: none;
  }
`;
