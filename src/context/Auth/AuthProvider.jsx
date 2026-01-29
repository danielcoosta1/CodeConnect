import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { localStorageService } from "../../services/localStorageService";
import { useNavigate } from "react-router-dom";

import { loginRequest } from "../../services/authService";
import { updateProfileRequest } from "../../services/userService";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const [loading, setLoading] = useState(true);

  const navigation = useNavigate();

  //Restaura o estado de autenticação ao carregar o aplicativo
  useEffect(() => {
    const storedUser = localStorageService.ler("user");
    const storedToken = localStorageService.ler("token");

    // ATIVA O CRACHÁ ao restaurar a sessão

    if (storedToken && storedUser) {
      //Automaticamente adiciona o token a todas as requisições axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

      // Restaura o estado de autenticação
      setToken(storedToken);
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, senha) => {
    try {
      const response = await loginRequest(email, senha);
      const { user: userData, token: authToken } = response.data;
      // Salva os dados no localStorage
      localStorageService.salvar("token", authToken);
      localStorageService.salvar("user", userData);

      // Atualiza o estado
      setUser(userData);
      setToken(authToken);

      // Redireciona para a página inicial após o login
      navigation("/feed");
      // ATIVA O CRACHÁ após o login
      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
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
      // Chama o serviço de USER (Bate em /api/users/perfil)
      await updateProfileRequest(novosDados);

      // Se não deu erro no backend, atualizamos o Front-end
      const usuarioAtualizado = { ...user, ...novosDados };
      setUser(usuarioAtualizado);

      // Atualizamos o LocalStorage para não perder no F5
      localStorageService.salvar("user", usuarioAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
      throw error; // Devolvemos o erro para o Modal exibir
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
