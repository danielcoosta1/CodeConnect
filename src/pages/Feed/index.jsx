import { useEffect } from "react";
import { usePost } from "../../hooks/usePost"; // Importe o hook
import { LuLoader } from "react-icons/lu";
import {
  Card,
  FeedContainerMain,
  FeedFilterContainer,
  FeedGrid,
  ImgCard,
  InputSearch,
  NoPostsContainer,
} from "./style";

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
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <LuLoader className="spin" size={60} /> Carregando feed...
      </div>
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
                <ImgCard
                  src={`data:image/png;base64,${post.image}`}
                  alt={post.title}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              )}

              <h2>{post.title}</h2>
              <p>{post.content}</p>

              {/* Aqui validamos se author existe para não quebrar */}
              <small>
                Por: {post.author ? post.author.nome : "Autor Desconhecido"}
              </small>

              {/* Opcional: Mostrar tags */}
              {post.tags && post.tags.length > 0 && (
                <div style={{ marginTop: "5px" }}>
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{ marginRight: "5px", color: "blue" }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
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
