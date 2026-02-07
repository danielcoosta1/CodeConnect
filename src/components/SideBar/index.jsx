import {
  SidebarContainer,
  LogoImg,
  LinkPublicarEstilizado,
  ItemListaNav,
  Nav,
  ListaNav,
  UserProfile,
  UserInfo,
  LinkNavegacao,
} from "./style.js";
import logoImg from "./assets/Logo.svg";



import feedIcon from "./assets/feed.svg";
import accountIcon from "./assets/account_circle.svg";
import infoIcon from "./assets/info.svg";
import logoutIcon from "./assets/logout.svg";
import { FaPen } from "react-icons/fa";

import feedIconWhite from "./assets/feedwhite.svg";
import accountIconWhite from "./assets/account_circlewhite.svg";
import infoIconWhite from "./assets/infowhite.svg";
import { useAuth } from "../../hooks/useAuth.js";
import ProfileAvatar from "../ProfileAvatar/index.jsx";

const SideBar = () => {
  const { logout, user } = useAuth();
  const links = [
    {
      name: "Feed",
      path: "/feed",
      src: feedIcon,
      src2: feedIconWhite,
      onclick: null,
    },
    {
      name: "Perfil",
      path: "/perfil",
      src: accountIcon,
      src2: accountIconWhite,
      onclick: null,
    },
    {
      name: "Sobre nós",
      path: "/sobre-nos",
      src: infoIcon,
      src2: infoIconWhite,
      onclick: null,
    },
    {
      name: "Sair",
      path: "#",
      src: logoutIcon,
      src2: null,
      onclick: logout,
    },
  ];
  return (
    <SidebarContainer>
      <LogoImg src={logoImg} alt="Logo" />
      <Nav>
        <ListaNav>
          <LinkPublicarEstilizado to="/publicar">
            {/* Ícone que aparece só na tela pequena */}
            <FaPen className="icone-mobile" size={20} />
            {/* Texto que aparece só na tela grande */}
            <span className="texto-desktop">Publicar</span>
          </LinkPublicarEstilizado>
          {links.map((link) => (
            <ItemListaNav key={link.name}>
              <LinkNavegacao to={link.path} onClick={link.onclick} end>
                {({ isActive }) => (
                  <>
                    <img
                      src={isActive && link.src2 ? link.src2 : link.src}
                      alt={link.name}
                    />
                    <p className="texto-link">{link.name}</p>
                  </>
                )}
              </LinkNavegacao>
            </ItemListaNav>
          ))}
        </ListaNav>
      </Nav>
      {/* 2. Feedback Visual: Perfil do Usuário Logado (Lá embaixo) */}
      {user && (
        <UserProfile to="/perfil">
          <ProfileAvatar src={user.imagem} size={50} hasBorder={true} />
          <UserInfo>
            <h3>{user.nome || "Dev"}</h3>
            <p>@{user.usuario || "usuario"}</p>
          </UserInfo>
        </UserProfile>
      )}
    </SidebarContainer>
  );
};

export default SideBar;
