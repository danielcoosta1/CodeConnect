import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ProfileAvatar from "../../components/ProfileAvatar";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";
import { FaArrowLeft, FaShareNodes, FaCodeBranch } from "react-icons/fa6";
import defaultImg from "../Publicar/assets/exemplo.png";
import {
  FaGithub,
  FaTrash,
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
  ProjectLink,
  ProjectMetaCard,
  ProjectLinksContainer,
  GithubBadgesContainer,
  GithubBadge,
  LanguageDot,
  SocialEngagementBar,
  SocialPill,
  QuestionBadge, // ✨ O Badge importado corretamente aqui
} from "./style";

import { usePost } from "../../hooks/usePost";
import { useAuth } from "../../hooks/useAuth";
import ModalConfirmacao from "../../components/ModalConfirmacao";
import { useComments } from "../../hooks/useComments";
import { toastErro, toastSucesso } from "../../utils/toast";

import {
  buscarDadosDoRepo,
  extrairDadosDoLink,
} from "../../services/githubService";

// Registrando o plugin ANTES do componente rodar
gsap.registerPlugin(ScrollTrigger);

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const [githubMetrics, setGithubMetrics] = useState(null);

  const headerRef = useRef(null);

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

  useEffect(() => {
    const fetchGithubMetrics = async () => {
      if (postDetails?.repoUrl && postDetails.repoUrl.includes("github.com")) {
        try {
          const { owner, repo } = extrairDadosDoLink(postDetails.repoUrl);
          const repoData = await buscarDadosDoRepo(owner, repo);

          if (repoData) {
            setGithubMetrics({
              stars: repoData.stargazers_count || 0,
              forks: repoData.forks_count || 0,
              language: repoData.language,
            });
          }
        } catch (error) {
          console.error("Falha ao buscar métricas do repositório:", error);
        }
      }
    };

    fetchGithubMetrics();
  }, [postDetails?.repoUrl]);

  useGSAP(
    () => {
      if (!headerRef.current || loadingPostDetails) return;

      gsap.to(".anim-hero", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      const scrollElements = gsap.utils.toArray(".anim-scroll");

      scrollElements.forEach((el) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    },
    { scope: headerRef, dependencies: [githubMetrics, postDetails] },
  );

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
    
    const isQuestion = postDetails?.type === "QUESTION";
    const tipoPost = isQuestion ? "Dúvida" : "Projeto";
    const sufixoDeGenero = isQuestion ? "a" : "o"; // publicadA / publicadO

    const sucesso = await deletarPostPorId(id);
    if (sucesso) {
      toastSucesso(`${tipoPost} excluíd${sufixoDeGenero} com sucesso!`);
      navigate("/feed");
    }
  };

  const submitReply = async (e, parentId) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    await handleComentar(e, parentId, replyText);
    setReplyText("");
    setReplyingTo(null);
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

  //  O DETETIVE QUE DESCOBRE SE É DÚVIDA OU PROJETO
  const isQuestion = postDetails.type === "QUESTION";

  const handleShare = async () => {
    const link = window.location.href;
    compartilharPost(id);
    try {
      if (navigator.share) {
        await navigator.share({
          title: "CodeConnect",
          text: `Dá uma olhada nisso no CodeConnect!`,
          url: link,
        });
      } else {
        await navigator.clipboard.writeText(link);
        toastSucesso("Link copiado para a área de transferência!");
      }
    } catch (error) {
      console.log("Compartilhamento cancelado pelo usuário.", error);
    }
  };

  const renderComment = (comment, isReply = false) => {
    const canDeleteComment = isAuthorPost || comment.authorId === user?.id;
    const hasLiked = comment.likeIds?.includes(user?.id);

    return (
      <CommentItem
        key={comment.id}
        $isSolution={comment.isSolution}
        className="anim-scroll"
        style={{ opacity: 0, transform: "translateY(30px)" }}
      >
        <ProfileAvatar
          src={comment.author?.imagem}
          size={isReply ? 35 : 45}
          hasBorder={false}
        />

        <CommentContentContainer>
          <CommentsContent>
            <CommentHeaderInfo to={`/perfil/${comment.author?.id}`}>
              <h4>
                {comment.author?.nome} {comment.author?.sobrenome}
              </h4>
              <span>@{comment.author?.usuario}</span>
              {comment.isSolution && <SolutionBadge>🌟 Solução</SolutionBadge>}
            </CommentHeaderInfo>
            <p>{comment.text}</p>
          </CommentsContent>

          <AuthorActionsComment>
            <ActionButton
              onClick={() => handleToggleLike(comment.id)}
              $active={hasLiked}
              $activeColor="#ff5f56"
              $hoverColor="#ff5f56"
            >
              {hasLiked ? <FaHeart /> : <FaRegHeart />}{" "}
              {comment.likeIds?.length || 0}
            </ActionButton>

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

            {/* O Dono do Post pode marcar soluções! Excelente para as Dúvidas */}
            {isAuthorPost && !isReply && (
              <ActionButton
                onClick={() => handleToggleSolution(comment.id)}
                $active={comment.isSolution}
                $activeColor="#d4af37"
                $hoverColor="#d4af37"
              >
                {comment.isSolution ? <FaStar /> : <FaRegStar />}
              </ActionButton>
            )}

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
                  >
                    Não
                  </button>
                </div>
              ) : (
                <ActionButton
                  onClick={() => setCommentToDelete(comment.id)}
                  $hoverColor="#ff5f56"
                >
                  <FaTrash />
                </ActionButton>
              ))}
          </AuthorActionsComment>

          {replyingTo === comment.id && (
            <div style={{ marginTop: "1.6rem" }}>
              <InputComment onSubmit={(e) => submitReply(e, comment.id)}>
                <input
                  type="text"
                  placeholder="Escreva sua resposta..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
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
      <PostContainer ref={headerRef}>
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

          {/*  ETIQUETA EXCLUSIVA PARA DÚVIDAS  */}
          {isQuestion && (
            <QuestionBadge
              className="anim-hero"
              style={{ opacity: 0, transform: "translateY(30px)" }}
            >
              💡 Dúvida da Comunidade
            </QuestionBadge>
          )}

          <PostTitle
            className="anim-hero"
            style={{ opacity: 0, transform: "translateY(30px)" }}
          >
            {postDetails.title}
          </PostTitle>

          {/* PAINEL DE METADADOS SÓ APARECE PARA PROJETOS */}
          {!isQuestion && (
            <ProjectMetaCard
              className="anim-hero"
              style={{ opacity: 0, transform: "translateY(30px)" }}
            >
              {githubMetrics ? (
                <GithubBadgesContainer>
                  {githubMetrics.language && (
                    <GithubBadge>
                      <LanguageDot /> {githubMetrics.language}
                    </GithubBadge>
                  )}
                  <GithubBadge>
                    <FaStar style={{ color: "#d4af37" }} />{" "}
                    {githubMetrics.stars}
                  </GithubBadge>
                  <GithubBadge>
                    <FaCodeBranch style={{ color: "#58a6ff" }} />{" "}
                    {githubMetrics.forks}
                  </GithubBadge>
                </GithubBadgesContainer>
              ) : (
                <div style={{ color: "#818388", fontSize: "1.4rem" }}>
                  Detalhes do Projeto
                </div>
              )}

              <ProjectLinksContainer>
                {postDetails.projectUrl ? (
                  <ProjectLink
                    href={postDetails.projectUrl}
                    target="_blank"
                    $primary={true}
                  >
                    <FaExternalLinkAlt /> <span>Deploy</span>
                  </ProjectLink>
                ) : (
                  <ProjectLink as="span" $desabilitado>
                    <FaExternalLinkAlt /> <span>Offline</span>
                  </ProjectLink>
                )}

                {postDetails.repoUrl ? (
                  <ProjectLink href={postDetails.repoUrl} target="_blank">
                    <FaGithub /> <span>Código</span>
                  </ProjectLink>
                ) : (
                  <ProjectLink as="span" $desabilitado>
                    <FaGithub /> <span>Privado</span>
                  </ProjectLink>
                )}
              </ProjectLinksContainer>
            </ProjectMetaCard>
          )}

          {/* IMAGEM INTELIGENTE: Banner se Projeto, Anexo se Dúvida */}
          {(!isQuestion || postDetails.image) && (
            <CoverImage
              $isQuestion={isQuestion}
              className="anim-hero"
              style={{ opacity: 0, transform: "translateY(30px)" }}
            >
              <img
                src={
                  postDetails.image
                    ? `data:image/png;base64,${postDetails.image}`
                    : defaultImg
                }
                alt={isQuestion ? "Print do erro anexado" : "Capa do projeto"}
              />
            </CoverImage>
          )}

          <PostContent
            className="anim-scroll"
            style={{ opacity: 0, transform: "translateY(40px)" }}
          >
            <p>{postDetails.content}</p>
          </PostContent>

          {postDetails.tags && postDetails.tags.length > 0 && (
            <TagList
              className="anim-scroll"
              style={{ opacity: 0, transform: "translateY(40px)" }}
            >
              {postDetails.tags.map((tag, index) => (
                <TagItem key={index}>{tag}</TagItem>
              ))}
            </TagList>
          )}

          <SocialEngagementBar
            className="anim-scroll"
            style={{ opacity: 0, transform: "translateY(40px)" }}
          >
            <SocialPill
              $variant="like"
              $hasLiked={hasLikedPost}
              onClick={() =>
                user ? curtirPost(id) : toastErro("Logue para curtir!")
              }
            >
              {hasLikedPost ? <FaHeart /> : <FaRegHeart />}
              <span>{postDetails.likeIds?.length || 0}</span>
            </SocialPill>

            <SocialPill $variant="share" onClick={handleShare}>
              <FaShareNodes />
              <span>{postDetails.shares || 0}</span>
            </SocialPill>

            <SocialPill
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                })
              }
            >
              <FaRegComment />
              <span>{comments.length}</span>
            </SocialPill>
          </SocialEngagementBar>

          <AuthorContainer
            className="anim-scroll"
            style={{
              opacity: 0,
              transform: "translateY(40px)",
              borderTop: "none",
              paddingTop: 0,
              marginTop: 0,
            }}
          >
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
          <CodeContainer
            className="anim-scroll"
            style={{ opacity: 0, transform: "translateY(40px)" }}
          >
            <ReactMarkdown>{postDetails.codeContent}</ReactMarkdown>
          </CodeContainer>
        )}

        <CommentsContainer
          className="anim-scroll"
          style={{ opacity: 0, transform: "translateY(40px)" }}
        >
          <h2>Comentários ({comments.length})</h2>

          {user ? (
            <InputComment
              onSubmit={(e) => handleComentar(e, null, commentText)}
            >
              <input
                type="text"
                placeholder={
                  isQuestion
                    ? "Contribua com uma solução..."
                    : "Adicione um comentário construtivo..."
                }
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={enviandoComment || loadingPostDetails}
              />
              <button
                type="submit"
                disabled={enviandoComment || !commentText.trim()}
              >
                Enviar
              </button>
            </InputComment>
          ) : (
            <p>Faça login para participar da discussão.</p>
          )}

          {loadingComments ? (
            <p>Carregando comentários...</p>
          ) : comments.length === 0 ? (
            <p>Seja o primeiro a interagir!</p>
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
        titulo="Excluir Publicação"
        mensagem="Tem certeza de que deseja excluir?"
        textoConfirmar="Sim, Excluir"
        isDestructive={true}
      />
    </>
  );
};

export default Post;
