import { useEffect, useMemo, useState } from "react";
import { usePost } from "../../hooks/usePost"; // Importe o hook
import { LuLoader } from "react-icons/lu";
import {
  ActionIcons,
  AuthorInfo,
  Card,
  CardFooter,
  Description,
  ExcluirTudoButton,
  FeedContainerMain,
  FeedFilterContainer,
  FeedGrid,
  IconGroup,
  ImgCard,
  InputSearch,
  LoadingContainer,
  NoPostsContainer,
  TagItem,
  TagList,
  TagRemoveButton,
  TagsFiltersContainer,
  TitleCard,
} from "./style";
import { FaCode, FaRegComment } from "react-icons/fa";
import { FaShareNodes } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const Feed = () => {
  const { allPosts, loadingPosts, errorPosts, carregarPostsDoBanco } =
    usePost();

  const [termoBusca, setTermoBusca] = useState("");
  const [tagsFiltroAtivos, setTagsFiltros] = useState([]);
  const [erroLocal, setErroLocal] = useState("");

  useEffect(() => {
    carregarPostsDoBanco();
  }, []);

  const lidarComKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    const novaTagFiltros = e.target.value.trim();
    if (novaTagFiltros && !tagsFiltroAtivos.includes(novaTagFiltros)) {
      setTagsFiltros([...tagsFiltroAtivos, novaTagFiltros]);
      setErroLocal("");
      setTermoBusca(""); // Limpa o campo de entrada
    } else if (tagsFiltroAtivos.includes(novaTagFiltros)) {
      setErroLocal("Essa tag já está aplicada como filtro.");
    }
  };

  const limparFiltros = () => {
    setTagsFiltros([]);
    setErroLocal("");
  };

  const hasPosts = allPosts && allPosts.length > 0; // Verifica se há posts

  const postsFiltrados = useMemo(() => {
    //1.ATALHG  - SHOT CIRCUIT
    if (tagsFiltroAtivos.length === 0 && termoBusca.trim() === "") {
      return allPosts;
    }

    return allPosts.filter((post) => {
      //2. O FILTRO PRINCIPAL
      return tagsFiltroAtivos.every((termo) => {
        
        const termoLimpo = termo.toLowerCase(); //NORMALIZAÇÃO

        const noTitulo = post.title.toLowerCase().includes(termoLimpo);
        const naDescricao = post.content.toLowerCase().includes(termoLimpo);
        const nasTags =
          post.tags &&
          post.tags.some((tag) => tag.toLowerCase().includes(termoLimpo));

        return noTitulo || naDescricao || nasTags;
      });
    });
  }, [allPosts, tagsFiltroAtivos, termoBusca]);

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
        <InputSearch
          id="search-feed"
          name="search-feed"
          type="search"
          placeholder="Digite o que você procura..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          onKeyDown={lidarComKeyDown}
        />
        {erroLocal && (
          <p style={{ color: "red", marginTop: "10px" }}>{erroLocal}</p>
        )}
        <TagsFiltersContainer>
          {tagsFiltroAtivos.length > 0 && (
            <>
              <TagList>
                {tagsFiltroAtivos.map((tag, index) => (
                  <TagItem key={index}>
                    <span>{tag}</span>
                    <TagRemoveButton
                      onClick={() =>
                        setTagsFiltros(
                          tagsFiltroAtivos.filter((_, i) => i !== index),
                        )
                      }
                    >
                      <IoMdClose />
                    </TagRemoveButton>
                  </TagItem>
                ))}
              </TagList>
              <ExcluirTudoButton onClick={limparFiltros}>
                Limpar tudo
              </ExcluirTudoButton>
            </>
          )}
        </TagsFiltersContainer>
      </FeedFilterContainer>
      <FeedGrid>
        {hasPosts ? (
          postsFiltrados.map((post) => (
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
