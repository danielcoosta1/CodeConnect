import { useNavigate, useParams } from "react-router-dom";
import { usePost } from "../../hooks/usePost";
import { useAuth } from "../../hooks/useAuth";
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
  Divider,
  TabContent,
  EmptyMessage,
} from "../Perfil/style"; // Importando do style.js unificado do Perfil
import ProfileAvatar from "../../components/ProfileAvatar";
import { CardGrid } from "../../components/CardGrid/style";
import Card from "../../components/Card";
import { FiUserPlus, FiUserCheck, FiUserX } from "react-icons/fi";
import { LuLoader } from "react-icons/lu";
import { toastSucesso } from "../../utils/toast";

import GithubDashboard from "../../components/GithubDashboard";
import { BotaoSeguir } from "./style";

const PerfilPublico = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user: usuarioLogado, handleToggleFollow, loadingFollow } = useAuth();

  const {
    carregarPerfilPublico,
    userProfile,
    userPosts,
    loadingProfile,
    errorProfile,
    atualizarSeguidoresPerfilPublico,
  } = usePost();

  const [abaAtiva, setAbaAtiva] = useState("projetos");
  const [isHoveringBtn, setIsHoveringBtn] = useState(false);

  useEffect(() => {
    if (id) {
      carregarPerfilPublico(id);
    }
  }, [id]);

  useEffect(() => {
    if (usuarioLogado && usuarioLogado.id === id) {
      navigate("/perfil", { replace: true });
    }
  }, [id, usuarioLogado, navigate]);

  const isFollowing = usuarioLogado?.followingIds?.includes(id);
  const isMyOwnProfile = usuarioLogado?.id === id;

  const lidarComSeguir = async () => {
    const resultIsFollowing = await handleToggleFollow(id);
    if (resultIsFollowing !== undefined) {
      atualizarSeguidoresPerfilPublico(resultIsFollowing, usuarioLogado.id);
      if (resultIsFollowing) {
        toastSucesso(`Você começou a seguir ${userProfile.nome}!`);
      } else {
        toastSucesso(`Você deixou de seguir ${userProfile.nome}.`);
      }
    }
  };

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
              $isFollowing={isFollowing}
              onClick={lidarComSeguir}
              disabled={loadingFollow}
              onMouseEnter={() => setIsHoveringBtn(true)}
              onMouseLeave={() => setIsHoveringBtn(false)}
            >
              {loadingFollow ? (
                <>
                  <LuLoader className="spin" /> Aguarde...
                </>
              ) : isFollowing ? (
                isHoveringBtn ? (
                  <>
                    <FiUserX /> Deixar de Seguir
                  </>
                ) : (
                  <>
                    <FiUserCheck /> Seguindo
                  </>
                )
              ) : (
                <>
                  <FiUserPlus /> Seguir
                </>
              )}
            </BotaoSeguir>
          )}
        </InfoContainer>
      </PerfilHeader>

      <Divider />

      <ProfileNav>
        <ProfileTab
          $active={abaAtiva === "projetos"}
          onClick={() => setAbaAtiva("projetos")}
        >
          Projetos
        </ProfileTab>
        <ProfileTab
          $active={abaAtiva === "estatisticas"}
          onClick={() => setAbaAtiva("estatisticas")}
        >
          Estatísticas
        </ProfileTab>
      </ProfileNav>

      {/* BLOCO DA ABA DE PROJETOS */}
      {abaAtiva === "projetos" && (
        <TabContent>
          {userPosts.length > 0 ? (
            <CardGrid>
              {userPosts.map((post) => (
                <Card key={post.id} post={post} />
              ))}
            </CardGrid>
          ) : (
            <EmptyMessage>
              <p>{userProfile.nome} ainda não publicou nenhum projeto.</p>
            </EmptyMessage>
          )}
        </TabContent>
      )}

      {/* BLOCO DA ABA DE ESTATÍSTICAS (NOVO COMPONENTE) */}
      {abaAtiva === "estatisticas" && (
        <TabContent>
          <GithubDashboard
            githubUsername={userProfile.github_username}
            isOwner={false}
          />
        </TabContent>
      )}
    </PerfilContainer>
  );
};

export default PerfilPublico;
