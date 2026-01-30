import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { localStorageService } from "../../services/localStorageService";
import { useNavigate } from "react-router-dom";

import { loginRequest } from "../../services/authService";
import { getUserProfile, updateProfileRequest } from "../../services/userService";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const [loading, setLoading] = useState(true);

  const navigation = useNavigate();

  //Restaura o estado de autenticação ao carregar o aplicativo
  useEffect(() => {
    const carregarSessao = async () => {
      const storedUser = localStorageService.ler("user");
      const storedToken = localStorageService.ler("token");

      if (storedToken && storedUser) {
        // 1. PASSO RÁPIDO: Restaura o que temos no bolso (Sem foto)
        // O usuário já vê o nome e o site carrega.
        setToken(storedToken);
        setUser(storedUser);
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${storedToken}`;

        // 2. PASSO COMPLETO: Vai no banco buscar os dados do usuário ATUALIZADOS (com foto)
        try {
          console.log("Buscando dados atualizados (foto) no servidor...");
          const dadosCompletos = await getUserProfile();

          // Quando chegar, atualiza o estado com a FOTO!
          setUser(dadosCompletos);
        } catch (error) {
          console.error("Token expirado ou erro de rede:", error);
          // Opcional: se o token não vale mais, desloga
          // logout();
        }
      }
      setLoading(false);
    };

    carregarSessao();
  }, []);

  const login = async (email, senha) => {
    try {
      const response = await loginRequest(email, senha);
      console.log("Resposta do servidor:", response);

      const { user: userData, token: authToken } = response;

      if (!userData || !authToken) {
        throw new Error("Usuário ou Token não encontrados.");
      }

      // 1. ATUALIZA A TELA (Com a foto completa que veio do banco)
      setUser(userData);
      setToken(authToken);

      // 2. CONFIGURA AXIOS
      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

      // 3. SALVA NO STORAGE (SEM A FOTO - PARA NÃO DAR ERRO 431)
      const { imagem: _imagem, ...userSemPeso } = userData;
      localStorageService.salvar("token", authToken);
      localStorageService.salvar("user", userSemPeso); //

      navigation("/feed");
    } catch (error) {
      console.error("ERRO DETALHADO DO LOGIN:", error);
      throw error;
    }
  };
  const logout = () => {
    localStorageService.remover("token");
    localStorageService.remover("user");

    // REMOVE O CRACHÁ no logout
    delete axios.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
  };

  // 3. NOVA FUNÇÃO DE ATUALIZAR PERFIL (Substituindo a local)
  const atualizarPerfilNoBanco = async (novosDados) => {
    try {
      // 1. Envia para o Back-end
      const response = await updateProfileRequest(novosDados);

      // O backend retorna o user atualizado (response já é o objeto correto agora)
      const usuarioAtualizado = response;

      // 2. ATUALIZA O ESTADO (Com imagem, para a foto mudar na tela agora mesmo)
      setUser(usuarioAtualizado);

      // 3. SALVA NO LOCALSTORAGE (Sem a imagem para evitar o erro 431)
      if (usuarioAtualizado) {
        // A sintaxe abaixo cria uma variável 'userSemPeso' com tudo, MENOS a imagem
        // O '_imagem' é só um nome para a variável descartada
        const { imagem: _imagem, ...userSemPeso } = usuarioAtualizado;

        localStorageService.salvar("user", userSemPeso);
      }
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
      throw error;
    }
  };

  // Condicionamos a renderização dos filhos
  // Isso previne que a aplicação renderize as rotas protegidas antes da verificação terminar
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        atualizarPerfilNoBanco,
        isAuthenticated: !!token,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
