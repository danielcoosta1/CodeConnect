import styled from "styled-components";

export const ContainerWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 2rem;
`;

export const ContainerUploadImg = styled.div`
  display: flex;

  flex-direction: column;
 
`;

export const ContainerImg = styled.div`
  background-color: #888888;
  border-radius: 8px;
  
`;

export const Img = styled.img`
  width: 450px;
`;

export const ContainerButton = styled.div`
  display: flex;
  flex-direction: column;
  `;

export const ButtonUploadImg = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  font-size: 1rem;
  color: #888888;
  padding: 1em 1.5em;
  background-color: transparent;
  border: 2px solid #888888;
  border-radius: 8px;
  margin-top: 2rem;
`;

export const LegendaImg = styled.p`
margin-top:.5rem;
`;

export const ContainerForm = styled.div`
  width: 100%;
  color: #e1e1e1;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2.5rem;
`;

export const CampoInput = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 1rem;
    margin-bottom: 0.25rem;
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
      border-color: #81fe88;
    }
  }
`;

export const ContainerInputDescricao = styled.div`
  display: flex;
  flex-direction: column;
  textarea {
    background-color: #888888;
    border-radius: 4px;
    min-height: 60px;
    padding: 1em 1.5em;
    font-size: 1rem;
    &::placeholder {
      color: #171d1f;
    }

    &:focus {
      outline: none;
      border-color: #81fe88;
    }
  }
`;

export const ContainerBotoes = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

  width: 100%;
  font-weight: bold;
`;

export const BotaoDescartar = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  border: 1px solid #81fe88;
  color: #81fe88;
  background-color: transparent;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
  width: 100%;
  font-size: 1rem;

  &:hover {
    background-color: rgba(129, 254, 136, 0.1);
  }

  &:active {
    background-color: rgba(129, 254, 136, 0.2);
    transform: scale(0.98);
  }

  &:focus {
    outline: 2px solid #81fe88;
    outline-offset: 2px;
  }
`;

export const BotaoPublicar = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  font-size: 1rem;

  background-color: #81fe88;
  color: #132e35;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: #6be276;
  }

  &:active {
    background-color: #5acd66;
    transform: scale(0.98);
  }

  &:focus {
    outline: 2px solid #132e35;
    outline-offset: 2px;
  }
`;
