import { ESTADO_LIMPO } from "./inicialState";

export const authReducer = (state, action) => {
  switch (action.type) {
    // GRUPO 1: Autenticação e Dados do Usuário

    // AÇÕES PARA O CADASTRO
    case "CADASTRO_START":
      return {
        ...state,
        loadingRegister: true,
        errorRegister: null,
      };

    case "CADASTRO_SUCESSO":
      return {
        ...state,
        user: action.payload,
        loadingRegister: false,
        errorRegister: null,
        cadastroSucesso: true,
      };

    case "CADASTRO_ERROR":
      return {
        ...state,
        loadingRegister: false,
        errorRegister: action.payload,
      };

    //AÇOES PARA O LOGIN

    case "LOGIN_START":
      return {
        ...state,
        loadingAuth: true,
        errorAuth: null, // Limpa erro anterior se houver
      };

    case "LOGIN_SUCESSO":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false, //loading global (F5)
        isAuthenticated: true,

        //DESLIGA O LOADING DO BOTÃO E LIMPA ERROS
        loadingAuth: false,
        errorAuth: null,
      };

    // Se o login falhar ---
    case "LOGIN_ERROR":
      return {
        ...state,
        loadingAuth: false,
        errorAuth: action.payload, // Recebe a mensagem de erro
      };

    case "LOGOUT":
      return {
        ...ESTADO_LIMPO,
        loading: false,
        isAuthenticated: false,
      };

    // AÇOES PARA A SESSAO

    case "CARREGAR_SESSAO":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        isAuthenticated: true,
      };

    case "SESSAO_NAO_ENCONTRADA":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };

    // GRUPO 2: Atualização do Perfil - FORMULÁRIO E UI
    // Quando abre o modal, copiamos os dados do user real para os inputs
    //AÇOES PARA EDITAR PERFIL
    case "INICIAR_EDICAO":
      if (!state.user) return state;
      return {
        ...state,
        nome: state.user.nome || "",
        sobrenome: state.user.sobrenome || "",
        usuario: state.user.usuario || "",
        funcao: state.user.funcao || "",
        bio: state.user.bio || "",
        imagem: state.user.imagem || null, // Começa com a imagem atual
        errorUpdate: null,
      };

    case "SET_DADO":
      return {
        ...state,
        [action.field]: action.payload,
      };

    // Caso específico para imagem (opcional, poderia usar SET_DADO também)
    case "SET_IMAGEM":
      return {
        ...state,
        imagem: action.payload,
      };

    // --- GRUPO 3: Ações de API (Update) ---

    case "UPDATE_START":
      return { ...state, loadingUpdate: true, errorUpdate: null };

    case "UPDATE_SUCCESS":
      return {
        ...state,
        loadingUpdate: false,
        errorUpdate: null,
        // Atualiza o USUÁRIO DA SESSÃO com os dados novos que vieram do back
        user: action.payload,
        // Atualiza também os inputs para refletir a realidade
        nome: action.payload.nome,
        sobrenome: action.payload.sobrenome,
        usuario: action.payload.usuario,
        funcao: action.payload.funcao,
        bio: action.payload.bio,
        imagem: action.payload.imagem,
      };

    case "UPDATE_ERROR":
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };

    default:
      return state;
  }
};
