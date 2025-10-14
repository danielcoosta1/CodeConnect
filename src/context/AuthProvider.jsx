import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { localStorageService } from "../services/localStorageService";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const navigation = useNavigate();

  //Restaura o estado de autenticação ao carregar o aplicativo
  useEffect(() => {
    const storedToken = localStorageService.ler("user");
    const storedUser = localStorageService.ler("token");
    // ATIVA O CRACHÁ ao restaurar a sessão
    axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
  }, []);
  const login = async (email, senha) => {
    try {
      const response = await axios.post(
        "http://localhost:51213/api/auth/login",
        { email, senha }
      );
      const { user: userData, token: authToken } = response.data;
      navigation("/feed");
      localStorageService.salvar("token", authToken);
      localStorageService.salvar("user", userData);
      // ATIVA O CRACHÁ após o login
      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
      setUser(userData);
      setToken(authToken);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorageService.remover("token");
    localStorageService.remover("user");
    navigation("/login");
    // REMOVE O CRACHÁ no logout
    delete axios.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
