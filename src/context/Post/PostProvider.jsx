import { useReducer } from "react";
import { PostContext } from "./PostContext";
import { postReducer } from "./postReducer";
import { initialState } from "./initialState";

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  const atualizarDato = (field, value) => {
    dispatch({ type: "SET_DADO", field, payload: value });
  };

  const adicionarTag = (novaTag) => {
    dispatch({ type: "ADD_TAG", payload: novaTag });
  };

  const removerTag = (tag) => {
    dispatch({ type: "REMOVE_TAG", payload: tag });
  };

  const removerImagem = () => {
    dispatch({ type: "REMOVER_IMAGEM" });
  };

  const limparCampos = () => {
    dispatch({ type: "LIMPAR_CAMPOS" });
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
        removerImagem,
        limparCampos,
      }}
    >
      {" "}
      {children}{" "}
    </PostContext.Provider>
  );
};
