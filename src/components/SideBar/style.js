import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { device } from "../../styles/breakpoints";

// 1. O Container principal
export const SidebarContainer = styled.aside`
  background-color: #171d1f;

  /* --- PADRÃO: DESKTOP (> 1024px) --- */
  /* Ajustado para REM */
  width: 22rem; /* Mais largo para caber info */
  height: 100vh;
  position: sticky;
  top: 0;

  display: flex;
  flex-direction: column;
  padding: 3rem 2rem;
  border-right: 1px solid #2d3538;
  z-index: 100;
  transition: all 0.3s ease;

  /* --- MODO TABLET (Fina) --- */
  @media ${device.tablet} {
    width: 8rem; /* 80px visualmente */
    align-items: center;
    padding: 2rem 1rem;
  }

  /* --- MODO MOBILE (Barra Baixo) --- */
  @media ${device.mobile} {
    position: fixed;
    bottom: 0;
    left: 0;
    top: auto;

    width: 100%;
    height: 6rem; /* 60px visualmente */

    flex-direction: row;
    justify-content: center; /* Centraliza o conteudo */
    align-items: center;
    padding: 0 1rem;

    border-top: 1px solid #2d3538;
    border-right: none;
    box-shadow: 0px -0.4rem 1rem rgba(0, 0, 0, 0.4);
  }
`;

// 2. A Logo
export const LogoImg = styled.img`
  width: 15rem;
  margin-bottom: 4rem;
  transition: opacity 0.3s;

  @media ${device.tablet} {
    display: none;
  }
`;

export const Nav = styled.nav`
  width: 100%;
  /* No mobile o Nav ocupa tudo para distribuir os itens */
  @media ${device.mobile} {
    width: 100%;
    height: 100%;
  }
`;

export const ListaNav = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;

  @media ${device.tablet}{
    gap:3rem;
  }

  @media ${device.mobile} {
    flex-direction: row;
    align-items: center;
    justify-content: space-around; /* Distribui ícones igualmente */
    height: 100%;
    gap: 0;
  }
`;

// Item da lista (ajustado para ordem no mobile)
export const ItemListaNav = styled.li`
  width: 100%;
  list-style: none;

  /* No mobile, o botão publicar (que tem classe item-publicar) 
     pode ter ordem especifica ou destaque */
  @media ${device.mobile} {
    width: auto;

    /* Se quiser que o botão publicar fique no meio, usamos order.
       Como não sabemos a ordem exata dos links, o space-around já resolve. */
  }
`;

// 3. O Botão Publicar
export const LinkPublicarEstilizado = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;
  color: #81fe88;
  border: 0.1rem solid #81fe88;

  padding: 1.2rem;
  border-radius: 0.8rem;
  text-decoration: none;

  font-size: 1.6rem;
  font-weight: bold;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(129, 254, 136, 0.1);
  }

  .icone-mobile {
    display: none;
  }

  /* TABLET: Vira Bolinha */
  @media ${device.tablet} {
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
    padding: 0;
    border: 0.2rem solid #81fe88;

    .texto-desktop {
      display: none;
    }

    .icone-mobile {
      display: block;
      font-size: 2rem; /* Tamanho do ícone */
    }
  }

  /* MOBILE: Destaque visual (Botão flutuante fake ou destaque na barra) */
  @media ${device.mobile} {
    border-radius: 50%;
    width: 4.5rem;
    height: 4.5rem;
    padding: 0;
    background-color: #81fe88; /* Fundo verde cheio no mobile */
    color: #171d1f; /* Ícone escuro */
    border: none;
    box-shadow: 0 0 1rem rgba(129, 254, 136, 0.4);
    transform: translateY(-1.5rem); /* Efeito "Saindo" da barra */

    .texto-desktop {
      display: none;
    }

    .icone-mobile {
      display: block;
      font-size: 2rem;
    }

    &:hover {
      background-color: #6ee675;
    }
  }
`;

/* O LINK CLICÁVEL */
export const LinkNavegacao = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
  padding: 1.2rem;
  border-radius: 0.8rem;
  text-decoration: none;
  color: #888888;
  transition: all 0.3s ease;

  img {
    width: 2rem; /* 24px visual */
    height: 2rem;
  }

  .texto-link {
    font-size: 1.3rem;
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
      filter: brightness(2); /* Deixa ícone branco */
    }
  }

  /* TABLET */
  @media ${device.tablet} {
    justify-content: center;
    padding: 1rem;
    .texto-link {
      display: none;
    }
  }

  /* MOBILE */
  @media ${device.mobile} {
    flex-direction: column;
    padding: 0.5rem;
    background-color: transparent !important; /* Remove fundo cinza no active */
    gap: 0.2rem;

    img {
      width: 2rem;
      height: 2rem;
    }

    /* Opcional: mostrar texto pequeno embaixo do ícone no mobile? */
    .texto-link {
      display: none;
    }

    &.active {
      color: #81fe88;
      img {
        /* Se tiver SVG, pintamos via filter. Se for img, precisamos trocar a src (já feito no JS) */
        filter: none;
      }
    }
  }
`;

// 5. O Perfil do Usuário (Rodapé da barra)
export const UserProfile = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
  padding: 1.2rem;
  background-color: #2d3538;
  border-radius: 0.8rem;
  margin-top: auto; /* Empurra para baixo */
  cursor: pointer;
  text-decoration: none;
  border: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: #3a4448;
  }

  /* MODO TABLET */
  @media ${device.tablet} {
    justify-content: center;
    padding: 1rem 0;
    background-color: transparent;
  }

  /* MODO MOBILE: ESCONDEMOS! */
  @media ${device.mobile} {
    display: none; /* Já existe o link de perfil na navegação */
  }
`;

// 6. As Informações do Usuário
export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

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
  }

  @media ${device.tablet} {
    display: none;
  }
`;
