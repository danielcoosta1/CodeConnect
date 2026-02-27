import { useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import api from "../../services/api";
import { localStorageService } from "../../services/localStorageService";
import { useNavigate } from "react-router-dom";

import { loginRequest, registerRequest } from "../../services/authService";
import {
  getUserProfile,
  toggleFollowRequest,
  updateProfileRequest,
} from "../../services/userService";
import { authReducer } from "./authReducer";
import { authInicialState } from "./inicialState";
import { toastErro, toastSucesso } from "../../utils/toast";
import { toast } from "react-toastify";

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInicialState);
  const navigation = useNavigate();

  //EFEITO 1:
  //Restaura o estado de autenticação ao carregar o aplicativo
  useEffect(() => {
    const carregarSessao = async () => {
      const storedUser = localStorageService.ler("user");
      const storedToken = localStorageService.ler("token");

      if (storedToken && storedUser) {
        api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

        dispatch({
          type: "CARREGAR_SESSAO",
          payload: { user: storedUser, token: storedToken },
        });

        // 2.  Re - hidratação dos dados completos do usuário
        try {
          const dadosCompletos = await getUserProfile();
          dispatch({ type: "UPDATE_SUCCESS", payload: dadosCompletos });
        } catch (error) {
          console.error("Token expirado ou erro de rede:", error);
        }
      } else {
        // Avisa que terminou de carregar e não tem ninguém logado
        dispatch({ type: "SESSAO_NAO_ENCONTRADA" });
      }
    };

    carregarSessao();
  }, []);

  //EFEITO 2 - RASCUNHO

  useEffect(() => {
    // Monitora as mudanças nos inputs (state.nome, state.bio, etc...)
    const rascunho = {
      nome: state.nome,
      sobrenome: state.sobrenome,
      usuario: state.usuario,
      funcao: state.funcao,
      bio: state.bio,
    };

    // Salva no localStorage para não perder se der F5 com modal aberto
    localStorageService.salvar("rascunho_perfil", rascunho);
  }, [state.nome, state.sobrenome, state.usuario, state.funcao, state.bio]);

  // FUNÇÕES DE SESSÃO

  const cadastro = async (nome, email, senha) => {
    dispatch({ type: "CADASTRO_START" });

    try {
      const response = await registerRequest(nome, email, senha);
      const { user: userData } = response;

      dispatch({ type: "CADASTRO_SUCESSO", payload: userData });

      return true;
    } catch (error) {
      console.error("ERRO CADASTRO", error);
      const msg =
        error.response.data.error ||
        "Error ao fazer o cadastro, tente novamente.";

      dispatch({ type: "CADASTRO_ERROR", payload: msg });
      return false;
    }
  };
  const login = async (email, senha) => {
    dispatch({ type: "LOGIN_START" }); // 1. Avisa o Reducer que começou (loadingAuth = true)

    try {
      const response = await loginRequest(email, senha);
      const { user: userData, token: authToken } = response;

      api.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

      const { imagem: _img, ...userSemPeso } = userData;
      localStorageService.salvar("token", authToken);
      localStorageService.salvar("user", userSemPeso);

      dispatch({
        type: "LOGIN_SUCESSO", // 2. Sucesso (loadingAuth = false, errorAuth = null)
        payload: { user: userData, token: authToken },
      });

      return true; // Retorna SUCESSO para o componente navegar
    } catch (error) {
      console.error("ERRO LOGIN:", error);
      const msg =
        error.response?.data?.error ||
        "Erro ao fazer login. Verifique seus dados.";

      dispatch({ type: "LOGIN_ERROR", payload: msg }); // 3. Erro (loadingAuth = false, errorAuth = msg)
      return false; // Retorna FALHA
    }
  };

  const logout = () => {
    localStorageService.remover("token");
    localStorageService.remover("user");
    localStorageService.remover("rascunho_perfil"); // Limpa rascunho

    localStorageService.salvar("logout_intencional", "true");
    delete api.defaults.headers.common["Authorization"];

    dispatch({ type: "LOGOUT" });
    navigation("/login");
  };
  // --- FUNÇÕES DO MODAL (FORMULÁRIO) ---

  const iniciarEdicao = () => {
    dispatch({ type: "INICIAR_EDICAO" });
  };

  const atualizarDado = (field, value) => {
    dispatch({ type: "SET_DADO", field, payload: value });
  };

  const definirImagemForm = (base64) => {
    dispatch({ type: "SET_IMAGEM", payload: base64 });
  };

  const salvarPerfil = async () => {
    dispatch({ type: "UPDATE_START" });

    try {
      // Monta objeto para enviar (pega direto do state)
      const dadosParaEnviar = {
        nome: state.nome,
        sobrenome: state.sobrenome,
        usuario: state.usuario,
        funcao: state.funcao,
        bio: state.bio,
        imagem: state.imagem,
      };

      const userAtualizado = await updateProfileRequest(dadosParaEnviar);

      // Atualiza Reducer
      dispatch({ type: "UPDATE_SUCCESS", payload: userAtualizado });

      // Atualiza Storage (User Diet)
      const { imagem: _img, ...userSemPeso } = userAtualizado;
      localStorageService.salvar("user", userSemPeso);

      // Limpa rascunho
      localStorageService.remover("rascunho_perfil");

      toastSucesso("Perfil atualizado!");
      return true; // Retorna true para o modal fechar
    } catch (error) {
      console.error("Erro update:", error);
      dispatch({ type: "UPDATE_ERROR", payload: "Erro ao atualizar." });
      toastErro("Erro ao atualizar perfil.");
      return false;
    }
  };

  // --- FUNÇÕES DE SEGUIR / DEIXAR DE SEGUIR (GRUPO 4) ---

  const handleToggleFollow = async (targetUserId) => {
    dispatch({ type: "TOGGLE_FOLLOW_START" });
    try {
      const result = await toggleFollowRequest(targetUserId);

      dispatch({
        type: "TOGGLE_FOLLOW_SUCCESS",
        payload: { isFollowing: result.isFollowing, targetId: targetUserId },
      });
      return result.isFollowing; // Retorna o novo estado de follow para o componente
    } catch (error) {
      console.error("Erro ao seguir/deixar de seguir:", error);
      dispatch({ type: "TOGGLE_FOLLOW_ERROR" });
      toastErro("Erro ao seguir/deixar de seguir usuário.");
    }
  };
  // Condicionamos a renderização dos filhos
  // Isso previne que a aplicação renderize as rotas protegidas antes da verificação terminar
  return (
    <AuthContext.Provider
      value={{
        // Sessão
        user: state.user,
        token: state.token,
        isAuthenticated: !!state.token, // Usa o token como verdade
        loading: state.loading,

        //Estados para o cadastro
        loadingRegister: state.loadingRegister,
        errorRegister: state.errorRegister,
        cadastroSucesso: state.cadastroSucesso,

        //Estados para login
        loadingAuth: state.loadingAuth,
        errorAuth: state.errorAuth,

        // Form
        nome: state.nome,
        sobrenome: state.sobrenome,
        usuario: state.usuario,
        funcao: state.funcao,
        bio: state.bio,
        imagem: state.imagem,

        // UI
        loadingUpdate: state.loadingUpdate,
        errorUpdate: state.errorUpdate,
        // Ações
        cadastro,
        login,
        logout,
        iniciarEdicao,
        atualizarDado,
        definirImagemForm,
        salvarPerfil,
        handleToggleFollow,
      }}
    >
      {!state.loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
