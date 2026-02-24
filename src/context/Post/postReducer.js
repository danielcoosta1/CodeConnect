import { all } from "axios";
import { ESTADO_LIMPO } from "./inicialState";

export const postReducer = (state, action) => {
  switch (action.type) {
    // --- GRUPO 1: Manipulação do Formulário ---

    // Caso genérico para atualizar campos de texto
    case "SET_DADO":
      return {
        ...state,
        [action.field]: action.payload, // Ex: field: 'title', payload: 'Meu Projeto'
      };

    case "SET_TAG_INPUT":
      return {
        ...state,
        tagInput: action.payload,
      };

    case "SET_ALL_TAGS":
      return {
        ...state,
        allTags: action.payload, // O payload aqui será o array vindo do JSON
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
        tags: state.tags.filter((_, index) => index !== action.payload),
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

    case "ADD_POST":
      return {
        ...state,
        allPosts: [action.payload, ...state.allPosts],
      };

    case "CARREGAR_POSTS_INICIO":
      return {
        ...state,
        loadingPosts: true,
        errorPosts: null,
      };

    case "CARREGAR_POSTS_SUCESSO":
      return {
        ...state,
        loadingPosts: false,
        allPosts: action.payload,
      };

    case "CARREGAR_POSTS_ERRO":
      return {
        ...state,
        loadingPosts: false,
        errorPosts: action.payload,
      };

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

    // GRUPO 3: Meus Posts

    case "CARREGAR_MEUS_POSTS_INICIO":
      return {
        ...state,
        loadingMyPosts: true,
        errorMyPosts: null,
      };

    case "CARREGAR_MEUS_POSTS_SUCESSO":
      return {
        ...state,

        myPosts: action.payload,
        loadingMyPosts: false,
      };

    case "CARREGAR_MEUS_POSTS_ERRO":
      return {
        ...state,
        loadingMyPosts: false,
        errorMyPosts: action.payload,
      };

    // GRUPO 4: Perfil do Usuário

    case "CARREGAR_PERFIL_INICIO":
      return {
        ...state,
        loadingProfile: true,
        errorProfile: null,
        userProfile: null, // Limpa o anterior para não mostrar dados velhos
        userPosts: [],
      };

    case "CARREGAR_PERFIL_SUCESSO":
      return {
        ...state,
        loadingProfile: false,
        userProfile: action.payload.user, // Dados do usuário
        userPosts: action.payload.posts, // Posts dele
      };

    case "CARREGAR_PERFIL_ERRO":
      return {
        ...state,
        loadingProfile: false,
        errorProfile: action.payload,
      };

    // --- GRUPO 5: Post  ---

    case "CARREGAR_POST_INICIO":
      return {
        ...state,
        loadingPostDetails: true,
        errorPostDetails: null,
        postDetails: null, // Limpa o post anterior
      };

    case "CARREGAR_POST_SUCESSO":
      return {
        ...state,
        loadingPostDetails: false,
        postDetails: action.payload.post, // Dados do post
      };

    case "CARREGAR_POST_ERRO":
      return {
        ...state,
        loadingPostDetails: false,
        errorPostDetails: action.payload,
      };

    // --- GRUPO 6: Exclusão de Post ---

    case "DELETAR_POST_INICIO":
      return {
        ...state,
        loadingDeletePost: true,
        errorDeletePost: null,
      };

    case "DELETAR_POST_SUCESSO":
      return {
        ...state,
        loadingDeletePost: false,
        errorDeletePost: null,

        // Remove o post deletado de todos os lugares onde ele aparece
        myPosts: state.myPosts.filter((post) => post.id !== action.payload),
        userPosts: state.userPosts.filter((post) => post.id !== action.payload),
        allPosts: state.allPosts.filter((post) => post.id !== action.payload),
        postDetails:
          state.postDetails?.id === action.payload ? null : state.postDetails,
      };

    case "DELETAR_POST_ERRO":
      return {
        ...state,
        loadingDeletePost: false,
        errorDeletePost: action.payload,
      };

    // --- GRUPO 7: Edição de Post ---

    // Essa ação pega os dados do post e joga para dentro dos inputs do formulário!
    case "PREENCHER_FORMULARIO_EDICAO":
      return {
        ...state,
        title: action.payload.title || "",
        content: action.payload.content || "",
        tags: action.payload.tags || [],
        image: action.payload.image || null,
        // Limpa qualquer erro antigo ao entrar no modo edição
        errorUpdatePost: null,
        successUpdatePost: false,
      };

    case "ATUALIZAR_POST_INICIO":
      return {
        ...state,
        loadingEditPost: true,
        errorEditPost: null,
        successUpdatePost: false,
      };

    case "ATUALIZAR_POST_SUCESSO":
      return {
        ...state,
        loadingEditPost: false,
        errorEditPost: null,
        successUpdatePost: true,
        // Opcional: Aqui você poderia atualizar o postDetails e os arrays de posts para refletir a edição
        allPosts: state.allPosts.map((post) =>
          post.id === action.payload.id ? action.payload : post,
        ),
        myPosts: state.myPosts.map((post) =>
          post.id === action.payload.id ? action.payload : post,
        ),
        userPosts: state.userPosts.map((post) =>
          post.id === action.payload.id ? action.payload : post,
        ),
        postDetails: action.payload, // Atualiza os detalhes do post editado
      };

    case "ATUALIZAR_POST_ERRO":
      return {
        ...state,
        loadingEditPost: false,
        errorEditPost: action.payload,
        successUpdatePost: false,
      };

    // --- GRUPO 8: Limpeza ---

    // Zera tudo para o estado original (usado após publicar ou ao clicar em descartar)
    case "RESET_FORM":
      // Retorna o estado inicial limpo, sem herdar nada do anterior (...state)
      return ESTADO_LIMPO;

    default:
      return state;
  }
};
