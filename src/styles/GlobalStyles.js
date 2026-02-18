// src/styles/GlobalStyles.js
import { createGlobalStyle } from "styled-components";
// Importante: Precisamos do device que você adicionou na develop
import { device } from "./breakpoints";

const GlobalStyle = createGlobalStyle`
  /* Reset básico */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    /* --- AQUI ESTÁ A CORREÇÃO DA DEVELOP --- */
    /* 1rem = 10px. Perfeito para iPhone, Android, etc. */
    font-size: 62.5%; 
    
    width: 100%;
    overflow-x: hidden;

    /* Aumenta a fonte em telas grandes para não ficar minúsculo */
    @media ${device.desktop} {
      font-size: 75%; 
    }
  }

  body {
    font-family: "Inter", sans-serif;
    /* Recupera o fundo que estava na main */
    background-color: #01080E;
    
    /* Recupera o tamanho de leitura padrão (1.6rem = 16px) */
    font-size: 1.6rem; 
    
    -webkit-font-smoothing: antialiased;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

`;

export default GlobalStyle;
