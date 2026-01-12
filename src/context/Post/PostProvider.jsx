import { useEffect, useReducer } from "react";
import { PostContext } from "./PostContext";
import { postReducer } from "./postReducer";
import { initialState } from "./initialState";
import { toastErro, toastSucesso } from "../../utils/toast";
import { createPostRequest } from "./postService";
import { localStorageService } from "../../services/localStorageService";

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

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

  const atualizarDato = (field, value) => {
    dispatch({ type: "SET_DADO", field, payload: value });
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
    localStorageService.remover("rascunho_post");
    dispatch({ type: "LIMPAR_CAMPOS" });
  };

  // -------  AÇÕES DE INTEGRAÇÃO COM A API   --------

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

      await createPostRequest(postData);

      dispatch({ type: "PUBLICACAO_SUCESSO" });
      toastSucesso("Post publicado com sucesso!");

      setTimeout(() => limparFormulario(), 1500); // Limpa após 1.5s para ver o sucesso
    } catch (error) {
      dispatch({ type: "PUBLICACAO_ERRO", payload: error.message });
      toastErro("Erro ao publicar o post.");
    }
  };

  return (
    <PostContext.Provider
      value={{
        title: state.title,
        content: state.content,
        tags: state.tags,
        tagInput: state.tagInput,
        image: state.image,
        imageFileName: state.imageFileName,
        loading: state.loading,
        error: state.error,
        success: state.success,
        atualizarDato,
        adicionarTag,
        removerTag,
        definirImagem,
        removerImagem,
        limparFormulario,
        publicarPost,
      }}
    >
      {" "}
      {children}{" "}
    </PostContext.Provider>
  );
};
