import { useEffect } from "react";
import { usePost } from "../../hooks/usePost"; // Importe o hook
import { LuLoader } from "react-icons/lu";
import {
  ActionIcons,
  AuthorInfo,
  Card,
  CardFooter,
  Description,
  FeedContainerMain,
  FeedFilterContainer,
  FeedGrid,
  IconGroup,
  ImgCard,
  InputSearch,
  LoadingContainer,
  NoPostsContainer,
  TitleCard,
} from "./style";
import { FaCode, FaRegComment } from "react-icons/fa";
import { FaShareNodes } from "react-icons/fa6";

const Feed = () => {
  const { allPosts, loadingPosts, errorPosts, carregarPostsDoBanco } =
    usePost();

  useEffect(() => {
    carregarPostsDoBanco();
  }, []);

  const hasPosts = allPosts && allPosts.length > 0; // Verifica se há posts

  // 3. Renderização Condicional baseada no estado Global
  if (loadingPosts) {
    return (
      <LoadingContainer>
        <LuLoader className="spin" size={40} /> Carregando feed...
      </LoadingContainer>
    );
  }

  if (errorPosts) {
    return <div>{errorPosts}</div>;
  }

  return (
    <FeedContainerMain>
      <FeedFilterContainer>
        <InputSearch type="search" placeholder="Buscar posts..." />
      </FeedFilterContainer>
      <FeedGrid>
        {hasPosts ? (
          allPosts.map((post) => (
            <Card key={post.id}>
              {post.image && (
                <ImgCard>
                  <img
                    src={`data:image/png;base64,${post.image}`}
                    alt={post.title}
                  />
                </ImgCard>
              )}

              <TitleCard>{post.title}</TitleCard>
              <Description>{post.content}</Description>

              <CardFooter>
                <ActionIcons>
                  <IconGroup>
                    <FaCode size={25} title="Ver código" />
                    <span>0</span> {/* Contador de lines of code ou cliques */}
                  </IconGroup>
                  <IconGroup>
                    <FaShareNodes size={25} />
                    <span>0</span> {/* Contador de compartilhamentos */}
                  </IconGroup>
                  <IconGroup>
                    <FaRegComment size={25} title="Comentários" />
                    <span>0</span> {/* Contador de comentários */}
                  </IconGroup>
                </ActionIcons>
                <AuthorInfo>
                  {/* Placeholder para foto do usuário. Depois virá do post.author.avatar */}
                  <img src="https://via.placeholder.com/30" alt="Avatar" />
                  <small>
                    {post.author ? post.author.nome : "Autor Desconhecido"}
                  </small>
                </AuthorInfo>
              </CardFooter>
            </Card>
          ))
        ) : (
          <NoPostsContainer>
            <p>Nenhum post encontrado. Seja o primeiro a publicar!</p>
          </NoPostsContainer>
        )}
      </FeedGrid>
    </FeedContainerMain>
  );
};

export default Feed;
