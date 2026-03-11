import { localStorageService } from "../../services/localStorageService";

// 1. O Gabarito: Como o estado deve ser quando não há nada digitado
export const ESTADO_LIMPO = {
  //Dados do formulário
  formData: {
    tags: [], // Lista de todas as tags disponíveis (vinda do JSON)
    title: "",
    content: "",
    codeContent: "",
    tagInput: "",
    image: null,
    imageFileName: "",
    projectUrl: "",
    repoUrl: "",
  }, 
  
  allTags: [], // Lista de todas as tags disponíveis (vinda do JSON)
  //Dados de posts
  allPosts: [],

  loadingPosts: true,
  errorPosts: null,
  loading: false,
  error: null,
  success: false,

  //Dados de meus posts
  myPosts: [],
  loadingMyPosts: true,
  errorMyPosts: null,

  //Dados de perfil público
  userProfile: null,
  userPosts: [],
  loadingProfile: true,
  errorProfile: null,

  //Dados de post individual
  postDetails: null,
  loadingPostDetails: true,
  errorPostDetails: null,

  //Dados de exclusão de post
  loadingDeletePost: false,
  errorDeletePost: null,

  //Dados para edição de post
  loadingEditPost: false,
  errorEditPost: null,
  sucessUpdatePost: false,
};

// 2. Tenta ler o rascunho
const rascunhoSalvo = localStorageService.ler("rascunho_post");

// 3. O estado inicial do sistema:
// Se houver rascunho, mistura com o limpo. Se não, usa o limpo.
export const postInicialState = rascunhoSalvo
  ? {
      ...ESTADO_LIMPO,
      formData: { ...ESTADO_LIMPO.formData, ...rascunhoSalvo },
    }
  : ESTADO_LIMPO;
