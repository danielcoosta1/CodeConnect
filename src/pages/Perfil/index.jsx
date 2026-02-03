import { useEffect, useState } from "react";
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

import { CardGrid } from "../../components/CardGrid/style.js";
import Card from "../../components/Card";
import { usePost } from "../../hooks/usePost";
import LoadingState from "../../components/LoadingState/index.jsx";
import ErrorState from "../../components/ErrorState/index.jsx";
import ModalEditarPerfil from "../../components/ModalEditarPerfil/index.jsx";
import ProfileAvatar from "../../components/ProfileAvatar/index.jsx";

const Perfil = () => {
  const { user } = useAuth();
  const { carregarMeusPostsDoBanco, myPosts, loadingMyPosts, errorMyPosts } =
    usePost();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    carregarMeusPostsDoBanco(); // Zero parâmetros. O token cuida de tudo!
  }, []);

  // Estado para controlar qual aba está selecionada
  const [abaAtiva, setAbaAtiva] = useState("projetos"); // 'projetos' | 'compartilhados' | 'aprovados'

  if (!user) return null;

  return (
    <PerfilContainer>
      <ModalEditarPerfil
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      />

      <PerfilHeader>
        <ProfileAvatar src={user.imagem} size={120} hasBorder={true} />

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
              <strong>{myPosts.length}</strong>
              <span>Projetos</span>
            </StatItem>
            <StatItem>
              <strong>0</strong>
              <span>Conexões</span>
            </StatItem>
          </StatsContainer>
        </InfoContainer>

        <BtnEditar onClick={() => setModalIsOpen(true)}>
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

      <>
        {abaAtiva === "projetos" && (
          <>
            {/* LÓGICA DE RENDERIZAÇÃO CONDICIONAL MUTUAMENTE EXCLUSIVA */}
            {loadingMyPosts ? (
              // 1. SE ESTÁ CARREGANDO, mostra SOMENTE o Loading
              <LoadingState texto="Carregando seus projetos..." size={45} />
            ) : errorMyPosts ? (
              // 2. SE HOUVE ERRO, mostra o ErrorState
              <ErrorState
                mensagem={errorMyPosts}
                onRetry={carregarMeusPostsDoBanco}
              />
            ) : myPosts.length > 0 ? (
              // 2. SE NÃO ESTÁ CARREGANDO E TEM POSTS, mostra a Grid
              <CardGrid>
                {myPosts.map((post) => (
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

export default Perfil;
