import styled from "styled-components";

// --- WRAPPER GERAL ---
export const ContainerWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh; // Garante que ocupe a altura da tela
  background-color: #171d1f;
  padding: 3rem 4rem; // Mantido o espaçamento maior nas bordas
  gap: 4rem; // Mantido o afastamento maior
  box-sizing: border-box;

  @media (max-width: 1200px) {
    flex-direction: column;
    padding: 2rem;
    gap: 2rem;
    align-items: center; // Centraliza em telas menores
  }
`;

// --- COLUNA DA ESQUERDA (IMAGEM) ---
export const ContainerUploadImg = styled.div`
  display: flex;
  flex-direction: column;
  // Removido o flex: 1 e max-width para deixar a imagem ditar o tamanho
`;

export const ContainerImg = styled.div`
  background-color: #888888;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  // Removida min-height fixa pois a imagem de 600px vai ditar a altura
`;

export const Img = styled.img`
  width: 520px; // RESTAURADO: Largura fixa de 600px como no original
  height: auto;
  object-fit: cover;
  display: block;

  // Segurança para telas menores que 600px
  @media (max-width: 650px) {
    width: 100%;
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
`;

export const ButtonUploadImg = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  font-size: 1.1rem; // Mantido tamanho maior
  font-weight: 600;
  color: #c1c1c1;
  padding: 1.2em;
  background-color: rgba(255, 255, 255, 0.05);
  border: 2px solid #888888; // RESTAURADO: Borda SÓLIDA, não dashed
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: #e1e1e1;
    color: #fff;
  }

  img {
    width: 24px;
    height: 24px;
  }
`;

export const ContainerSubtittle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #b0b0b0;
  margin-top: 1rem;
  font-size: 1rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 0.8rem;
  border-radius: 6px;

  img {
    cursor: pointer;
    width: 20px;
    height: 20px;
    transition: 0.2s;
    &:hover {
      opacity: 0.8;
    }
  }
`;

// --- COLUNA DA DIREITA (FORMULÁRIO) ---
export const ContainerForm = styled.div`
  flex: 1; // Ocupa o resto do espaço disponível
  width: 100%;
  color: #e1e1e1;

  h2 {
    font-size: 2.5rem; // Mantido título maior
    margin-bottom: 2rem;
    font-weight: 700;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.5rem; // Mantido espaço maior
`;

// --- PADRONIZAÇÃO DOS INPUTS  ---
const InputStyles = `
  width: 100%;
  padding: 1.2rem;
  font-size: 1.2rem; // Fonte maior digitada
  color: #171d1f; // Texto escuro para contraste com fundo cinza
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
  font-size: 1.2rem; // Label grande e legível

  color: #e1e1e1;
`;

export const CampoInput = styled.div`
  display: flex;
  flex-direction: column;

  label {
    ${LabelStyles}
  }

  input {
    ${InputStyles}
  }
`;

export const ContainerInputDescricao = styled.div`
  display: flex;
  flex-direction: column;

  label {
    ${LabelStyles}
  }

  textarea {
    ${InputStyles}
    min-height: 250px; // Mantido textarea alto
    resize: vertical;
    line-height: 1.5;
  }
`;

export const ContainerTags = styled.div`
  display: flex;
  flex-direction: column;

  label {
    ${LabelStyles}
  }

  input {
    ${InputStyles}
  }
`;

// --- TAGS VISUAIS ---
export const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

export const TagItem = styled.li`
  background-color: #81fe88;
  color: #132e35;
  padding: 0.6em 1em;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
`;

export const TagRemoveButton = styled.button`
  background: none;
  border: none;
  color: #132e35;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1.2rem;

  &:hover {
    color: #000;
  }
`;

// --- BOTÕES DE AÇÃO ---
export const ContainerBotoes = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
`;

export const BotaoDescartar = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8em;
  // RESTAURADO: Cor verde original
  border: 2px solid #81fe88;
  color: #81fe88;
  background-color: transparent;

  padding: 1.2rem; // Mantido padding maior
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem; // Mantido fonte maior
  font-weight: bold;
  transition: 0.2s;

  &:hover {
    background-color: rgba(129, 254, 136, 0.1);
  }
`;

export const BotaoPublicar = styled.button`
  flex: 2; // Mantido maior destaque
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8em;
  font-size: 1.1rem; // Mantido fonte maior
  background-color: #81fe88;
  color: #132e35;
  padding: 1.2rem; // Mantido padding maior
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
`;
