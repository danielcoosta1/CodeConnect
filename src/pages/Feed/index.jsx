import { useEffect, useMemo, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePost } from "../../hooks/usePost";
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

const Feed = ({ postType = "PROJECT" }) => {
  const { allPosts, loadingPosts, errorPosts, carregarPostsDoBanco } =
    usePost();

  const [termoBusca, setTermoBusca] = useState("");
  const [tagsFiltrosAtivos, setTagsFiltrosAtivos] = useState([]);
  const [erroLocal, setErroLocal] = useState("");

  const feedRef = useRef(null);

  // Variáveis auxiliares para deixar o texto dinâmico (Projeto ou Dúvida)
  const isQuestion = postType === "QUESTION";
  const nomeDaVertente = isQuestion ? "dúvida" : "projeto";
  const sufixoDeGenero = isQuestion ? "a" : "o";

  useEffect(() => {
    carregarPostsDoBanco();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lidarComKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    const novaTagFiltros = e.target.value.trim();
    if (novaTagFiltros && !tagsFiltrosAtivos.includes(novaTagFiltros)) {
      setTagsFiltrosAtivos([...tagsFiltrosAtivos, novaTagFiltros]);
      setErroLocal("");
      setTermoBusca("");
    } else if (tagsFiltrosAtivos.includes(novaTagFiltros)) {
      setErroLocal("Essa tag já está aplicada como filtro.");
    }
  };

  const limparBuscaTotal = () => {
    setTagsFiltrosAtivos([]);
    setTermoBusca("");
    setErroLocal("");
  };

  const postsFiltrados = useMemo(() => {
    // 1. PRIMEIRO FILTRO: Pega só os posts que pertencem à vertente atual (PROJECT ou QUESTION)
    const postsDaVertente = allPosts.filter((post) => post.type === postType);

    // 2. Se não houver busca, devolve os posts da vertente
    if (tagsFiltrosAtivos.length === 0 && termoBusca.trim() === "") {
      return postsDaVertente;
    }

    // 3. Aplica a busca em texto e tags APENAS nos posts da vertente correta
    return postsDaVertente.filter((post) => {
      const atendeTags =
        tagsFiltrosAtivos.length === 0 ||
        tagsFiltrosAtivos.every((termo) => {
          const termoLimpo = termo.toLowerCase();
          return (
            post.title?.toLowerCase().includes(termoLimpo) ||
            post.content?.toLowerCase().includes(termoLimpo) ||
            (post.tags &&
              post.tags.some((tag) => tag.toLowerCase().includes(termoLimpo)))
          );
        });

      const termoBuscaLimpo = termoBusca.toLowerCase().trim();

      const atendeBusca =
        termoBuscaLimpo === "" ||
        post.title?.toLowerCase().includes(termoBuscaLimpo) ||
        post.content?.toLowerCase().includes(termoBuscaLimpo) ||
        (post.tags &&
          post.tags.some((tag) => tag.toLowerCase().includes(termoBuscaLimpo)));

      return atendeTags && atendeBusca;
    });
  }, [allPosts, tagsFiltrosAtivos, termoBusca, postType]); // Adicionamos postType nas dependências

  useGSAP(
    () => {
      if (!feedRef.current || loadingPosts || errorPosts) return;

      if (postsFiltrados.length > 0) {
        gsap.to(".post-animado", {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.25,
          ease: "back.out(1.2)",
        });
      }
    },
    {
      scope: feedRef,
      dependencies: [postsFiltrados, loadingPosts, errorPosts],
    },
  );

  const temResultados = postsFiltrados.length > 0;

  return (
    <FeedContainerMain ref={feedRef}>
      {loadingPosts ? (
        <LoadingState texto="Carregando feed..." size={45} />
      ) : errorPosts ? (
        <ErrorState mensagem={errorPosts} onRetry={carregarPostsDoBanco} />
      ) : (
        <>
          <FeedFilterContainer>
            <InputSearch
              id="search-feed"
              name="search-feed"
              type="search"
              // Placeholder Inteligente
              placeholder={`Buscar ${nomeDaVertente}s...`}
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
                <div
                  key={post.id}
                  className="post-animado"
                  style={{
                    opacity: 0,
                    scale: 0.95,
                    transform: "translateY(30px)",
                  }}
                >
                  <Card post={post} />
                </div>
              ))}
            </CardGrid>
          ) : (
            <NoPostsContainer>
              {allPosts.filter((p) => p.type === postType).length === 0 ? (
                <p>
                  Nenhum{sufixoDeGenero} {nomeDaVertente} encontrad
                  {sufixoDeGenero} no sistema.
                </p>
              ) : (
                <>
                  <p>
                    Nenhum{sufixoDeGenero} {nomeDaVertente} encontrad
                    {sufixoDeGenero} para essa busca.
                  </p>
                  <LimparBuscaButton onClick={limparBuscaTotal}>
                    Limpar busca
                  </LimparBuscaButton>
                </>
              )}
            </NoPostsContainer>
          )}
        </>
      )}
    </FeedContainerMain>
  );
};

export default Feed;
