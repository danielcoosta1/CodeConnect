import { Link } from "react-router-dom";
import styled from "styled-components";

export const ContainerWrapper = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: #01080e;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e1e1e1;
`;

export const ContainerContent = styled.section`
  display: flex;

  width: 60%;
  padding: 2rem;
  background-color: #171d1f;
  gap: 2rem;
`;

export const ContainerImg = styled.div`
  display: flex;
  width: 100%;
  max-width: 30rem;

  img {
    width: 100%;
  }
`;

export const ContainerForm = styled.div`
  display: flex;
  width: 100%;
  
  justify-content: center;

  max-width: 30rem;

  flex-direction: column;
  gap: 2rem;
`;

export const ContainerSucesso = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-size: 1.25rem;
 


`;

export const LinkLogin = styled(Link)`
   color: #81fe88;

  &:hover {
    text-decoration: underline;
    scale: 1.1;
  }


`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CampoInput = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 0.75rem;
    margin-bottom: 0.15rem;
  }

  input {
    padding: 0.8rem;
    border: 1px solid #333;
    border-radius: 0.25rem;
    background-color: #888888;

    &::placeholder {
      color: #171d1f;
    }

    &:focus {
      outline: none;
      border-color: #81FE88
    }
  }
`;

export const Button = styled.button`
display: flex;
align-items: center;
justify-content: center;
gap: 0.5rem;
  padding: 0.75rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #81fe88;
  color: #132e35;
  font-weight: bold;
  font-size: 0.85rem;
  cursor: pointer;

  &:hover {
    background-color: #66d75b;
  }
`;



