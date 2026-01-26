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
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  max-width: 500px;
`;
