import { useEffect, useReducer } from "react";
import { PostContext } from "./PostContext";
import { postReducer } from "./postReducer";

import { toastErro, toastSucesso } from "../../utils/toast";
import {
  createPostRequest,
  fetchMyPosts,
  fetchPostById,
  fetchPosts,
  getPostsByUserId,
  deletePostById,
} from "../../services/postService";
import { localStorageService } from "../../services/localStorageService";
import { postInicialState } from "./inicialState";
import { getUserById } from "../../services/userService";

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, postInicialState);

  // --- EFEITO: Carregar sugestões de tags (Mock) ---

  useEffect(() => {
    const carregarSugestoes = async () => {
      try {
        const response = await fetch("/mocks/tags.json");
        const data = await response.json();

        // Disparamos a ação para o Reducer guardar na "gaveta" global
        dispatch({ type: "SET_ALL_TAGS", payload: data });
      } catch (error) {
        console.error("Erro ao carregar sugestões de tags:", error);
      }
    };

    carregarSugestoes();
  }, []);

  // --- EFEITO: Salvar Rascunho Automaticamente ---

  useEffect(() => {
    // Só salvamos os DADOS, não o status (loading/erro)
    const dadosParaSalvar = {
      title: state.title,
      content: state.content,
      tags: state.tags,
      tagInput: state.tagInput,
      image: state.image,
      imageFileName: state.imageFileName,
    };

    // Se tiver pelo menos um título ou conteúdo, salva. Senão, não suja o storage.
    if (state.title || state.content || state.image) {
      localStorageService.salvar("rascunho_post", dadosParaSalvar);
    }
  }, [state.title, state.content, state.tags, state.tagInput, state.image]);
  // O array acima diz: "Rode esse efeito sempre que um desses mudar"

  //  -------  AÇÕES DE MANIPULAÇÃO DDO ESTADO LOCAL   --------

  const atualizarDado = (field, value) => {
    dispatch({ type: "SET_DADO", field, payload: value });
  };

  const atualizarTagInput = (valor) => {
    dispatch({ type: "SET_TAG_INPUT", payload: valor });
  };

  const adicionarTag = (novaTag) => {
    dispatch({ type: "ADD_TAG", payload: novaTag });
  };

  const removerTag = (tag) => {
    dispatch({ type: "REMOVE_TAG", payload: tag });
  };

  const definirImagem = (image, fileName) => {
    dispatch({ type: "SET_IMAGE", payload: { image, fileName } });
  };

  const removerImagem = () => {
    dispatch({ type: "REMOVER_IMAGEM" });
  };

  const limparFormulario = () => {
    // 1. Limpamos o "banco físico" (LocalStorage)
    localStorageService.remover("rascunho_post");

    // 2. Limpamos a "memória atual" (State do Reducer)
    // Como o case RESET_FORM agora retorna o ESTADO_LIMPO,
    // a tela vai zerar na hora, independente do que o postInicialState guardava.
    dispatch({ type: "RESET_FORM" });
  };

  // -------  AÇÕES DE MANIPULAÇÃO DE POSTS (CHAMADAS AO BACKEND)   --------

  const carregarPostsDoBanco = async () => {
    dispatch({ type: "CARREGAR_POSTS_INICIO" });

    try {
      const posts = await fetchPosts(); // Sua função do service que faz axios.get
      dispatch({ type: "CARREGAR_POSTS_SUCESSO", payload: posts });
    } catch (error) {
      dispatch({ type: "CARREGAR_POSTS_ERRO", payload: error.message });
      toastErro("Não foi possível carregar o feed.");
    }
  };

  const publicarPost = async () => {
    // VALIDAÇÃO BÁSICA ANTES DE ENVIAR
    if (state.title.trim().length < 3) {
      toastErro("O título precisa ter pelo menos 3 caracteres.");
      return;
    }

    if (state.content.trim().length < 10) {
      toastErro("O conteúdo precisa ter pelo menos 10 caracteres.");
      return;
    }

    dispatch({ type: "INICIAR_PUBLICACAO" });
    try {
      const postData = {
        title: state.title,
        content: state.content,
        image: state.image,
        imageFileName: state.imageFileName,
        tags: state.tags,
      };

      const postCriado = await createPostRequest(postData); // Sua função do service que faz axios.post

      dispatch({ type: "PUBLICACAO_SUCESSO" });
      toastSucesso("Post publicado com sucesso!");

      dispatch({ type: "ADD_POST", payload: postCriado }); // Adiciona o novo post ao estado global

      setTimeout(() => limparFormulario(), 1500); // Limpa após 1.5s para ver o sucesso
    } catch (error) {
      dispatch({ type: "PUBLICACAO_ERRO", payload: error.message });
      toastErro("Erro ao publicar o post.");
    }
  };

  const carregarMeusPostsDoBanco = async () => {
    dispatch({ type: "CARREGAR_MEUS_POSTS_INICIO" });
    try {
      const myPosts = await fetchMyPosts();
      dispatch({ type: "CARREGAR_MEUS_POSTS_SUCESSO", payload: myPosts });
    } catch (error) {
      dispatch({ type: "CARREGAR_MEUS_POSTS_ERRO", payload: error.message });
      toastErro("Não foi possível carregar seus posts.");
    }
  };

  const carregarPerfilPublico = async (userId) => {
    dispatch({ type: "CARREGAR_PERFIL_INICIO" });

    try {
      const [userResponse, postsResponse] = await Promise.all([
        getUserById(userId),
        getPostsByUserId(userId),
      ]);

      dispatch({
        type: "CARREGAR_PERFIL_SUCESSO",
        payload: { user: userResponse, posts: postsResponse },
      });
    } catch (error) {
      dispatch({
        type: "CARREGAR_PERFIL_ERRO",
        payload: "Não foi possível carregar o perfil do usuário.",
      });
      console.error(error);
    }
  };

  const carregarPostPorId = async (postId) => {
    dispatch({ type: "CARREGAR_POST_INICIO" });

    try {
      const postResponse = await fetchPostById(postId);

      dispatch({
        type: "CARREGAR_POST_SUCESSO",
        payload: { post: postResponse },
      });
    } catch (error) {
      dispatch({
        type: "CARREGAR_POST_ERRO",
        payload: "Não foi possível carregar os detalhes do post.",
      });
      console.error(error);
    }
  };

  const deletarPostPorId = async (postId) => {
    dispatch({ type: "DELETAR_POST_INICIO" });

    try {
      // Chama a API, mas não precisamos guardar o 'response'(é um objeto JSON com uma mensagem) já que só queremos o ID
      await deletePostById(postId);

      dispatch({
        type: "DELETAR_POST_SUCESSO",
        payload: postId, //  Mandamos o ID exato para o filtro funcionar
      });
      
      toastSucesso("Projeto excluído com sucesso!");
      return true; // Avisa a página que deu tudo certo!

    } catch (error) {
      const msgErro = error.response?.data?.error || "Erro ao excluir o projeto.";
      dispatch({ type: "DELETAR_POST_ERRO", payload: msgErro });
      toastErro(msgErro);
      console.error(error);
      return false; // Avisa a página que deu erro
    }
  };
  return (
    <PostContext.Provider
      value={{
        //  Estado do formulário
        title: state.title,
        content: state.content,
        allTags: state.allTags,
        tags: state.tags,
        tagInput: state.tagInput,
        image: state.image,
        imageFileName: state.imageFileName,

        //Estado de posts
        allPosts: state.allPosts,
        loading: state.loading,
        error: state.error,
        success: state.success,
        loadingPosts: state.loadingPosts,
        errorPosts: state.errorPosts,

        // Estado de meus posts
        myPosts: state.myPosts,
        loadingMyPosts: state.loadingMyPosts,
        errorMyPosts: state.errorMyPosts,

        // Estado de perfil do usuário
        userProfile: state.userProfile,
        userPosts: state.userPosts,
        loadingProfile: state.loadingProfile,
        errorProfile: state.errorProfile,

        // Estado de post individual
        postDetails: state.postDetails,
        loadingPostDetails: state.loadingPostDetails,
        errorPostDetails: state.errorPostDetails,

        // Estado de exclusão de post
        loadingDeletePost: state.loadingDeletePost,
        errorDeletePost: state.errorDeletePost,

        //AÇÕES / FUNÇÕES
        carregarPerfilPublico,
        atualizarDado,
        atualizarTagInput,
        adicionarTag,
        removerTag,
        definirImagem,
        removerImagem,
        limparFormulario,
        publicarPost,
        carregarPostsDoBanco,
        carregarMeusPostsDoBanco,
        carregarPostPorId,
        deletarPostPorId,
      }}
    >
      {" "}
      {children}{" "}
    </PostContext.Provider>
  );
};
