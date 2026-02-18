// src/styles/GlobalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Reset básico */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family: "Inter", sans-serif;
    overflow-x: hidden;
    width: 100%;
    background-color:  #01080E
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
