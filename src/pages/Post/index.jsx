import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ProfileAvatar from "../../components/ProfileAvatar";
import LoadingState from "../../components/LoadingState"; // Nossas ferramentas globais!
import ErrorState from "../../components/ErrorState"; // Nossas ferramentas globais!
import { FaArrowLeft, FaShareNodes } from "react-icons/fa6";
import defaultImg from "../Publicar/assets/exemplo.png";
import { FaGithub, FaTrash } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
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
  InputComment,
  CommentList,
  CommentItem,
  CommentContent,
  CommentHeaderInfo,
  LinksContainer,
  ProjectLink,
  HeaderTop,
  AuthorActions,
  CommentContentContainer,
  AuthorActionsComment,
} from "./style";
import { usePost } from "../../hooks/usePost";
import { useAuth } from "../../hooks/useAuth";
import { FaCode, FaRegComment } from "react-icons/fa";
import ModalConfirmacao from "../../components/ModalConfirmacao";
import { useComments } from "../../hooks/useComments";

const Post = () => {
  const { id } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCommentOpen, setIsModalCommentOpen] = useState(false); // Novo estado para o modal de comentário
  const [commentToDelete, setCommentToDelete] = useState(null); // Armazena o comentário que queremos excluir

  const {
    postDetails,
    loadingPostDetails,
    errorPostDetails,
    carregarPostPorId,
    deletarPostPorId,
  } = usePost();

  const { user } = useAuth();

  const isAuthor = postDetails?.author?.id === user?.id;

  useEffect(() => {
    if (id) {
      carregarPostPorId(id);
    }
  }, [id]);

  const {
    comments,
    commentText,
    setCommentText,
    loadingComments,
    enviandoComment,
    handleComentar,
  } = useComments(id);

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
                  onClick={() => navigate(`/editar/${id}`)}
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
            {/* --- LÓGICA DO DEPLOY --- */}
            {postDetails.projectUrl ? (
              <ProjectLink
                href={postDetails.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                $primary={true}
              >
                <FaExternalLinkAlt /> <span>Acessar Projeto</span>
              </ProjectLink>
            ) : (
              <ProjectLink as="span" $desabilitado>
                <FaExternalLinkAlt /> <span>Deploy Indisponível</span>
              </ProjectLink>
            )}

            {/* --- LÓGICA DO GITHUB --- */}
            {postDetails.repoUrl ? (
              <ProjectLink
                href={postDetails.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub /> <span>Ver Código-Fonte</span>
              </ProjectLink>
            ) : (
              <ProjectLink as="span" $desabilitado>
                <FaGithub /> <span>Repositório Privado</span>
              </ProjectLink>
            )}
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
        {postDetails.codeContent && (
          <CodeContainer>
            <ReactMarkdown>{postDetails.codeContent}</ReactMarkdown>
          </CodeContainer>
        )}
        <CommentsContainer>
          <h2>Comentários ({comments.length})</h2>

          {/* SÓ MOSTRA O INPUT SE O USUÁRIO ESTIVER LOGADO */}
          {user ? (
            <InputComment onSubmit={handleComentar}>
              <input
                type="text"
                placeholder="Adicione um comentário construtivo..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={enviandoComment || loadingPostDetails}
              />
              <button
                type="submit"
                disabled={enviandoComment || !commentText.trim()}
              >
                {enviandoComment ? "Enviando..." : "Comentar"}
              </button>
            </InputComment>
          ) : (
            <p>Faça login para participar da discussão.</p>
          )}

          {/* LISTA DE COMENTÁRIOS */}
          {loadingComments ? (
            <p>Carregando comentários...</p>
          ) : comments.length === 0 ? (
            <p>Seja o primeiro a comentar neste projeto!</p>
          ) : (
            <CommentList>
              {comments.map((comment) => (
                <CommentItem key={comment.id}>
                  <ProfileAvatar
                    src={comment.author?.imagem}
                    size={45}
                    hasBorder={false} // Tira a borda verde neon porque o fundo é branco
                  />

                  <CommentContentContainer>
                    <CommentContent>
                      <CommentHeaderInfo>
                        <h4>
                          {comment.author?.nome} {comment.author?.sobrenome}
                        </h4>
                        <span>@{comment.author?.usuario}</span>
                      </CommentHeaderInfo>

                      <p>{comment.text}</p>
                    </CommentContent>
                    <AuthorActionsComment>
                      <button
                        className="btn-delete"
                        onClick={() => {
                          setIsModalCommentOpen(true);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </AuthorActionsComment>
                  </CommentContentContainer>
                </CommentItem>
              ))}
            </CommentList>
          )}
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
