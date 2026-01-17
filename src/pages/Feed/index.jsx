import { useEffect } from "react";
import { usePost } from "../../hooks/usePost"; // Importe o hook
import { LuLoader } from "react-icons/lu";
import {
  ActionIcons,
  Card,
  CardFooter,
  Description,
  FeedContainerMain,
  FeedFilterContainer,
  FeedGrid,
  ImgCard,
  InputSearch,
  LoadingContainer,
  NoPostsContainer,
  TitleCard,
} from "./style";
import { FaCode, FaRegComment } from "react-icons/fa";

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
                  {/* Ícones meramente visuais por enquanto */}
                  <FaCode size={20} title="Ver código" />
                  <FaRegComment size={20} title="Comentários" />
                </ActionIcons>
                <small>
                  Por : {post.author ? post.author.nome : "Autor Desconhecido"}
                </small>
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
