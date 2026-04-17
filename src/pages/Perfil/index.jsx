import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  PerfilContainer,
  PerfilHeader,
  InfoContainer,
  BtnEditar,
  StatsContainer,
  StatItem,
  ProfileNav,
  ProfileTab,
  Divider,
  TabContent,
  EmptyMessage,
} from "./style";
import { FaPen } from "react-icons/fa";

import { CardGrid } from "../../components/CardGrid/style.js";
import Card from "../../components/Card";
import { usePost } from "../../hooks/usePost";
import LoadingState from "../../components/LoadingState/index.jsx";
import ErrorState from "../../components/ErrorState/index.jsx";
import ModalEditarPerfil from "../../components/ModalEditarPerfil/index.jsx";
import ProfileAvatar from "../../components/ProfileAvatar/index.jsx";

// O componente inteligente faz todo o trabalho pesado agora
import GithubDashboard from "../../components/GithubDashboard/index.jsx";

const Perfil = () => {
  const { user } = useAuth();
  const { carregarMeusPostsDoBanco, myPosts, loadingMyPosts, errorMyPosts } = usePost();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState("projetos");

  useEffect(() => {
    carregarMeusPostsDoBanco();
  }, []);

  if (!user) return null;

  return (
    <PerfilContainer>
      <ModalEditarPerfil
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      />

      <PerfilHeader>
        <ProfileAvatar src={user.imagem} size={150} hasBorder={true} />

        <InfoContainer>
          <h2>
            {user.nome} {user.sobrenome}
          </h2>
          <span>@{user.usuario || "usuario"}</span>

          {user.funcao && <p className="funcao">{user.funcao}</p>}

          <p className="bio">
            {user.bio ||
              "Olá! Eu estou usando o CodeConnect para compartilhar meus projetos."}
          </p>

          <StatsContainer>
            <StatItem>
              <strong>{myPosts.length}</strong>
              <span>Projetos</span>
            </StatItem>
            <StatItem>
              <strong>{user.followerIds?.length || 0}</strong>
              <span>Conexões</span>
            </StatItem>
          </StatsContainer>
        </InfoContainer>

        <BtnEditar onClick={() => setModalIsOpen(true)}>
          <FaPen /> Editar Perfil
        </BtnEditar>
      </PerfilHeader>

      <Divider />

      <ProfileNav>
        <ProfileTab
          $active={abaAtiva === "projetos"}
          onClick={() => setAbaAtiva("projetos")}
        >
          Meus Projetos
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
          {loadingMyPosts ? (
            <LoadingState texto="Carregando seus projetos..." size={45} />
          ) : errorMyPosts ? (
            <ErrorState
              mensagem={errorMyPosts}
              onRetry={carregarMeusPostsDoBanco}
            />
          ) : myPosts.length > 0 ? (
            <CardGrid>
              {myPosts.map((post) => (
                <Card key={post.id} post={post} />
              ))}
            </CardGrid>
          ) : (
            <EmptyMessage>
              <p>Você ainda não publicou nenhum projeto.</p>
            </EmptyMessage>
          )}
        </TabContent>
      )}

      {/* BLOCO DA ABA DE ESTATÍSTICAS (NOVO COMPONENTE) */}
      {abaAtiva === "estatisticas" && (
        <TabContent>
          <GithubDashboard
            githubUsername={user.github_username}
            isOwner={true} // Define que é o perfil do dono
          />
        </TabContent>
      )}
    </PerfilContainer>
  );
};

export default Perfil;