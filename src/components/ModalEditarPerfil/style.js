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

  button {
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    border: none;
    transition: 0.2s;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-cancel {
    background: #444;
    color: #fff;
  }
  .btn-cancel:hover:not(:disabled) {
    background: #555;
  }

  .btn-save {
    background: #007bff;
    color: #fff;
  }
  .btn-save:hover:not(:disabled) {
    background: #0056b3;
  }
`;
