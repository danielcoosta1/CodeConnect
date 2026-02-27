import { useParams } from "react-router-dom";
import { usePost } from "../../hooks/usePost";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";
import {
  BotaoSeguir,
  InfoContainer,
  PerfilContainer,
  PerfilHeader,
  ProfileNav,
  ProfileTab,
  StatItem,
  StatsContainer,
} from "./style";
import ProfileAvatar from "../../components/ProfileAvatar";
import { CardGrid } from "../../components/CardGrid/style";
import Card from "../../components/Card";

const PerfilPublico = () => {
  const { id } = useParams();

  const { user: usuarioLogado, handleToggleFollow, loadingFollow } = useAuth();

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

  // Verifica se o usuário logado já segue o perfil que está visitando
  const isFollowing = usuarioLogado?.followingIds?.includes(id);

  // Verifica se o perfil que está sendo visitado é o próprio perfil do usuário logado
  const isMyOwnProfile = usuarioLogado?.id === id;

  if (loadingProfile) {
    return <LoadingState texto="Carregando perfil..." size={45} />;
  }

  if (errorProfile) {
    return (
      <ErrorState
        mensagem={errorProfile}
        onRetry={() => carregarPerfilPublico(id)}
      />
    );
  }

  if (!userProfile) return null;

  return (
    <PerfilContainer>
      <PerfilHeader>
        {/* Usando 150 de size para ficar do mesmo tamanho do perfil privado */}
        <ProfileAvatar src={userProfile.imagem} size={150} hasBorder={true} />

        <InfoContainer>
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
              <strong>{userProfile.followingIds?.length || 0}</strong>
              <span>Seguindo</span>
            </StatItem>
            <StatItem>
              <strong>{userProfile.followerIds?.length || 0}</strong>
              <span>Seguidores</span>
            </StatItem>
          </StatsContainer>
          {!isMyOwnProfile && (
            <BotaoSeguir
              $isFollowing={isFollowing} // O style muda a cor com base nisso
              onClick={() => handleToggleFollow(id)}
              disabled={loadingFollow}
            >
              {loadingFollow
                ? "Aguarde..."
                : isFollowing
                  ? "Deixar de Seguir"
                  : "Seguir"}
            </BotaoSeguir>
          )}
        </InfoContainer>
      </PerfilHeader>

      {/* Linha divisória fina em REM */}
      <div
        style={{ height: "0.1rem", backgroundColor: "#333", width: "100%" }}
      />

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
              <div
                style={{
                  textAlign: "center",
                  padding: "4rem",
                  color: "#888",
                  fontSize: "1.6rem",
                }}
              >
                <p>{userProfile.nome} ainda não publicou nenhum projeto.</p>
              </div>
            )}
          </>
        )}

        {abaAtiva === "compartilhados" && (
          <p
            style={{
              color: "#888",
              fontSize: "1.6rem",
              textAlign: "center",
              padding: "2rem",
            }}
          >
            Em breve...
          </p>
        )}
        {abaAtiva === "aprovados" && (
          <p
            style={{
              color: "#888",
              fontSize: "1.6rem",
              textAlign: "center",
              padding: "2rem",
            }}
          >
            Em breve...
          </p>
        )}
      </>
    </PerfilContainer>
  );
};

export default PerfilPublico;
