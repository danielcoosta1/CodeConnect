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
import GithubDashboard from "../../components/GithubDashboard/index.jsx";

// Importações novas para o Modal de Conexões
import ModalConexoes from "../../components/ModalConexoes";
import { getNetworkRequest } from "../../services/userService";
import { toastErro } from "../../utils/toast";

const Perfil = () => {
  const { user } = useAuth();
  const { carregarMeusPostsDoBanco, myPosts, loadingMyPosts, errorMyPosts } = usePost();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState("projetos");

  // Novos estados para o Modal de Conexões
  const [modalConexoesAtivo, setModalConexoesAtivo] = useState(false);
  const [dadosModalConexoes, setDadosModalConexoes] = useState({
    titulo: "",
    lista: [],
  });
  const [loadingRede, setLoadingRede] = useState(false);

  useEffect(() => {
    carregarMeusPostsDoBanco();
  }, []);

  // Nova função para buscar a rede do próprio usuário
  const lidarComAbrirModalConexoes = async (tipo) => {
    setLoadingRede(true);
    try {
      const rede = await getNetworkRequest(user.id);
      
      if (tipo === "followers") {
        setDadosModalConexoes({ 
          titulo: "Seguidores", 
          lista: rede.seguidores || [] 
        });
      } else {
        setDadosModalConexoes({ 
          titulo: "Seguindo", 
          lista: rede.seguindo || [] 
        });
      }
      setModalConexoesAtivo(true);
    } catch (error) {
      console.error("Erro ao carregar sua rede:", error);
      toastErro("Não foi possível carregar as conexões");
    } finally {
      setLoadingRede(false);
    }
  };

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
            
            <StatItem
              $isClickable={true}
              $isLoading={loadingRede}
              onClick={() => lidarComAbrirModalConexoes("following")}
            >
              <strong>{user.followingIds?.length || 0}</strong>
              <span>Seguindo</span>
            </StatItem>

            <StatItem
              $isClickable={true}
              $isLoading={loadingRede}
              onClick={() => lidarComAbrirModalConexoes("followers")}
            >
              <strong>{user.followerIds?.length || 0}</strong>
              <span>Seguidores</span>
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

      {/* BLOCO DA ABA DE ESTATÍSTICAS */}
      {abaAtiva === "estatisticas" && (
        <TabContent>
          <GithubDashboard
            githubUsername={user.github_username}
            isOwner={true}
          />
        </TabContent>
      )}

      {/* MODAL DE CONEXÕES REAPROVEITADO */}
      <ModalConexoes
        isOpen={modalConexoesAtivo}
        onClose={() => setModalConexoesAtivo(false)}
        titulo={dadosModalConexoes.titulo}
        usuarios={dadosModalConexoes.lista}
      />
    </PerfilContainer>
  );
};

export default Perfil;