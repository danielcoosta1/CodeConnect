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
} from "./style";
import Perfil from "../Perfil";
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

  const [abaAtiva, setAbaAtiva] = useState("projetos"); // 'projetos' | 'compartilhados' | 'aprovados'

  if (!userProfile) return null;

  return (
    <PerfilContainer>
      <PerfilHeader>
        <ProfileAvatar src={userProfile.imagem} size={120} hasBorder={true} />
        <InfoContainer>
          <h2>{userProfile.nome}</h2>
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

      {/* CONTEÚDO QUE MUDA CONFORME A ABA */}

      <>
        {abaAtiva === "projetos" && (
          <>
            {/* LÓGICA DE RENDERIZAÇÃO CONDICIONAL MUTUAMENTE EXCLUSIVA */}
            {loadingProfile ? (
              // 1. SE ESTÁ CARREGANDO, mostra SOMENTE o Loading
              <LoadingState texto="Carregando perfil..." size={45} />
            ) : errorProfile ? (
              // 2. SE HOUVE ERRO, mostra o ErrorState
              <ErrorState
                mensagem={errorProfile}
                onRetry={() => carregarPerfilPublico(id)}
              />
            ) : userPosts.length > 0 ? (
              // 2. SE NÃO ESTÁ CARREGANDO E TEM POSTS, mostra a Grid
              <CardGrid>
                {userPosts.map((post) => (
                  <Card key={post.id} post={post} />
                ))}
              </CardGrid>
            ) : (
              // 3. SE NÃO ESTÁ CARREGANDO E NÃO TEM POSTS, mostra a mensagem de Vazio
              <div
                style={{ textAlign: "center", padding: "40px", color: "#888" }}
              >
                <p>Você ainda não publicou nenhum projeto.</p>
              </div>
            )}
          </>
        )}

        {abaAtiva === "compartilhados" && (
          <p style={{ color: "#888" }}>Projetos compartilhados...</p>
        )}
        {abaAtiva === "aprovados" && (
          <p style={{ color: "#888" }}>Projetos aprovados...</p>
        )}
      </>
    </PerfilContainer>
  );
};
export default PerfilPublico;
