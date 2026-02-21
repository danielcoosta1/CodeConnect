import { localStorageService } from "../../services/localStorageService";

// 1. O Gabarito: Como o estado deve ser quando não há nada digitado
export const ESTADO_LIMPO = {
  //Dados do formulário
  title: "",
  content: "",
  allTags: [],
  tags: [],
  tagInput: "",
  image: null,
  imageFileName: "",

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
};

// 2. Tenta ler o rascunho
const rascunhoSalvo = localStorageService.ler("rascunho_post");

// 3. O estado inicial do sistema:
// Se houver rascunho, mistura com o limpo. Se não, usa o limpo.
export const postInicialState = rascunhoSalvo
  ? { ...ESTADO_LIMPO, ...rascunhoSalvo }
  : ESTADO_LIMPO;
