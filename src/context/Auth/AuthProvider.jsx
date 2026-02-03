import { useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { localStorageService } from "../../services/localStorageService";
import { useNavigate } from "react-router-dom";

import { loginRequest } from "../../services/authService";
import {
  getUserProfile,
  updateProfileRequest,
} from "../../services/userService";
import { authReducer } from "./authReducer";
import { authInicialState } from "./inicialState";
import { toastErro, toastSucesso } from "../../utils/toast";

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
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${storedToken}`;

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

  const login = async (email, senha) => {
    try {
      const response = await loginRequest(email, senha);
      console.log("Resposta do servidor:", response);

      const { user: userData, token: authToken } = response;

      // Configura Axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

      // Salva no Storage (Sem imagem pesada)
      const { imagem: _img, ...userSemPeso } = userData;
      localStorageService.salvar("token", authToken);
      localStorageService.salvar("user", userSemPeso);

      // Atualiza Reducer
      dispatch({
        type: "LOGIN_SUCESSO",
        payload: { user: userData, token: authToken },
      });

      toastSucesso("Login realizado com sucesso!");

      navigation("/feed");
    } catch (error) {
      console.error("ERRO LOGIN:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorageService.remover("token");
    localStorageService.remover("user");
    localStorageService.remover("rascunho_perfil"); // Limpa rascunho

    delete axios.defaults.headers.common["Authorization"];

    dispatch({ type: "LOGOUT" });
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

        // Form
        nome: state.nome,
        sobrenome: state.sobrenome,
        usuario: state.usuario,
        funcao: state.funcao,
        bio: state.bio,
        imagem: state.imagem,

        // UI
        loadingUpdate: state.loadingUpdate,

        // Ações
        login,
        logout,
        iniciarEdicao,
        atualizarDado,
        definirImagemForm,
        salvarPerfil,
      }}
    >
      {!state.loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
