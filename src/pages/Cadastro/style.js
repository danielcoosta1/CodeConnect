import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { device } from "../../styles/breakpoints";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ContainerWrapper = styled.main`
  width: 100vw;
  min-height: 100vh;
  background-color: #01080e;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e1e1e1;
  padding: 2.4rem;

  /* --- MÁGICA DA MARCA D'ÁGUA --- */
  @media ${device.tablet} {
    background-image: linear-gradient(
        rgba(1, 8, 14, 0.85), 
        rgba(1, 8, 14, 0.95)
      ),
      url(${(props) => props.$bgImage});
    background-size: cover;
    background-position: center;
    background-attachment: fixed; 
  }

  @media ${device.mobile} {
    padding: 1.6rem;
  }
`;

export const ContainerContent = styled.section`
  display: flex;
  width: 100%;
  max-width: 100rem;
  background-color: #171d1f;
  border-radius: 1.6rem; 
  overflow: hidden;
  box-shadow: 0 1rem 4rem rgba(0, 0, 0, 0.5); 

  @media ${device.tablet} {
    flex-direction: column;
    max-width: 50rem; 
    
    /* Glassmorphism */
    background-color: rgba(23, 29, 31, 0.85); 
    backdrop-filter: blur(0.5rem);
    border: 0.1rem solid rgba(255, 255, 255, 0.05); 
  }
`;

export const ContainerImg = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #171d1f;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media ${device.tablet} {
    display: none;
  }
`;

export const ContainerForm = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6rem 4rem; 
  gap: 2.4rem;
  position: relative;

  h1 {
    font-size: 3.6rem;
    font-weight: 700;
    color: #fff;
    margin: 0;
  }

  p.subtitle {
    font-size: 1.6rem;
    color: #a0a0a0;
    margin-top: -1.6rem; 
  }

  p.error-message {
    color: #ff6b6b;
    font-size: 1.4rem;
    margin: 0;
  }

  @media ${device.mobile} {
    padding: 3.2rem 2rem;

    h1 {
      font-size: 2.8rem;
    }
    p.subtitle {
      font-size: 1.4rem;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

export const CampoInput = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 1.4rem;
    margin-bottom: 0.8rem;
    color: #e1e1e1;
    font-weight: 600;
  }

  input {
    padding: 1.2rem 1.6rem;
    border: 0.2rem solid transparent;
    border-radius: 0.8rem; 
    background-color: #2a3236;
    color: white;
    font-size: 1.6rem;
    font-family: inherit;
    transition: all 0.2s ease-in-out;

    &::placeholder {
      color: #888;
      font-size: 1.4rem;
    }

    &:focus {
      outline: none;
      background-color: #333c42;
      border-color: #81fe88;
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1.2rem;
  border: none;
  border-radius: 0.8rem; 
  background-color: #81fe88;
  color: #132e35;
  font-weight: 800;
  font-size: 1.6rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    background-color: #6be276;
    transform: translateY(-0.2rem);
    box-shadow: 0 0.4rem 1.2rem rgba(129, 254, 136, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  svg {
    font-size: 2rem;
  }

  .spin {
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export const ContainerLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  text-align: center;
  margin-top: 1.6rem;

  p {
    font-size: 1.4rem;
    color: #e1e1e1;
    margin: 0;
  }
`;

export const LinkLogin = styled(Link)`
  color: #81fe88;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.6rem;
  gap: 0.6rem;
  text-decoration: none;
  transition: 0.2s;

  &:hover {
    text-decoration: underline;
    color: #fff;
  }

  svg {
    font-size: 2rem;
  }
`;

// --- TELA DE SUCESSO ---
export const ContainerSucesso = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 40rem; /* Para não encolher o container de repente */
  gap: 3.2rem;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out;

  p.success-title {
    color: #81fe88;
    font-size: 3.2rem;
    font-weight: 800;
    line-height: 1.2;
    text-shadow: 0 0 1rem rgba(129, 254, 136, 0.3);
    margin: 0;
  }

  @media ${device.mobile} {
    p.success-title {
      font-size: 2.8rem;
    }
  }
`;

export const ContainerLoginSucesso = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  text-align: center;

  p {
    font-size: 1.6rem;
    color: #ccc;
    margin: 0;
  }
`;

export const LinkLoginSucesso = styled(Link)`
  background-color: #81fe88;
  color: #132e35;
  padding: 1.6rem 2.4rem;
  width: 100%;
  border-radius: 0.8rem;
  font-weight: 800;
  font-size: 1.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  text-decoration: none;
  box-shadow: 0 0.4rem 1.2rem rgba(129, 254, 136, 0.3);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-0.3rem);
    background-color: #6be276;
    box-shadow: 0 0.6rem 1.6rem rgba(129, 254, 136, 0.5);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    font-size: 2.4rem;
  }
`;