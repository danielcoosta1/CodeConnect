import { useNavigate } from "react-router-dom";
import ProfileAvatar from "../ProfileAvatar";
import {
  CardContainer,
  ImgCard,
  ContentCard,
  TitleCard,
  Description,
  CardFooter,
  AuthorInfo,
  ActionIcons,
  IconGroup,
} from "./style";
import { FaCode, FaRegComment, FaShareNodes } from "react-icons/fa6";

const Card = ({ post }) => {
  const navigate = useNavigate();
  // Função que abre o post inteiro
  const abrirPost = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <CardContainer onClick={abrirPost}>
      {post.image && (
        <ImgCard>
          <img
            src={`data:image/png;base64,${post.image}`}
            alt={post.title}
            loading="lazy"
          />
        </ImgCard>
      )}

      <ContentCard>
        <TitleCard>{post.title}</TitleCard>
        <Description>{post.content}</Description>

        <CardFooter
          onClick={
            (e) =>
              e.stopPropagation() /* Evita que o clique no footer abra o post */
          }
        >
          {post.author && (
            <ActionIcons>
              <IconGroup>
                <FaCode /> <span>0</span>
              </IconGroup>
              <IconGroup>
                <FaShareNodes /> <span>0</span>
              </IconGroup>
              <IconGroup>
                <FaRegComment /> <span>0</span>
              </IconGroup>
            </ActionIcons>
          )}
          <AuthorInfo to={`/perfil/${post.author.id}`}>
            <ProfileAvatar
              src={post.author?.imagem}
              size={60}
              hasBorder={true}
            />
            <div className="author-text">
              <small>@{post.author.usuario}</small>
            </div>
          </AuthorInfo>
        </CardFooter>
      </ContentCard>
    </CardContainer>
  );
};

export default Card;
