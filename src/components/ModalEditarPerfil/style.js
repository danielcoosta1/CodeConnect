import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px); // Efeito de vidro desfocado no fundo
`;

export const ModalContent = styled.div`
  background-color: #171d1f;
  border-radius: 12px;
  border: 1px solid #333; // Borda sutil para separar do fundo
  padding: 40px;
  width: 95%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto; // Garante que em telas menores o modal role
  position: relative;

  /* Custom Scrollbar para manter o visual dark */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #171d1f;
  }
  &::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 10px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  h3 {
    margin: 0;
    font-size: 1.8rem;
    color: #fff;
    font-weight: 600;
  }

  button {
    background: transparent;
    border: none;
    color: #888;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    padding: 8px;
    border-radius: 50%;
    font-size: 1.5rem;

    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
      color: #81fe88;
      transform: rotate(90deg); // Efeito moderno ao hover
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
  align-items: center;
  gap: 2rem;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #333;
`;

export const Img = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #81fe88; // Anel verde ao redor da foto
  padding: 3px;
`;

export const ContainerButton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
