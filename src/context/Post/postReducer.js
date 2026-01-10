import { postInicialState } from "./inicialState";

export const postReducer = (state, action) => {
  switch (action.type) {
    // --- GRUPO 1: Manipulação do Formulário ---

    // Caso genérico para atualizar campos de texto
    case "SET_DADO":
      return {
        ...state,
        [action.field]: action.payload, // Ex: field: 'title', payload: 'Meu Projeto'
      };

    // Adiciona uma tag ao array existente
    case "ADD_TAG":
      return {
        ...state,
        tags: [...state.tags, action.payload],
        tagInput: "",
      };

    // Remove uma tag baseada no índice dela no array
    case "REMOVE_TAG":
      return {
        ...state,
        tags: state.tags.filter((tag) => tag !== action.payload),
      };

    // Define a imagem e o nome do arquivo
    case "SET_IMAGE":
      return {
        ...state,
        image: action.payload.image,
        imageFileName: action.payload.fileName,
      };

    case "REMOVER_IMAGEM":
      return {
        ...state,
        image: null,
        imageFileName: "",
      };

    // --- GRUPO 2: Comunicação com a API ---

    // O usuário clicou em "Publicar"
    case "INICIAR_PUBLICACAO":
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };

    // A API respondeu com sucesso (200 OK)
    case "PUBLICACAO_SUCESSO":
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        // Opcional: Aqui você poderia limpar o form direto, ou deixar o componente decidir
      };

    // A API deu erro (400/500)
    case "PUBLICACAO_ERRO":
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload, // A mensagem de erro
      };

    // --- GRUPO 3: Limpeza ---

    // Zera tudo para o estado original (usado após publicar ou ao clicar em descartar)
    case "RESET_FORM":
      // Retorna o estado inicial limpo, sem herdar nada do anterior (...state)
      return postInicialState;

    default:
      return state;
  }
};
