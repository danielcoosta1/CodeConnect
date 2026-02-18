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

  //CASO TENHA IMAGEM - RENDERIZA A IMAGEM BASE64
  const finalSrc = src.startsWith("data:") //VERIFICA SE JÁ VEM COM O PREFIXO
    ? src //SE SIM, USA NORMALMENTE
    : `data:image/png;base64,${src}`; //'ENGANAMOS' O NAVEGADOR COLOCANDO O PREFIXO PARA IMAGEM BASE64 - ASSIM ELE CONSEGUE RENDERIZAR A IMAGEM CORRETAMENTE

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
