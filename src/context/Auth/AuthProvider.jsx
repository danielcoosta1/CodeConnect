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
      // 1. O 'response' aqui já é o objeto { user, token } que vem do authService
      const response = await loginRequest(email, senha);

      // Log para você ver no console que o objeto chegou "limpo"
      console.log("Resposta do servidor:", response);

      // 2. Desestruturamos direto do response (sem o .data)
      const { user: userData, token: authToken } = response;

      // 3. Verificação de segurança
      if (!userData || !authToken) {
        throw new Error("Usuário ou Token não encontrados na resposta.");
      }

      // 4. Salva no localStorage
      localStorageService.salvar("token", authToken);
      localStorageService.salvar("user", userData);

      // 5. Atualiza o estado global
      setUser(userData);
      setToken(authToken);

      // 6. Configura o Axios para as próximas chamadas
      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

      navigation("/feed");
    } catch (error) {
      // Esse log detalhado que você viu é ótimo para debug!
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
      // 1. Envia para o Back-end (com imagem)
      const response = await updateProfileRequest(novosDados);

      // O backend retorna o user atualizado
      const usuarioAtualizado = response.data;

      // 2. ATUALIZA O ESTADO (Com imagem, para refletir na tela agora)
      setUser(usuarioAtualizado);

      // 3. SALVA NO LOCALSTORAGE (Sem a imagem)
      // Usamos a desestruturação para "separar" a imagem do resto
      const { imagem: _imagem, ...dadosLeves } = usuarioAtualizado;

      localStorageService.salvar("user", dadosLeves);
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
