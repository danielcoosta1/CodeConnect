import { useEffect, useReducer } from "react";
import { PostContext } from "./PostContext";
import { postReducer } from "./postReducer";

import { toastErro, toastSucesso } from "../../utils/toast";
import { createPostRequest, fetchMyPosts, fetchPosts } from "../../services/postService";
import { localStorageService } from "../../services/localStorageService";
import { postInicialState } from "./inicialState";

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, postInicialState);

  //ALIMENTAR ALLTAGS

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

  // -------  AÇÕES DE INTEGRAÇÃO COM A API   --------

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

  return (
    <PostContext.Provider
      value={{
        title: state.title,
        content: state.content,
        allTags: state.allTags,
        tags: state.tags,
        tagInput: state.tagInput,
        image: state.image,
        imageFileName: state.imageFileName,
        allPosts: state.allPosts,
        loading: state.loading,
        error: state.error,
        success: state.success,
        loadingPosts: state.loadingPosts,
        errorPosts: state.errorPosts,
        myPosts: state.myPosts,
        loadingMyPosts: state.loadingMyPosts,
        errorMyPosts: state.errorMyPosts,

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
      }}
    >
      {" "}
      {children}{" "}
    </PostContext.Provider>
  );
};
