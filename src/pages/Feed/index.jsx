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

  // Função que limpa TUDO (Texto + Tags)
  const limparBuscaTotal = () => {
    setTagsFiltros([]);
    setTermoBusca("");
    setErroLocal("");
  };

  // Verifica se há posts

  const postsFiltrados = useMemo(() => {
    // 1. ATALHO DE PERFORMANCE (Short Circuit)
    // Se não tem nada digitado E nenhuma tag selecionada, não perca tempo filtrando.
    if (tagsFiltroAtivos.length === 0 && termoBusca.trim() === "") {
      return allPosts;
    }

    return allPosts.filter((post) => {
      // --- PORTÃO 1: VERIFICA AS TAGS FIXAS (O que você já fez) ---
      const atendeTags =
        tagsFiltroAtivos.length === 0 ||
        tagsFiltroAtivos.every((termo) => {
          const termoLimpo = termo.toLowerCase();
          return (
            post.title.toLowerCase().includes(termoLimpo) ||
            post.content.toLowerCase().includes(termoLimpo) ||
            (post.tags &&
              post.tags.some((tag) => tag.toLowerCase().includes(termoLimpo)))
          );
        });

      // --- PORTÃO 2: VERIFICA A BUSCA AO VIVO (O que faltava) ---
      // Se o termoBusca estiver vazio, assumimos "true" (passa direto).
      // Se tiver texto, fazemos a mesma varredura que fizemos nas tags.
      const termoBuscaLimpo = termoBusca.toLowerCase().trim();

      const atendeBusca =
        termoBuscaLimpo === "" ||
        post.title.toLowerCase().includes(termoBuscaLimpo) ||
        post.content.toLowerCase().includes(termoBuscaLimpo) ||
        (post.tags &&
          post.tags.some((tag) => tag.toLowerCase().includes(termoBuscaLimpo)));

      // --- O VEREDITO FINAL ---
      // O post precisa atender às tags E atender à busca atual
      return atendeTags && atendeBusca;
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

  // Lógica para saber se TEMOS RESULTADOS PARA MOSTRAR
  // O hasPosts original só checava o banco. Agora precisamos saber se sobrou algo do filtro.
  const temResultados = postsFiltrados.length > 0;

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
              <ExcluirTudoButton onClick={() => setTagsFiltros([])}>
                {" "}
                // Apenas limpa as tags(estado local ) Limpar tudo
              </ExcluirTudoButton>
            </>
          )}
        </TagsFiltersContainer>
      </FeedFilterContainer>

      <FeedGrid $hasPosts={temResultados}>
        {temResultados ? (
          // CENÁRIO 1: Temos posts filtrados para mostrar
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
          // CENÁRIO 2: Não sobrou nada (ou banco vazio ou filtro zerou tudo)
          <NoPostsContainer>
            {allPosts.length === 0 ? (
              // Banco vazio
              <p>Nenhum post encontrado no sistema.</p>
            ) : (
              // Filtro não encontrou nada
              <>
                <p>Nenhum post encontrado para essa busca.</p>
                {/* BOTÃO DE RESGATE: Limpa texto E tags */}
                <button
                  onClick={limparBuscaTotal}
                  style={{
                    marginTop: "15px",
                    background: "transparent",
                    color: "#88F2DB",
                    border: "1px solid #88F2DB",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Limpar busca
                </button>
              </>
            )}
          </NoPostsContainer>
        )}
      </FeedGrid>
    </FeedContainerMain>
  );
};

export default Feed;
