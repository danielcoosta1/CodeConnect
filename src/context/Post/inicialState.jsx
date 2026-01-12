import { localStorageService } from "../../services/localStorageService";

const rascunhoSalvo = localStorageService.ler("rascunho_post");

export const postInicialState = rascunhoSalvo
  ? {
      ...rascunhoSalvo,
      loading: false,
      error: null,
      success: false,
    }
  : {
      title: "",
      content: "",
      tags: [],
      tagInput: "",
      image: null,
      imageFileName: "",
      loading: false,
      error: null,
      success: false, //Flag que irá ajudar a limpeza do formulário após publicação bem sucedida
    };
