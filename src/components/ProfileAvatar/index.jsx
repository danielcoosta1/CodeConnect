import { FaUserCircle } from "react-icons/fa";
import { AvatarWrapper, StyledImg } from "./style";

const ProfileAvatar = ({
  src,
  size = 40,
  alt = "Avatar",
  hasBorder = false,
}) => {
  //CASO NÃO TENHA IMAGEM - RENDERIZA ÍCONE PADRÃO DO REACT-ICONS
  if (!src) {
    return (
      <AvatarWrapper $size={size} $hasBorder={hasBorder}>
        <FaUserCircle color="#888888" />
      </AvatarWrapper>
    );
  }

  // Verifica se é um link de internet comum (como a foto do Google)
  const isHttpUrl = src.startsWith("http://") || src.startsWith("https://");

  // Se já tiver o prefixo do Base64 OU for um link HTTP, usa direto. Se não, injeta o Base64.
  const finalSrc =
    src.startsWith("data:") || isHttpUrl ? src : `data:image/png;base64,${src}`;

  return (
    <AvatarWrapper $size={size} $hasBorder={hasBorder}>
      <StyledImg
        src={finalSrc}
        alt={alt}
        onError={(e) => {
          //TODA IMG TEM UMA PROBABILIDADE DE NÃO CARREGAR CORRETAMENTE, ENTÃO COLOCAMOS UM TRATAMENTO DE ERRO PARA SUBSTITUIR POR UMA IMAGEM PADRÃO
          e.target.onerror = null; //EVITA LOOP INFINITO CASO A IMAGEM PADRÃO TAMBÉM NÃO CARREGUE
          e.target.src = "https://via.placeholder.com/150";
        }}
      />
    </AvatarWrapper>
  );
};

export default ProfileAvatar;
