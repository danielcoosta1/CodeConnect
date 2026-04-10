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

const Feed = () => {
  const { allPosts, loadingPosts, errorPosts, carregarPostsDoBanco } = usePost();

  const [termoBusca, setTermoBusca] = useState("");
  const [tagsFiltrosAtivos, setTagsFiltrosAtivos] = useState([]);
  const [erroLocal, setErroLocal] = useState("");

  // Referência para a "Caixa Pai" da animação
  const feedRef = useRef(null);

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
      setTermoBusca(""); // Limpa o campo de entrada
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
    if (tagsFiltrosAtivos.length === 0 && termoBusca.trim() === "") {
      return allPosts;
    }

    return allPosts.filter((post) => {
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
  }, [allPosts, tagsFiltrosAtivos, termoBusca]);

  // --- ✨ MOTOR DE ANIMAÇÃO GSAP (EFEITO MICROZOOM) ✨ ---
  useGSAP(
    () => {
      // Aborta a animação se a referência não existir ou se a tela estiver pronta
      if (!feedRef.current || loadingPosts || errorPosts) return;

      if (postsFiltrados.length > 0) {
        // Usamos .to() porque o elemento já começa no estado 'from' (definido no HTML)
        gsap.to(".post-animado", {
          y: 0,           // Volta para a posição original Y: 0
          opacity: 1,     // Fica visível
          scale: 1,       // Volta pro tamanho original (100%)
          duration: 1.2,  // Duração macia por card
          stagger: 0.25,  // Atraso entre os cards (Efeito Cascata)
          ease: "back.out(1.2)", // O "quique" elástico do microzoom
        });
      }
    },
    {
      scope: feedRef,
      dependencies: [postsFiltrados, loadingPosts, errorPosts], // Refaz ao filtrar
    }
  );

  const temResultados = postsFiltrados.length > 0;

  return (
    // O PAI DE TODOS: Recebe a ref do GSAP e SEMPRE é renderizado
    <FeedContainerMain ref={feedRef}>
      {/* RENDERIZAÇÃO CONDICIONAL SEGURA */}
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
                              tagsFiltrosAtivos.filter((_, i) => i !== index)
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
                // --- ✨ WRAPPER DE ANIMAÇÃO (MICROZOOM) ✨ ---
                <div 
                  key={post.id} 
                  className="post-animado"
                  // DEFINIMOS O ESTADO INICIAL AQUI: Invisível, menor e rebaixado
                  style={{ opacity: 0, scale: 0.95, transform: "translateY(30px)" }}
                >
                  <Card post={post} />
                </div>
              ))}
            </CardGrid>
          ) : (
            <NoPostsContainer>
              {allPosts.length === 0 ? (
                <p>Nenhum post encontrado no sistema.</p>
              ) : (
                <>
                  <p>Nenhum post encontrado para essa busca.</p>
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