import styled from "styled-components";
import { NavLink } from "react-router-dom";

// 1. O Container principal
export const SidebarContainer = styled.aside`
  background-color: #171d1f;

  /* --- PADRÃO: DESKTOP (> 1024px) --- */
  width: 280px;
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

  /* --- MODO TABLET (Entre 768px e 1024px) --- */
  /* Mantém na esquerda, mas fica fina */
  @media (max-width: 1024px) {
    width: 80px;
    align-items: center;
    padding: 2rem 0.5rem;
  }

  /* --- MODO MOBILE (< 768px) --- */
  /* Sai da esquerda e vai para baixo */
  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    top: auto; /* Anula o sticky top */

    width: 100%;
    height: 70px; /* Altura da barra inferior */

    flex-direction: row; /* Ícones lado a lado */
    justify-content: space-around;
    align-items: center;
    padding: 0 1rem;

    border-radius: 16px 16px 0 0; /* Arredonda pontas de cima */
    box-shadow: 0px -4px 20px rgba(0, 0, 0, 0.4); /* Sombra para destacar */
  }
`;
// 2. A Logo
export const LogoImg = styled.img`
  transition: opacity 0.3s; /* Logo desaparece suavemente */

  @media (max-width: 1024px) {
    display: none;
    opacity: 0;
  }
`;

export const Nav = styled.nav`
  width: 100%;
  margin-top: 4rem;

  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
    flex-direction: row; /* Horizontal */
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
  @media (max-width: 1024px) {
    border-radius: 50%;
    width: 50px;
    height: 50px;
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

  @media (max-width: 768px) {
    width: auto; /* No mobile, ocupa só o espaço do ícone */
  }
`;

export const LinkNavegacao = styled(NavLink)`
  display: flex;
  flex-direction: row; /* Desktop: Lado a Lado */
  align-items: center;
  gap: 15px; /* Espaço entre ícone e texto */
  width: 100%;
  padding: 12px 16px; /* Padding interno generoso */
  border-radius: 8px;

  text-decoration: none;
  color: #888888;
  transition: all 0.3s ease; /* Transição suave de cor e fundo */

  img {
    width: 24px;
    height: 24px;
    min-width: 24px; /* Garante que o ícone não esmague na animação */
  }

  p {
    font-size: 1.2rem;
    margin: 0;
    opacity: 1;
    transition: opacity 0.2s; /* Texto desaparece suavemente */
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

  /* TABLET E MOBILE: Esconde texto, mostra só ícone */
  @media (max-width: 1024px) {
    justify-content: center;
    padding: 10px;

    .texto-link {
      display: none;
    }
  }

  /* MOBILE ESPECÍFICO: Tira fundo do active para ficar mais limpo */
  @media (max-width: 768px) {
    &.active {
      background-color: transparent;
      color: #81fe88; /* Ícone verde */
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
  @media (max-width: 1024px) {
    justify-content: center; /* Centraliza o avatar */
    padding: 10px 0;
    background-color: transparent; /* Tira o fundo para ficar limpo */
  }

  @media (max-width: 768px) {
    justify-content: end;
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
  @media (max-width: 1024px) {
    display: none;
  }
`;
