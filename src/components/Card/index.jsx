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

// O Card recebe a "prop" post. Quem chamar o Card, TEM QUE passar a prop post.
const Card = ({ post }) => {
  return (
    <CardContainer>
      {post.image && (
        <ImgCard>
          <img src={`data:image/png;base64,${post.image}`} alt={post.title} />
        </ImgCard>
      )}

      <ContentCard>
        <TitleCard>{post.title}</TitleCard>
        <Description>{post.content}</Description>

        <CardFooter>
          {post.author && (
            <ActionIcons>
              <IconGroup>
                <FaCode size={20} /> 0
              </IconGroup>
              <IconGroup>
                <FaShareNodes size={20} /> 0
              </IconGroup>
              <IconGroup>
                <FaRegComment size={20} /> 0
              </IconGroup>
            </ActionIcons>
          )}
          <AuthorInfo>
            <ProfileAvatar
              src={post.author?.imagem}
              size={40}
              hasBorder={true}
            />
            <small>@{post.author.usuario}</small>
          </AuthorInfo>
        </CardFooter>
      </ContentCard>
    </CardContainer>
  );
};

export default Card;
