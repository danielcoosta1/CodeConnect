import { FaUserCircle } from "react-icons/fa";
import { AvatarWrapper, StyledImg } from "./style";

const ProfileAvatar = ({
  src,
  size = 40,
  alt = "Avatar",
  hasBorder = false,
}) => {
  // CASO NÃO TENHA IMAGEM
  if (!src) {
    return (
      <AvatarWrapper $size={size} $hasBorder={hasBorder}>
        {/* Removemos o size={size} aqui. O CSS do wrapper agora controla o tamanho do SVG */}
        <FaUserCircle color="#888888" />
      </AvatarWrapper>
    );
  }

  // CASO TENHA IMAGEM
  const finalSrc = src.startsWith("data:") 
    ? src 
    : `data:image/png;base64,${src}`;

  return (
    <AvatarWrapper $size={size} $hasBorder={hasBorder}>
      <StyledImg
        src={finalSrc}
        alt={alt}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/150";
        }}
      />
    </AvatarWrapper>
  );
};

export default ProfileAvatar;