import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  PerfilContainer,
  PerfilHeader,
  AvatarGrande,
  InfoContainer,
  BtnEditar,
  StatsContainer,
  StatItem,
  ProfileNav,
  ProfileTab,
} from "./style";
import { FaPen } from "react-icons/fa";

const Perfil = () => {
  const { user } = useAuth();

  // Estado para controlar qual aba está selecionada
  const [abaAtiva, setAbaAtiva] = useState("projetos"); // 'projetos' | 'compartilhados' | 'aprovados'

  const handleAbrirModal = () => {
    alert("Em breve: Modal de Edição com integração ao Backend!");
  };

  if (!user) return null;

  return (
    <PerfilContainer>
      <PerfilHeader>
        <AvatarGrande
          src={user.imagem || "https://via.placeholder.com/150"}
          alt={user.nome}
        />

        <InfoContainer>
          <h2>{user.nome}</h2>
          <span>@{user.usuario || "usuario"}</span>

          {user.funcao && <p className="funcao">{user.funcao}</p>}

          <p className="bio">
            {user.bio ||
              "Olá! Eu estou usando o CodeConnect para compartilhar meus projetos."}
          </p>

          {/* NOVOS DADOS ESTATÍSTICOS */}
          <StatsContainer>
            <StatItem>
              <strong>0</strong>
              <span>Projetos</span>
            </StatItem>
            <StatItem>
              <strong>0</strong>
              <span>Conexões</span>
            </StatItem>
          </StatsContainer>
        </InfoContainer>

        <BtnEditar onClick={handleAbrirModal}>
          <FaPen size={12} /> Editar Perfil
        </BtnEditar>
      </PerfilHeader>

      <div style={{ height: "1px", backgroundColor: "#333", width: "100%" }} />

      {/* BARRA DE NAVEGAÇÃO (ABAS) */}
      <ProfileNav>
        <ProfileTab
          $active={abaAtiva === "projetos"}
          onClick={() => setAbaAtiva("projetos")}
        >
          Meus Projetos
        </ProfileTab>
        <ProfileTab
          $active={abaAtiva === "compartilhados"}
          onClick={() => setAbaAtiva("compartilhados")}
        >
          Compartilhados
        </ProfileTab>
        <ProfileTab
          $active={abaAtiva === "aprovados"}
          onClick={() => setAbaAtiva("aprovados")}
        >
          Aprovados
        </ProfileTab>
      </ProfileNav>

      {/* CONTEÚDO QUE MUDA CONFORME A ABA */}
      <div style={{ marginTop: "20px" }}>
        {abaAtiva === "projetos" && (
          <p style={{ color: "#888" }}>Lista dos meus projetos publicados...</p>
          // Aqui futuramente entra o <FeedGrid> filtrado pelo ID do user
        )}

        {abaAtiva === "compartilhados" && (
          <p style={{ color: "#888" }}>Projetos que eu compartilhei...</p>
        )}

        {abaAtiva === "aprovados" && (
          <p style={{ color: "#888" }}>
            Projetos que receberam selo de aprovação...
          </p>
        )}
      </div>
    </PerfilContainer>
  );
};

export default Perfil;
