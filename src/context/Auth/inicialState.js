import { localStorageService } from "../../services/localStorageService";

export const ESTADO_LIMPO = {
  // DADOS DE AUTENTICAÇÃO
  user: null,
  token: null,
  loading: true,

  // ESTADOS PARA AÇÃO DE LOGIN
  loadingAuth: false,
  errorAuth: null,

  // ESTADOS PARA O CADASTRO
  loadingRegister: false,
  errorRegister: null,
  cadastroSucesso: false,

  // FORMULARIO DE REGISTRO
  nome: "",
  sobrenome: "",
  usuario: "",
  bio: "",
  funcao: "",
  imagem: "",

  // UI DO MODAL
  loadingUpdate: false,
  errorUpdate: null,
};

const rascunhoSalvo = localStorageService.ler("rascunho_perfil");

export const authInicialState = rascunhoSalvo
  ? { ...ESTADO_LIMPO, ...rascunhoSalvo }
  : ESTADO_LIMPO;
