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
    carregarMeusPostsDoBanco();
  }, []);

  const [abaAtiva, setAbaAtiva] = useState("projetos");

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
              <strong>0</strong>
              <span>Conexões</span>
            </StatItem>
          </StatsContainer>
        </InfoContainer>

        <BtnEditar onClick={() => setModalIsOpen(true)}>
          {/* Tamanho controlado pelo CSS agora */}
          <FaPen /> Editar Perfil
        </BtnEditar>
      </PerfilHeader>

      {/* Linha divisória com REM */}
      <div
        style={{ height: "0.1rem", backgroundColor: "#333", width: "100%" }}
      />

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

      <>
        {abaAtiva === "projetos" && (
          <>
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
              <div
                style={{
                  textAlign: "center",
                  padding: "4rem",
                  color: "#888",
                  fontSize: "1.6rem",
                }}
              >
                <p>Você ainda não publicou nenhum projeto.</p>
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
            Projetos compartilhados...
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
            Projetos aprovados...
          </p>
        )}
      </>
    </PerfilContainer>
  );
};

export default Perfil;
