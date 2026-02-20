import {
  ModalOverlay,
  ModalBox,
  Title,
  Message,
  ButtonContainer,
  CancelButton,
  ConfirmButton,
} from "./style";

const ModalConfirmacao = ({
  isOpen,
  onClose,
  onConfirm,
  titulo,
  mensagem,
  textoConfirmar = "Confirmar",
  textoCancelar = "Cancelar",
  isDestructive = false, // Se for true, o botão de confirmar fica vermelho!
}) => {
  if (!isOpen) return null;

  return (
    // O onClick no Overlay permite fechar o modal clicando fora dele
    <ModalOverlay onClick={onClose}>
      {/* O stopPropagation impede que o clique dentro da caixa feche o modal */}
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Title>{titulo}</Title>
        <Message>{mensagem}</Message>
        
        <ButtonContainer>
          <CancelButton onClick={onClose}>{textoCancelar}</CancelButton>
          <ConfirmButton
            onClick={() => {
              onConfirm();
              onClose(); // Fecha o modal após confirmar
            }}
            $isDestructive={isDestructive}
          >
            {textoConfirmar}
          </ConfirmButton>
        </ButtonContainer>
      </ModalBox>
    </ModalOverlay>
  );
};

export default ModalConfirmacao;