import { LuLoader } from "react-icons/lu";
import { LoadingContainer } from "./style";

const LoadingState = ({ texto = "Carregando...", size = 40 }) => {
  return (
    <LoadingContainer $size={size}>
      <LuLoader className="spin" size={size} />
      <span>{texto}</span>
    </LoadingContainer>
  );
};

export default LoadingState;
