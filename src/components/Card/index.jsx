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
            <img
              src={post.author.imagem || "https://via.placeholder.com/40"}
              alt={post.author.nome}
            />
            <small>{post.author.nome}</small>
          </AuthorInfo>
        </CardFooter>
      </ContentCard>
    </CardContainer>
  );
};

export default Card;
