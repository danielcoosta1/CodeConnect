import { useState, useEffect } from "react";
import { fetchCommentsByPostId, createCommentRequest } from "../services/postService";
import { toastErro, toastSucesso } from "../utils/toast";

export const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);
  const [enviandoComment, setEnviandoComment] = useState(false);

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

  // Função de envio
  const handleComentar = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setEnviandoComment(true);
    try {
      const novoComentario = await createCommentRequest(postId, commentText);
      
      // UI Otimista
      setComments((prevComments) => [novoComentario, ...prevComments]);
      setCommentText("");
      toastSucesso("Comentário adicionado!");
    } catch (error) {
      console.error("Erro ao enviar comentário", error);
      toastErro("Não foi possível enviar o comentário.");
    } finally {
      setEnviandoComment(false);
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
  };
};