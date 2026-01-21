import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const SidebarContainer = styled.aside`
  width: 240px;
  height: 100vh;
  background-color: #171d1f;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 1rem;
  border-radius: 8px;
`;

export const Nav = styled.nav`
  width: 100%;
  margin-top: 3rem;
`;

export const ListaNav = styled.ul`
  display: flex;

  flex-direction: column;
  gap: 4rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.25rem;
`;

export const LogoImg = styled.img``;

export const LinkPublicarEstilizado = styled(NavLink)`
  color: #81fe88;
  border: 1px solid #81fe88;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  font-size: 1.25rem;
  &:hover {
    opacity: 0.6;
  }
`;

export const ItemListaNav = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    color: #888888;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      opacity: 0.8;
      text-decoration: underline;
    }

    &.active {
      text-decoration: underline;
      color: #ffffff;

      img {
        filter: brightness(1.2);
      }

      p {
        font-weight: bold;
      }
    }
  }
`;


export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 14px;
  background-color: #2d3538; /* Um fundo sutil para destacar do resto */
  border-radius: 8px;
  margin-top: auto; /* A MÁGICA: Empurra este bloco para o final da Sidebar */
  margin-bottom: 4rem;
  
  
  transition: background-color 0.2s;
  cursor: default;

  &:hover {
    background-color: #3a4448;
  }
`;


export const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #81fe88; /* Identidade visual */
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Evita que nomes gigantes quebrem o layout */
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
`;
/* --------------------------------------- */