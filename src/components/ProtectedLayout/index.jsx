import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ContainerMain from "../ContainerMain";
import { useEffect } from "react";
import { toastErro } from "../../utils/toast";

const ProtectedLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  
  useEffect(() => {
    // Condição: Se o carregamento da sessão terminou E o usuário não está autenticado...
    if (!loading && !isAuthenticated) {
      toastErro("Você precisa estar logado para acessar esta página!");
    }
  }, [isAuthenticated, loading]); // Dependências: Roda este efeito sempre que 'isAuthenticated' ou 'loading' mudarem.

  if (loading) {
    return <div>Carregando...</div>;
  }

  return isAuthenticated ? <ContainerMain /> : <Navigate to="/login" />;
};

export default ProtectedLayout;
