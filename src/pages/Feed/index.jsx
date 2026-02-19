import { useEffect, useMemo, useState } from "react";
import { usePost } from "../../hooks/usePost"; // Importe o hook
import { IoMdClose } from "react-icons/io";
import {
  ExcluirTudoButton,
  FeedContainerMain,
  FeedFilterContainer,
  InputSearch,
  LimparBuscaButton,
  NoPostsContainer,
  TagItem,
  TagList,
  TagRemoveButton,
  TagsFiltersContainer,
} from "./style";

import { CardGrid } from "../../components/CardGrid/style";
import Card from "../../components/Card";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";

const Feed = () => {
  const { allPosts, loadingPosts, errorPosts, carregarPostsDoBanco } =
    usePost();

  const [termoBusca, setTermoBusca] = useState("");
  const [tagsFiltrosAtivos, setTagsFiltrosAtivos] = useState([]);
  const [erroLocal, setErroLocal] = useState("");

  useEffect(() => {
    carregarPostsDoBanco();
  }, []);

  const lidarComKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    const novaTagFiltros = e.target.value.trim();
    if (novaTagFiltros && !tagsFiltrosAtivos.includes(novaTagFiltros)) {
      setTagsFiltrosAtivos([...tagsFiltrosAtivos, novaTagFiltros]);
      setErroLocal("");
      setTermoBusca(""); // Limpa o campo de entrada
    } else if (tagsFiltrosAtivos.includes(novaTagFiltros)) {
      setErroLocal("Essa tag já está aplicada como filtro.");
    }
  };

  // Função que limpa TUDO (Texto + Tags)
  const limparBuscaTotal = () => {
    setTagsFiltrosAtivos([]);
    setTermoBusca("");
    setErroLocal("");
  };

  // Verifica se há posts

  const postsFiltrados = useMemo(() => {
    // 1. ATALHO DE PERFORMANCE (Short Circuit)
    // Se não tem nada digitado E nenhuma tag selecionada, não perca tempo filtrando.
    if (tagsFiltrosAtivos.length === 0 && termoBusca.trim() === "") {
      return allPosts;
    }

    return allPosts.filter((post) => {
      // --- PORTÃO 1: VERIFICA AS TAGS FIXAS (O que você já fez) ---
      const atendeTags =
        tagsFiltrosAtivos.length === 0 ||
        tagsFiltrosAtivos.every((termo) => {
          const termoLimpo = termo.toLowerCase();
          return (
            post.title.toLowerCase().includes(termoLimpo) ||
            post.content.toLowerCase().includes(termoLimpo) ||
            (post.tags &&
              post.tags.some((tag) => tag.toLowerCase().includes(termoLimpo)))
          );
        });

      // --- PORTÃO 2: VERIFICA A BUSCA AO VIVO ---
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
  }, [allPosts, tagsFiltrosAtivos, termoBusca]);

  // 3. Renderização Condicional baseada no estado Global
  if (loadingPosts) {
    return <LoadingState texto="Carregando feed..." size={45} />;
  }
  if (errorPosts) {
    return <ErrorState mensagem={errorPosts} onRetry={carregarPostsDoBanco} />;
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
          {tagsFiltrosAtivos.length > 0 && (
            <>
              <TagList>
                {tagsFiltrosAtivos.map((tag, index) => (
                  <TagItem key={index}>
                    <span>{tag}</span>
                    <TagRemoveButton
                      onClick={() =>
                        setTagsFiltrosAtivos(
                          tagsFiltrosAtivos.filter((_, i) => i !== index),
                        )
                      }
                    >
                      <IoMdClose />
                    </TagRemoveButton>
                  </TagItem>
                ))}
              </TagList>
              <ExcluirTudoButton onClick={() => setTagsFiltrosAtivos([])}>
                Limpar tudo
              </ExcluirTudoButton>
            </>
          )}
        </TagsFiltersContainer>
      </FeedFilterContainer>

      {temResultados ? (
        <CardGrid>
          {postsFiltrados.map((post) => (
            <Card
              key={post.id}
              post={post} // Passamos o objeto inteiro, o Card cuida do resto!
            />
          ))}
        </CardGrid>
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
              <LimparBuscaButton onClick={limparBuscaTotal}>
                Limpar buca
              </LimparBuscaButton>
            </>
          )}
        </NoPostsContainer>
      )}
    </FeedContainerMain>
  );
};

export default Feed;
