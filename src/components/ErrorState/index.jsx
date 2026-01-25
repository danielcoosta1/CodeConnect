import { ErrorContainer, RetryButton } from "./style";
import { BiErrorCircle } from "react-icons/bi";
import { FiRefreshCw } from "react-icons/fi"; // Ícone de recarregar

const ErrorState = ({ 
  titulo = "Ops! Algo deu errado", 
  mensagem, 
  onRetry, // Função opcional para tentar novamente
  textoBotao = "Tentar Novamente" 
}) => {
  return (
    <ErrorContainer>
      <BiErrorCircle size={60} />
      <h3>{titulo}</h3>
      <p>{mensagem || "Tivemos um problema de comunicação com o servidor. Verifique sua conexão e tente novamente."}</p>
      
      {/* O botão só aparece se uma função for passada via props */}
      {onRetry && (
        <RetryButton onClick={onRetry}>
          <FiRefreshCw size={18} />
          {textoBotao}
        </RetryButton>
      )}
    </ErrorContainer>
  );
};

export default ErrorState;