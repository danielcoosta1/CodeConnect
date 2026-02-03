import { Link } from "react-router-dom";
import styled from "styled-components";

export const ContainerWrapper = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: #01080e;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e1e1e1;
  padding: 2rem; //garante que não cole nas bordas em telas pequenas
`;

export const ContainerContent = styled.section`
  display: flex;
  width: 100%;
  max-width: 1200px; // Trava a largura em telas gigantes
  background-color: #171d1f;
  border-radius: 16px; // Um pouco de arredondamento fica mais moderno
  overflow: hidden; // Para a imagem não vazar as bordas arredondadas
  box-shadow: 0 10px 40px rgba(0,0,0,0.5); // Sombra para destacar do fundo

  // RESPONSIVIDADE
  @media (max-width: 900px) {
    flex-direction: column; // Em tablets/celulares, vira coluna
    max-width: 600px; // Limita a largura quando estiver em coluna
  }
`;

// --- ÁREA DA IMAGEM (ESQUERDA) ---
export const ContainerImg = styled.div`
  flex: 1; // Ocupa 50% do espaço disponível
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #171d1f; // Cor de fundo caso a imagem não carregue
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover; // Garante que a imagem preencha sem distorcer
  }

  // Some com a imagem em telas menores para focar no login
  @media (max-width: 900px) {
    display: none; 
  }
`;

// --- ÁREA DO FORMULÁRIO (DIREITA) ---
export const ContainerForm = styled.div`
  flex: 1; // Ocupa os outros 50%
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem; // Mais espaçamento interno
  gap: 2rem;

  h1 {
    font-size: 3rem; // Aumentei para Desktop
    font-weight: 700;
    color: #fff;
  }

  p {
    font-size: 1.3rem;
    color: #a0a0a0;
  }

  // Ajustes para Tablet/Mobile
  @media (max-width: 1024px) {
    padding: 3rem;
    h1 { font-size: 2.5rem; }
  }

  @media (max-width: 480px) {
    padding: 2rem;
    h1 { font-size: 2rem; }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

// --- INPUTS PADRONIZADOS E GRANDES ---
export const CampoInput = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 1.2rem; // Label maior
    margin-bottom: 0.5rem;
    color: #e1e1e1;
    font-weight: 600;
  }

  input {
    padding: 1.2rem 1.5rem; // Input "Gordinho"
    border: 2px solid transparent; // Borda transparente para não pular no focus
    border-radius: 8px;
    background-color: #2a3236; // Um cinza um pouco mais claro que o fundo
    color: white;
    font-size: 1.2rem; // Letra maior ao digitar
    transition: all 0.2s ease-in-out;

    &::placeholder {
      color: #888;
      font-size: 1.1rem;
    }

    &:focus {
      outline: none;
      background-color: #333c42;
      border-color: #81fe88; // Foco verde combinando com o botão
    }
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1.2rem;
  border: none;
  border-radius: 8px;
  background-color: #81fe88;
  font-weight: 800;
  font-size: 1.3rem;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
  margin-top: 1rem;

  p{
    color: #132E35;
  }

  &:hover {
    background-color: #6be276;
    transform: translateY(-2px); // Efeitinho de "levantar"
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ContainerCadastro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
  margin-top: 1rem;
  
  p {
    font-size: 1rem;
  }
`;

export const LinkCadastro = styled(Link)`
  color: #81fe88;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
  gap: 0.5rem;
  text-decoration: none;
  transition: 0.2s;

  &:hover {
    text-decoration: underline;
    color: #fff;
  }
`;
