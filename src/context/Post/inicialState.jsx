import { localStorageService } from "../../services/localStorageService";

// 1. O Gabarito: Como o estado deve ser quando não há nada digitado
export const ESTADO_LIMPO = {
  title: "",
  content: "",
  allTags: [],
  tags: [],
  tagInput: "",
  image: null,
  imageFileName: "",
  allPosts: [],
  loading: false,
  error: null,
  success: false,
  loadingPosts: false,
  errorPosts: null,
};

// 2. Tenta ler o rascunho
const rascunhoSalvo = localStorageService.ler("rascunho_post");

// 3. O estado inicial do sistema:
// Se houver rascunho, mistura com o limpo. Se não, usa o limpo.
export const postInicialState = rascunhoSalvo
  ? { ...ESTADO_LIMPO, ...rascunhoSalvo }
  : ESTADO_LIMPO;
