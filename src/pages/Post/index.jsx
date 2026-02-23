import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ProfileAvatar from "../../components/ProfileAvatar";
import LoadingState from "../../components/LoadingState"; // Nossas ferramentas globais!
import ErrorState from "../../components/ErrorState"; // Nossas ferramentas globais!
import { FaArrowLeft, FaShareNodes } from "react-icons/fa6";
import defaultImg from "../Publicar/assets/exemplo.png";
import { FaGithub, FaPen, FaTrash } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
// Substitua o FaPen por FaRegEdit
import { FaRegEdit } from "react-icons/fa";
import {
  PostContainer,
  CoverImage,
  PostHeader,
  AuthorInfo,
  PostTitle,
  PostContent,
  TagList,
  TagItem,
  BackButton,
  AuthorContainer,
  ActionIcons,
  IconGroup,
  CodeContainer,
  CommentsContainer,
  FakeInputComment,
  LinksContainer,
  ProjectLink,
  HeaderTop,
  AuthorActions,
} from "./style";
import { usePost } from "../../hooks/usePost";
import { useAuth } from "../../hooks/useAuth";
import { FaCode, FaRegComment } from "react-icons/fa";
import ModalConfirmacao from "../../components/ModalConfirmacao";

const Post = () => {
  const { id } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    postDetails,
    loadingPostDetails,
    errorPostDetails,
    carregarPostPorId,
    deletarPostPorId,
    loadingDeletePost,
  } = usePost();

  const { user } = useAuth();

  const isAuthor = postDetails?.author?.id === user?.id;

  useEffect(() => {
    if (id) {
      carregarPostPorId(id);
    }
  }, [id]);

  const handleConfirmarExclusao = async () => {
    const sucesso = await deletarPostPorId(id);

    // Se deu certo, ele manda pro feed. (O modal já se fechou sozinho!)
    if (sucesso) {
      navigate("/feed");
    }
  };

  if (loadingPostDetails) {
    return <LoadingState texto="Carregando post..." size={45} />;
  }

  if (errorPostDetails) {
    return (
      <ErrorState
        mensagem={errorPostDetails}
        onRetry={() => carregarPostPorId(id)}
      />
    );
  }

  if (!postDetails) {
    return null;
  }

  // Renderização de Sucesso
  return (
    <>
      <PostContainer>
        <PostHeader>
          <HeaderTop>
            <BackButton onClick={() => navigate(-1)}>
              <FaArrowLeft /> Voltar
            </BackButton>

            {/* Renderização Condicional: Só aparece se for o dono! */}
            {isAuthor && (
              <AuthorActions>
                <button
                  className="btn-edit"
                  onClick={() => console.log("Editar post")}
                >
                  <FaRegEdit /> <span>Editar</span>
                </button>
                <button
                  className="btn-delete"
                  onClick={() => setIsModalOpen(true)}
                >
                  <FaTrash /> <span>Excluir</span>
                </button>
              </AuthorActions>
            )}
          </HeaderTop>

          <CoverImage>
            <img
              src={
                postDetails.image
                  ? `data:image/png;base64,${postDetails.image}`
                  : defaultImg
              }
              alt={`Capa do projeto ${postDetails.title}`}
            />
          </CoverImage>

          <PostTitle>{postDetails.title}</PostTitle>
          <LinksContainer>
            <ProjectLink
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              $primary={true}
            >
              <FaExternalLinkAlt /> <span>Acessar Projeto</span>
            </ProjectLink>

            <ProjectLink href="#" target="_blank" rel="noopener noreferrer">
              <FaGithub /> <span>Ver Código-Fonte</span>
            </ProjectLink>
          </LinksContainer>
          <PostContent>
            <p>{postDetails.content}</p>
          </PostContent>

          {postDetails.tags && postDetails.tags.length > 0 && (
            <TagList>
              {postDetails.tags.map((tag, index) => (
                <TagItem key={index}>{tag}</TagItem>
              ))}
            </TagList>
          )}

          <AuthorContainer>
            <ActionIcons>
              <IconGroup>
                <FaCode /> <span>0</span>
              </IconGroup>
              <IconGroup>
                <FaShareNodes /> <span>0</span>
              </IconGroup>
              <IconGroup>
                <FaRegComment /> <span>0</span>
              </IconGroup>
            </ActionIcons>
            <AuthorInfo to={`/perfil/${postDetails.author.id}`}>
              <ProfileAvatar
                src={postDetails.author?.imagem}
                size={50}
                hasBorder={true}
              />
              <div>
                <h3>
                  {postDetails.author.nome} {postDetails.author.sobrenome}
                </h3>
                <small>@{postDetails.author.usuario}</small>
              </div>
            </AuthorInfo>
          </AuthorContainer>
        </PostHeader>
        <CodeContainer>
          <pre>
            <code>
              {`// Trecho de código em destaque
function saudarComunidade(usuario) {
  console.log(\`Olá, \${usuario}! Bem-vindo ao meu projeto.\`);
  return true;
}

saudarComunidade("Dev");`}
            </code>
          </pre>
        </CodeContainer>
        <CommentsContainer>
          <h2>Comentários</h2>
          <p>Seja o primeiro a comentar neste projeto!</p>

          <FakeInputComment>
            <input
              type="text"
              placeholder="Adicione um comentário..."
              disabled={loadingPostDetails}
            />
            <button type="button">Comentar</button>
          </FakeInputComment>

          {/* Futuramente faremos um map() dos comentários reais aqui */}
        </CommentsContainer>
      </PostContainer>

      <ModalConfirmacao
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmarExclusao}
        titulo="Excluir Projeto"
        mensagem="Tem certeza de que deseja excluir este projeto? Esta ação não poderá ser desfeita."
        textoConfirmar="Sim, Excluir"
        isDestructive={true} // Ativa o botão vermelho!
      />
    </>
  );
};

export default Post;
