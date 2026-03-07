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
  updatePostById,
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
    // Só salva no localStorage se o usuário tiver digitado pelo menos alguma coisa.
    // Isso evita que ele salve um objeto "em branco" logo após você ter descartado ou publicado o projeto.
    if (
      state.formData.title ||
      state.formData.content ||
      state.formData.codeContent
    ) {
      localStorageService.salvar("rascunho_post", state.formData);
    }
  }, [state.formData]);
  // O array acima diz: "Rode esse efeito sempre que o formData mudar"

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

  const iniciarNovoPost = () => {
    // 1. Vai no banco do navegador (LocalStorage) e vê se tem rascunho
    const rascunho = localStorageService.ler("rascunho_post");

    if (rascunho) {
      // Se tem rascunho, nós reaproveitamos a ação de edição para jogar o rascunho de volta na tela!
      dispatch({ type: "PREENCHER_FORMULARIO_EDICAO", payload: rascunho });
    } else {
      // Se não tem rascunho nenhum, nós só limpamos a memória (sem apagar o LocalStorage na força)
      dispatch({ type: "RESET_FORM" });
    }
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

  const publicarPost = async (postData) => {
    dispatch({ type: "INICIAR_PUBLICACAO" });
    try {
      const postCriado = await createPostRequest(postData); // Sua função do service que faz axios.post

      dispatch({ type: "PUBLICACAO_SUCESSO" });
      toastSucesso("Post publicado com sucesso!");

      dispatch({ type: "ADD_POST", payload: postCriado }); // Adiciona o novo post ao estado global

      setTimeout(() => limparFormulario(), 1500); // Limpa após 1.5s para ver o sucesso
    } catch (error) {
      const msgErro = error.response?.data?.error || "Erro ao publicar o post.";
      dispatch({ type: "PUBLICACAO_ERRO", payload: msgErro });
      toastErro(msgErro);
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

  // --- FUNÇÃO PARA SINCRONIZAR SEGUIDORES NA TELA ---
  const atualizarSeguidoresPerfilPublico = (isFollowing, meuId) => {
    dispatch({
      type: "ATUALIZAR_SEGUIDORES_PERFIL",
      payload: { isFollowing, meuId },
    });
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
      const msgErro =
        error.response?.data?.error || "Erro ao excluir o projeto.";
      dispatch({ type: "DELETAR_POST_ERRO", payload: msgErro });
      toastErro(msgErro);
      console.error(error);
      return false; // Avisa a página que deu erro
    }
  };

  // Ação para preparar os dados para edição (preenche o formulário com os dados do post)

  const prepararEdicao = (post) => {
    dispatch({ type: "PREENCHER_FORMULARIO_EDICAO", payload: post });
  };

  // Função 2: Dispara a atualização real para o banco
  const atualizarPost = async (postId, postData) => {
    dispatch({ type: "ATUALIZAR_POST_INICIO" });

    try {
      const response = await updatePostById(postId, postData);

      dispatch({
        type: "ATUALIZAR_POST_SUCESSO",
        payload: response.post, // O post atualizado que volta da API
      });

      toastSucesso("Projeto atualizado com sucesso!");
      return true;
    } catch (error) {
      const msgErro =
        error.response?.data?.error || "Erro ao atualizar o projeto.";
      dispatch({ type: "ATUALIZAR_POST_ERRO", payload: msgErro });
      toastErro(msgErro);
      console.error(error);
      return false;
    }
  };

  return (
    <PostContext.Provider
      value={{
        //  Estado do formulário
        formData: state.formData,

        //Estado de posts
        allPosts: state.allPosts,
        allTags: state.allTags,
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

        // Estado de edição de post
        loadingEditPost: state.loadingEditPost,
        errorEditPost: state.errorEditPost,
        successUpdatePost: state.successUpdatePost,

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
        prepararEdicao,
        atualizarPost,
        atualizarSeguidoresPerfilPublico,
        iniciarNovoPost,
      }}
    >
      {" "}
      {children}{" "}
    </PostContext.Provider>
  );
};
