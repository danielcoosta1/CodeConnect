import { LuLoader } from "react-icons/lu";
import { LoadingContainer } from "./style";

const LoadingState = ({ texto = "Carregando...", size = 40 }) => {
  return (
    <LoadingContainer $size={size}>
      <LuLoader className="spin" />
      <span>{texto}</span>
    </LoadingContainer>
  );
};

export default LoadingState;
