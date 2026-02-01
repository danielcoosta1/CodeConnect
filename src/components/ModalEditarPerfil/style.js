import styled from "styled-components";

// --- VARIÁVEIS DE PADRONIZAÇÃO (IGUAIS AO PUBLICAR) ---
// Isso garante que se você mudar lá, é só copiar e colar aqui.

const InputStyles = `
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  color: #171d1f;
  background-color: #888888;
  border: 2px solid transparent;
  border-radius: 8px;
  font-family: inherit;
  transition: 0.2s;

  &::placeholder {
    color: #333;
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    border-color: #81fe88;
    background-color: #999;
  }
`;

const LabelStyles = `
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #e1e1e1;
`;

// --- ESTRUTURA DO MODAL ---

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85); // Um pouco mais escuro para foco
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

export const ModalContent = styled.div`
  background-color: #171d1f;
  border-radius: 16px; // Bordas mais arredondadas
  border: 1px solid #333;
  padding: 40px;
  width: 95%;
  max-width: 600px; // Um pouco mais estreito para parecer "Modal" e não página
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
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
  border-bottom: 1px solid #333; // Linha sutil separando header
  padding-bottom: 20px;

  h3 {
    margin: 0;
    font-size: 1.8rem;
    color: #fff;
    font-weight: 700;
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
      background-color: rgba(255, 255, 255, 0.1);
      color: #ff6b6b; // Vermelho ao fechar
      transform: rotate(90deg);
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem; // Mesmo gap do Publicar
`;

// --- INPUTS PADRONIZADOS ---

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    ${LabelStyles}
  }

  input {
    ${InputStyles}
  }

  textarea {
    ${InputStyles}
    min-height: 120px; // Bio não precisa ser tão grande quanto post
    resize: vertical;
    line-height: 1.5;
  }
`;

// --- ÁREA DA IMAGEM (ESPECÍFICA DE PERFIL) ---

export const ContainerUploadImg = styled.div`
  display: flex;
  flex-direction: column; // Mudei para coluna para centralizar
  align-items: center;    // Centraliza tudo
  gap: 1.5rem;
  margin-bottom: 10px;
`;

export const Img = styled.img`
  width: 150px; // Um pouco maior
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #171d1f; // Borda interna simulada
  outline: 3px solid #81fe88; // Anel verde externo
  box-shadow: 0 0 20px rgba(129, 254, 136, 0.2);
`;

export const ContainerButton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  align-items: center;
`;

// Reutilizando o estilo do botão de upload do Publicar, mas ajustado
export const ButtonUploadImg = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8em;
  font-size: 0.9rem;
  font-weight: 600;
  color: #c1c1c1;
  padding: 0.8em 1.5em;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid #888888;
  border-radius: 30px; // Botão arredondado combina mais com avatar
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: #81fe88;
    color: #fff;
  }
`;

// --- RODAPÉ E BOTÕES DE AÇÃO ---

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end; // Botões à direita é padrão de modal
  gap: 1rem;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #333; // Separação visual
`;

// Botão Cancelar = Botão Descartar (Visualmente)
export const BotaoCancelar = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #81fe88;
  color: #81fe88;
  background-color: transparent;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: 0.2s;

  &:hover {
    background-color: rgba(129, 254, 136, 0.1);
  }
`;

// Botão Salvar = Botão Publicar (Visualmente)
export const BotaoSalvar = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  font-size: 1rem;
  background-color: #81fe88;
  color: #132e35;
  padding: 0.8rem 2rem; // Um pouco mais largo
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;

  &:hover {
    background-color: #6be276;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(129, 254, 136, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;