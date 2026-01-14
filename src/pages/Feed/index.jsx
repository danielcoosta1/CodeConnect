import { useEffect } from "react";
import { usePost } from "../../hooks/usePost"; // Importe o hook
import { LuLoader } from "react-icons/lu";
import { FeedContainer, FeedFilterContainer, FeedGrid } from "./style";

const Feed = () => {
  const { allPosts, loadingPosts, errorPosts, carregarPostsDoBanco } =
    usePost();

  useEffect(() => {
    carregarPostsDoBanco();
  }, []);

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
    <FeedContainer>
      <FeedFilterContainer>
        Teste - BARRA DE PESQUISA DE FILTROS
      </FeedFilterContainer>
      {allPosts && allPosts.length > 0 ? (
        allPosts.map((post) => (
          <FeedGrid>
            {/* Tratamento da Imagem: Se for base64 puro ou URL */}
            {post.image && (
              <img
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
          </FeedGrid>
        ))
      ) : (
        <p>Nenhum post encontrado. Seja o primeiro a publicar!</p>
      )}
    </FeedContainer>
  );
};

export default Feed;
