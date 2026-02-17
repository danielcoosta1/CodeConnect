import { ErrorContainer, RetryButton } from "./style";
import { BiErrorCircle } from "react-icons/bi";
import { FiRefreshCw } from "react-icons/fi";

const ErrorState = ({
  titulo = "Ops! Algo deu errado",
  mensagem,
  onRetry,
  textoBotao = "Tentar Novamente",
}) => {
  return (
    <ErrorContainer>
      <BiErrorCircle className="error-icon" />

      <h3>{titulo}</h3>
      <p>
        {mensagem ||
          "Tivemos um problema de comunicação com o servidor. Verifique sua conexão e tente novamente."}
      </p>

      {onRetry && (
        <RetryButton onClick={onRetry}>
          <FiRefreshCw />
          {textoBotao}
        </RetryButton>
      )}
    </ErrorContainer>
  );
};

export default ErrorState;
