import styled from "styled-components";
import { NavLink } from "react-router-dom";

// 1. O Container principal
export const SidebarContainer = styled.aside`
  width: 280px; /* Padrão Desktop Grande */
  height: 100vh;
  background-color: #171d1f;

  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 1rem;
  border-radius: 8px;

  position: sticky;
  top: 0;

  /* --- O SEGREDO DA FLUIDEZ 🌊 --- */
  /* Isso faz a largura e o padding deslizarem suavemente */
  transition: all 0.3s ease-in-out;
  white-space: nowrap; /* Impede que o texto quebre de linha enquanto encolhe */
  overflow: hidden; /* Garante que nada vaze */

  /* --- NOVO: MODO LAPTOP (Intermediário) --- */
  /* Entre 1000px e 1280px, a barra fica um pouco mais estreita */
  @media (max-width: 1280px) {
    width: 200px;
    padding: 2rem 0.5rem;
  }

  /* --- MODO TABLET/MOBILE (Barra Fina) --- */
  @media (max-width: 1000px) {
    width: 80px;
    align-items: center;
  }
`;
// 2. A Logo
export const LogoImg = styled.img`
  transition: opacity 0.3s; /* Logo desaparece suavemente */

  @media (max-width: 1000px) {
    display: none;
    opacity: 0;
  }
`;

export const Nav = styled.nav`
  width: 100%;
  margin-top: 4rem;
`;

export const ListaNav = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  padding: 0;
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

  /* AJUSTE PARA O MODO TABLET (Só Ícone) */
  @media (max-width: 1000px) {
    justify-content: center; /* Centraliza o ícone */
    padding: 12px;
    gap: 0;

    .texto-link {
      display: none; /* Some com o texto */
      opacity: 0;
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
