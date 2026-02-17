import { createGlobalStyle } from "styled-components";
// Certifique-se de importar seus breakpoints
import { device } from "./breakpoints"; 

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    /* --- BASE MOBILE (Padrão) --- */
    /* 1rem = 10px. Perfeito para iPhone, Android, etc. */
    font-size: 62.5%; 
    
    width: 100%;
    overflow-x: hidden;

    /* --- BASE DESKTOP (Telas maiores) --- */
    /* Quando a tela for maior que um Laptop (ex: 1024px), 
       a gente aumenta a base para 75% (1rem = 12px) 
       ou 80% (1rem = 12.8px). 
       
       Isso faz o site inteiro dar um "zoom" automático no PC.
    */
    @media ${device.desktop} {
      font-size: 75%; 
    }
  }

  body {
    font-family: "Inter", sans-serif;
    background-color: #01080E;
    /* Volta para tamanho legível de texto (1.6 * base) */
    font-size: 1.6rem; 
    -webkit-font-smoothing: antialiased;
  }
  
  /* ... resto do arquivo ... */
`;

export default GlobalStyle;