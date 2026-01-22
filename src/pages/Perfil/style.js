import styled from "styled-components";

export const PerfilContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  gap: 30px;
  color: #bcbcbc;
`;

export const PerfilHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 24px;
  background-color: #171d1f;
  padding: 30px;
  border-radius: 8px;
  position: relative;
`;

export const AvatarGrande = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #81fe88;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1; /* Ocupa o espaço restante para empurrar o botão de editar */

  h2 {
    color: #ffffff;
    font-size: 2rem;
    margin: 0;
  }

  span {
    font-size: 1.1rem;
    color: #888888;
  }

  p.funcao {
    color: #81fe88;
    font-weight: bold;
    font-size: 1rem;
    text-transform: uppercase;
    margin-top: 5px;
  }

  p.bio {
    margin-top: 10px;
    font-size: 1rem;
    line-height: 1.5;
    max-width: 600px;
  }
`;

/* --- NOVO: Container dos Números (Seguidores/Compartilhamentos) --- */
export const StatsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 15px;
`;

export const StatItem = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;

  strong {
    color: #ffffff;
    font-size: 1.2rem;
  }

  span {
    font-size: 0.9rem;
    color: #888888;
  }
`;

export const BtnEditar = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  background: transparent;
  border: 1px solid #81fe88;
  color: #81fe88;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #81fe88;
    color: #171d1f;
  }
`;

/* --- NOVO: Barra de Navegação Interna (Abas) --- */
export const ProfileNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;

  margin-top: 10px;
`;

// Botão que finge ser um Link (Tab)
export const ProfileTab = styled.button`
  background: none;
  border: none;
  font-size: 1.1rem;
  padding-bottom: 10px;
  cursor: pointer;
  color: ${({ $active }) => ($active ? "#81fe88" : "#888888")};
  border-bottom: 2px solid
    ${({ $active }) => ($active ? "#81fe88" : "transparent")};
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  transition: all 0.2s;

  &:hover {
    color: #ffffff;
  }
`;
