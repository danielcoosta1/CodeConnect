import React from "react";
import { ModalContainer, ModalContent } from "./style";

const ModalEditarPerfil = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalContainer>
      <ModalContent>
        {/* Conteúdo do modal */}
        <button onClick={onClose}>Fechar</button>
      </ModalContent>
    </ModalContainer>
  );
};

export default ModalEditarPerfil;
