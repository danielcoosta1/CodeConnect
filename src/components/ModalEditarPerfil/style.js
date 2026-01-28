import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); //fundo semi-transparente
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; //garante que fique por cima de outros elementos
`;

export const ModalContent = styled.div`
  background-color: #171d1f;
  border-radius: 8px;

  padding: 20px;
  width: 90%;
  max-width: 900px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    margin: 0;
    font-size: 1.8rem;
  }

  button {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 2rem;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      opacity: 0.8;
      color: #81fe88;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top: 5rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 1.2rem;
    margin-bottom: 0.25rem;
  }

  textarea {
    background-color: #888888;
    border-radius: 4px;

    padding: 1em 1.5em;
    font-size: 1rem;
  }

  input {
    padding: 0.8rem;
    border: 1px solid #333;
    border-radius: 0.25rem;
    background-color: #888888;
    font-size: 1.5rem;

    &::placeholder {
      color: #171d1f;
      font-size: 1.2rem;
    }

    &:focus {
      outline: none;
      border-color: #81fe88;
    }
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
`;

export const BotaoCancelar = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #81fe88;
  color: #81fe88;
  background-color: transparent;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
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

export const BotaoSalvar = styled.button`
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
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;

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

export const ContainerUploadImg = styled.div`
  display: flex;

  gap: 1rem;
  margin-bottom: 2rem;
`;

export const ContainerImg = styled.div``;

export const Img = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ContainerButton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

export const ContainerSubtittle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #888888;
  margin-top: 1rem;
  p {
    font-size: 0.9rem;
  }
  img {
    cursor: pointer;
    margin-bottom: 1em;
  }
`;
