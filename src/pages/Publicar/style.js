import styled from "styled-components";

export const ContainerWrapper = styled.div`
  display: flex;
`;

export const ContainerImg = styled.div`
  display: flex;

  flex-direction: column;
`;

export const Img = styled.img`
  width: 500px;
`;

export const ButtonCarregarImg = styled.button`
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
`;

export const LegendaImg = styled.p``;

export const ContainerForm = styled.div`
  color: #e1e1e1;
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
