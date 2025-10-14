import { useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { localStorageService } from "../services/localStorageService";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);





  
  const login = async (email, senha) => {
    try {
      const response = await axios.post(
        "http://localhost:51213/api/auth/login",
        { email, senha }
      );
      const { user: userData, token: authToken } = response.data;
      localStorageService.salvar("token", authToken);
      localStorageService.salvar("user", userData);
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
    setToken(null); 
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
