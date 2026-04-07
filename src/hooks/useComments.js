import { useState, useEffect } from "react";
import {
  fetchCommentsByPostId,
  createCommentRequest,
  deleteCommentById,
  toggleLikeComment,
  toggleSolutionStatus,
} from "../services/postService";
import { toastErro, toastSucesso } from "../utils/toast";

export const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);
  const [enviandoComment, setEnviandoComment] = useState(false);

  const [loadingDelete, setLoadingDelete] = useState(false);

  // Busca os comentários assim que o postId estiver disponível (ou seja, quando a página do post carregar)
  useEffect(() => {
    if (!postId) return;

    const carregarComentarios = async () => {
      try {
        const data = await fetchCommentsByPostId(postId);
        setComments(data);
      } catch (error) {
        console.error("Erro ao carregar comentários:", error);
      } finally {
        setLoadingComments(false);
      }
    };

    carregarComentarios();
  }, [postId]);

  //  Recebe o texto do comentário e o parentId (se for resposta) para criar um novo comentário
  const handleComentar = async (e, parentId = null, textoSubmetido = "") => {
    e.preventDefault();
    if (!textoSubmetido.trim()) return;

    setEnviandoComment(true);
    try {
      // Passamos o texto dinâmico para a API
      const novoComentario = await createCommentRequest(
        postId,
        textoSubmetido,
        parentId,
      );

      setComments((prevComments) => {
        if (parentId) {
          return prevComments.map((comment) => {
            if (comment.id === parentId) {
              return {
                ...comment,
                replies: [...(comment.replies || []), novoComentario],
              };
            }
            return comment;
          });
        } else {
          return [novoComentario, ...prevComments];
        }
      });

      // Só limpa o input principal se for um comentário pai
      if (!parentId) {
        setCommentText("");
      }

      toastSucesso(
        parentId ? "Resposta adicionada!" : "Comentário adicionado!",
      );
    } catch (error) {
      console.error("Erro ao enviar comentário", error);
      toastErro("Não foi possível enviar o comentário.");
    } finally {
      setEnviandoComment(false);
    }
  };

  const handleDeletarComentario = async (commentId) => {
    if (loadingDelete) return;
    setLoadingDelete(true);
    try {
      await deleteCommentById(commentId);

      // UI Otimista: Filtra o deletado tanto da raiz quanto das respostas
      setComments((prevComments) =>
        prevComments
          .filter((comment) => comment.id !== commentId) // Remove se for raiz
          .map((comment) => ({
            // Se for resposta, mantém mas filtra a resposta deletada
            ...comment,
            replies: comment.replies
              ? comment.replies.filter((reply) => reply.id !== commentId)
              : [], // Remove se for filho
          })),
      );

      toastSucesso("Comentário excluído!");
    } catch (error) {
      console.error("Erro ao excluir comentário", error);
      toastErro("Não foi possível excluir o comentário.");
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleToggleLike = async (commentId) => {
    try {
      const updatedComment = await toggleLikeComment(commentId);

      // UI Otimista: Varre a lista procurando onde está o comentário curtido
      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, likeIds: updatedComment.likeIds };
          }
          if (comment.replies) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === commentId
                  ? { ...reply, likeIds: updatedComment.likeIds }
                  : reply,
              ),
            };
          }
          return comment;
        }),
      );
    } catch (error) {
      console.error("Erro ao curtir:", error);
      toastErro("Não foi possível registrar a curtida.");
    }
  };

  const handleToggleSolution = async (commentId) => {
    try {
      const updatedComment = await toggleSolutionStatus(commentId);

      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, isSolution: updatedComment.isSolution };
          }
          if (comment.replies) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === commentId
                  ? { ...reply, isSolution: updatedComment.isSolution }
                  : reply,
              ),
            };
          }
          return comment;
        }),
      );

      if (updatedComment.isSolution) {
        toastSucesso("Marcado como Solução!");
      }
    } catch (error) {
      console.error("Erro ao marcar solução:", error);
      toastErro("Não foi possível alterar a solução.");
    }
  };

  // O Hook "devolve" apenas o que a interface precisa usar
  return {
    comments,
    commentText,
    setCommentText,
    loadingComments,
    enviandoComment,
    handleComentar,
    handleDeletarComentario,
    handleToggleLike,
    handleToggleSolution,
  };
};
