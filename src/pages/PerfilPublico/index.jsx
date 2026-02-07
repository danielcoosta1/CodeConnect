import { useParams } from "react-router-dom";
import { usePost } from "../../hooks/usePost";
import { useEffect, useState } from "react";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";
import {
  InfoContainer,
  PerfilContainer,
  PerfilHeader,
  ProfileNav,
  ProfileTab,
  StatItem,
  StatsContainer,
} from "./style"; // Importando do Perfil original (ou do arquivo de estilos dessa pasta)
import ProfileAvatar from "../../components/ProfileAvatar";
import { CardGrid } from "../../components/CardGrid/style";
import Card from "../../components/Card";

const PerfilPublico = () => {
  const { id } = useParams();

  const {
    carregarPerfilPublico,
    userProfile,
    userPosts,
    loadingProfile,
    errorProfile,
  } = usePost();

  useEffect(() => {
    if (id) {
      carregarPerfilPublico(id);
    }
  }, [id]);

  const [abaAtiva, setAbaAtiva] = useState("projetos");

  // --- CORREÇÃO 1: Loading acontece ANTES de checar o userProfile ---
  if (loadingProfile) {
    return <LoadingState texto="Carregando perfil..." size={50} />;
  }

  // --- CORREÇÃO 2: Erro acontece ANTES de checar o userProfile ---
  if (errorProfile) {
    return (
      <ErrorState
        mensagem={errorProfile}
        onRetry={() => carregarPerfilPublico(id)}
      />
    );
  }

  // Agora sim: Se não estiver carregando, não tiver erro e user for null, retorna null
  if (!userProfile) return null;

  return (
    <PerfilContainer>
      <PerfilHeader>
        <ProfileAvatar src={userProfile.imagem} size={120} hasBorder={true} />
        <InfoContainer>
          {/* Mostra Nome e Sobrenome */}
          <h2>
            {userProfile.nome} {userProfile.sobrenome}
          </h2>

          <span>@{userProfile.usuario || "usuario"}</span>

          {userProfile.funcao && <p className="funcao">{userProfile.funcao}</p>}

          <p className="bio">
            {userProfile.bio || "Este usuário ainda não adicionou uma bio."}
          </p>

          <StatsContainer>
            <StatItem>
              <strong>{userPosts.length}</strong>
              <span>Projetos</span>
            </StatItem>
            <StatItem>
              <strong>0</strong>
              <span>Conexões</span>
            </StatItem>
          </StatsContainer>
        </InfoContainer>
      </PerfilHeader>

      <div style={{ height: "1px", backgroundColor: "#333", width: "100%" }} />

      <ProfileNav>
        <ProfileTab
          $active={abaAtiva === "projetos"}
          onClick={() => setAbaAtiva("projetos")}
        >
          Projetos
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

      <>
        {abaAtiva === "projetos" && (
          <>
            {userPosts.length > 0 ? (
              <CardGrid>
                {userPosts.map((post) => (
                  <Card key={post.id} post={post} />
                ))}
              </CardGrid>
            ) : (
              // --- CORREÇÃO 3: Texto de feedback ajustado (Você -> Ele) ---
              <div
                style={{ textAlign: "center", padding: "40px", color: "#888" }}
              >
                <p>{userProfile.nome} ainda não publicou nenhum projeto.</p>
              </div>
            )}
          </>
        )}

        {abaAtiva === "compartilhados" && (
          <p style={{ color: "#888", textAlign: "center", marginTop: "20px" }}>
            Em breve...
          </p>
        )}
        {abaAtiva === "aprovados" && (
          <p style={{ color: "#888", textAlign: "center", marginTop: "20px" }}>
            Em breve...
          </p>
        )}
      </>
    </PerfilContainer>
  );
};

export default PerfilPublico;
