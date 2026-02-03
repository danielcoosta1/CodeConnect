import { localStorageService } from "../../services/localStorageService";

export const ESTADO_LIMPO = {
  // DADOS DE AUTENTICAÇÃO
  user: null,
  token: null,
  loading: true,

  // FORMULARIO DE REGISTRO
  nome: "",
  sobrenome: "",
  usuario: "",
  bio: "",
  funcao: "",
  imagemDePerfil: "",

  // UI DO MODAL
  loadingUpdate: false,
  errorUpdate: null,
};

const rascunhoSalvo = localStorageService.ler("rascunho_perfil");

export const authInicialState = rascunhoSalvo
  ? { ...ESTADO_LIMPO, ...rascunhoSalvo }
  : ESTADO_LIMPO;
