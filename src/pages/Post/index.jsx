import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ProfileAvatar from "../../components/ProfileAvatar";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";
import { FaArrowLeft, FaShareNodes } from "react-icons/fa6";
import defaultImg from "../Publicar/assets/exemplo.png";
import {
  FaGithub,
  FaTrash,
  FaCode,
  FaRegComment,
  FaExternalLinkAlt,
  FaRegEdit,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaRegStar,
  FaReply,
} from "react-icons/fa";
import ReactMarkdown from "react-markdown";

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
  InputComment,
  CommentList,
  CommentItem,
  CommentHeaderInfo,
  HeaderTop,
  AuthorActions,
  CommentContentContainer,
  CommentsContent,
  AuthorActionsComment,
  RepliesContainer,
  CommentsContainer,
  ActionButton,
  SolutionBadge,
  ActionContainer,
  ActionRow,
  ActionDivider,
  ProjectLink,
  BigSocialButton,
} from "./style";

import { usePost } from "../../hooks/usePost";
import { useAuth } from "../../hooks/useAuth";
import ModalConfirmacao from "../../components/ModalConfirmacao";
import { useComments } from "../../hooks/useComments";
import { toastErro, toastSucesso } from "../../utils/toast";

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const {
    postDetails,
    loadingPostDetails,
    errorPostDetails,
    carregarPostPorId,
    deletarPostPorId,
    curtirPost,
    compartilharPost,
  } = usePost();

  const { user } = useAuth();
  const isAuthorPost = postDetails?.author?.id === user?.id;

  const hasLikedPost = postDetails?.likeIds?.includes(user?.id);

  useEffect(() => {
    if (id) {
      carregarPostPorId(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const {
    comments,
    commentText,
    setCommentText,
    loadingComments,
    enviandoComment,
    handleComentar,
    handleDeletarComentario,
    loadingDelete,
    handleToggleLike,
    handleToggleSolution,
  } = useComments(id);

  const handleConfirmarExclusao = async () => {
    const sucesso = await deletarPostPorId(id);
    if (sucesso) {
      navigate("/feed");
    }
  };

  // FUNÇÃO AUXILIAR PARA O ENVIO DA RESPOSTA
  const submitReply = async (e, parentId) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    // Chama o hook passando o evento, o texto da resposta e o ID do comentário pai
    await handleComentar(e, parentId, replyText);

    setReplyText("");
    setReplyingTo(null); // Fecha a caixinha de resposta
  };

  if (loadingPostDetails)
    return <LoadingState texto="Carregando post..." size={45} />;
  if (errorPostDetails)
    return (
      <ErrorState
        mensagem={errorPostDetails}
        onRetry={() => carregarPostPorId(id)}
      />
    );
  if (!postDetails) return null;

  const handleShare = async () => {
    const link = window.location.href; // Aqui já estamos na URL certa!

    // 1. CHAMA A API IMEDIATAMENTE!
    compartilharPost(id);

    try {
      // 2. Abre a gaveta do celular
      if (navigator.share) {
        await navigator.share({
          title: "CodeConnect",
          text: `Dá uma olhada no projeto "${postDetails.title}" no CodeConnect!`,
          url: link,
        });
      } else {
        // 3. Copia o link no PC
        await navigator.clipboard.writeText(link);
        toastSucesso("Link copiado para a área de transferência!");
      }
    } catch (error) {
      console.log("Compartilhamento cancelado pelo usuário.", error);
    }
  };

  // =======================================================================
  // MOTOR DE RENDERIZAÇÃO DE COMENTÁRIOS (PAIS E FILHOS)
  // =======================================================================
  const renderComment = (comment, isReply = false) => {
    const canDeleteComment = isAuthorPost || comment.authorId === user?.id;
    const hasLiked = comment.likeIds?.includes(user?.id);

    return (
      <CommentItem key={comment.id} $isSolution={comment.isSolution}>
        <ProfileAvatar
          src={comment.author?.imagem}
          size={
            isReply ? 35 : 45
          } /* Menor nas respostas para hierarquia visual */
          hasBorder={false}
        />

        <CommentContentContainer>
          <CommentsContent>
            <CommentHeaderInfo>
              <h4>
                {comment.author?.nome} {comment.author?.sobrenome}
              </h4>
              <span>@{comment.author?.usuario}</span>
              {/* COMPONENTE EXCLUSIVO PARA O BADGE */}
              {comment.isSolution && <SolutionBadge>🌟 Solução</SolutionBadge>}
            </CommentHeaderInfo>
            <p>{comment.text}</p>
          </CommentsContent>

          {/* BARRA DE AÇÕES DO COMENTÁRIO */}
          <AuthorActionsComment>
            {/* BOTÃO DE CURTIR */}
            <ActionButton
              onClick={() => handleToggleLike(comment.id)}
              $active={hasLiked}
              $activeColor="#ff5f56"
              $hoverColor="#ff5f56"
              title="Curtir comentário"
            >
              {hasLiked ? <FaHeart /> : <FaRegHeart />}{" "}
              {comment.likeIds?.length || 0}
            </ActionButton>

            {/* BOTÃO DE RESPONDER (SÓ MOSTRA SE NÃO FOR UMA RESPOSTA) */}
            {!isReply && user && (
              <ActionButton
                onClick={() =>
                  setReplyingTo(replyingTo === comment.id ? null : comment.id)
                }
                $hoverColor="#81fe88"
              >
                <FaReply /> Responder
              </ActionButton>
            )}

            {/* BOTÃO DE SOLUÇÃO DE OURO (SÓ O DONO DO POST VÊ) */}
            {isAuthorPost && !isReply && (
              <ActionButton
                onClick={() => handleToggleSolution(comment.id)}
                $active={comment.isSolution}
                $activeColor="#d4af37"
                $hoverColor="#d4af37"
                title="Marcar como Solução"
              >
                {comment.isSolution ? <FaStar /> : <FaRegStar />}
              </ActionButton>
            )}

            {/* LIXEIRA / CONFIRMAÇÃO */}
            {canDeleteComment &&
              (commentToDelete === comment.id ? (
                <div className="confirm-action">
                  <span className="confirm-text">Excluir?</span>
                  <button
                    className="btn-confirm-yes"
                    onClick={() => handleDeletarComentario(comment.id)}
                    disabled={loadingDelete}
                  >
                    Sim
                  </button>
                  <button
                    className="btn-confirm-no"
                    onClick={() => setCommentToDelete(null)}
                    disabled={loadingDelete}
                  >
                    Não
                  </button>
                </div>
              ) : (
                <ActionButton
                  onClick={() => setCommentToDelete(comment.id)}
                  $hoverColor="#ff5f56"
                  title="Excluir"
                >
                  <FaTrash />
                </ActionButton>
              ))}
          </AuthorActionsComment>

          {/* CAIXA DE INPUT PARA RESPONDER (Renderizada dentro do fluxo do conteúdo) */}
          {replyingTo === comment.id && (
            <div style={{ marginTop: "1.6rem" }}>
              {" "}
              <InputComment onSubmit={(e) => submitReply(e, comment.id)}>
                <input
                  type="text"
                  placeholder="Escreva sua resposta..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  disabled={enviandoComment}
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={enviandoComment || !replyText.trim()}
                >
                  Enviar
                </button>
              </InputComment>
            </div>
          )}

          {/* RENDERIZA AS RESPOSTAS DESSE COMENTÁRIO (RECURSIVIDADE) */}
          {!isReply && comment.replies && comment.replies.length > 0 && (
            <RepliesContainer>
              {comment.replies.map((reply) => renderComment(reply, true))}
            </RepliesContainer>
          )}
        </CommentContentContainer>
      </CommentItem>
    );
  };
  return (
    <>
      <PostContainer>
        <PostHeader>
          <HeaderTop>
            <BackButton onClick={() => navigate(-1)}>
              <FaArrowLeft /> Voltar
            </BackButton>
            {isAuthorPost && (
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
              alt="Capa do projeto"
            />
          </CoverImage>

          <PostTitle>{postDetails.title}</PostTitle>

          <ActionContainer>
            {/* LINHA 1: REPOSITÓRIO E DEPLOY */}
            <ActionRow>
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
            </ActionRow>

            {/* A LINHA SUTIL DE SEPARAÇÃO */}
            <ActionDivider />

            {/* LINHA 2: ENGAJAMENTO SOCIAL */}
            <ActionRow>
              <BigSocialButton
                $variant="like"
                $hasLiked={hasLikedPost}
                onClick={() => {
                  if (user) {
                    curtirPost(id);
                  } else {
                    toastErro("Você precisa estar logado para curtir!");
                  }
                }}
              >
                {hasLikedPost ? <FaHeart /> : <FaRegHeart />}
                {/* Envolvendo o texto num SPAN para o CSS sumir com ele no mobile */}
                <span>{hasLikedPost ? "Curtiu!" : "Curtir Projeto"}</span>
              </BigSocialButton>

              <BigSocialButton $variant="share" onClick={handleShare}>
                <FaShareNodes /> <span>Compartilhar</span>
              </BigSocialButton>
            </ActionRow>
          </ActionContainer>

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
              {/* --- ESTATÍSTICA DE CURTIDAS (Somente Leitura) --- */}
              <IconGroup
                style={{ color: hasLikedPost ? "#ff5f56" : "inherit" }}
              >
                {hasLikedPost ? <FaHeart /> : <FaRegHeart />}
                <span>{postDetails.likeIds?.length || 0}</span>
              </IconGroup>

              {/* --- ESTATÍSTICA DE COMPARTILHAMENTOS (Somente Leitura) --- */}
              <IconGroup>
                <FaShareNodes />
                <span>{postDetails.shares || 0}</span>
              </IconGroup>

              {/* --- ÍCONE DE COMENTÁRIOS (Continua clicável para rolar a tela) --- */}
              <IconGroup
                onClick={() =>
                  window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: "smooth",
                  })
                }
              >
                <FaRegComment />
                <span>{comments.length}</span>
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

          {/* INPUT DO COMENTÁRIO PRINCIPAL */}
          {user ? (
            <InputComment
              onSubmit={(e) => handleComentar(e, null, commentText)}
            >
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

          {/* LISTA DE COMENTÁRIOS USANDO A FUNÇÃO AUXILIAR */}
          {loadingComments ? (
            <p>Carregando comentários...</p>
          ) : comments.length === 0 ? (
            <p>Seja o primeiro a comentar neste projeto!</p>
          ) : (
            <CommentList>
              {comments.map((comment) => renderComment(comment, false))}
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
        isDestructive={true}
      />
    </>
  );
};

export default Post;
