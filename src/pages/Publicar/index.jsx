import { useEffect, useRef, useState } from "react";
import { usePost } from "../../hooks/usePost";
import {
  BotaoDescartar,
  BotaoPublicar,
  ButtonUploadImg,
  CampoInput,
  ContainerBotoes,
  ContainerButton,
  ContainerForm,
  ContainerImg,
  ContainerInputDescricao,
  ContainerSubtittle,
  ContainerTags,
  ContainerUploadImg,
  ContainerWrapper,
  ErrorText,
  Form,
  Img,
  TagItem,
  TagList,
  TagRemoveButton,
  InputGroupRow,
  ContainerWrapperForm,
  ContainerWrapperCode,
  ContainerCode,
  GithubImportContainer,
  GithubInputWrapper,
  TypeSelectorContainer,
  TypeTab,
  EmptyImagePlaceholder, //  Importado o nosso novo componente
} from "./style";

import { FaGithub, FaTrash, FaUpload, FaRegImage } from "react-icons/fa";
import { MdPublish } from "react-icons/md";
import { LuLoader } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import MDEditor from "@uiw/react-md-editor";
import closeIcon from "./assets/icons/close.svg";
import ModalConfirmacao from "../../components/ModalConfirmacao";
import { useNavigate, useParams } from "react-router-dom";
import { toastSucesso } from "../../utils/toast";

const Publicar = () => {
  const {
    allTags,
    formData,
    loading,
    loadingEditPost,
    atualizarDado,
    atualizarTagInput,
    adicionarTag,
    removerTag,
    definirImagem,
    removerImagem,
    limparFormulario,
    publicarPost,
    postDetails,
    carregarPostPorId,
    prepararEdicao,
    atualizarPost,
    iniciarNovoPost,
    importarDadosDoGithub,
  } = usePost();

  const inputRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();

  const [loadingGithub, setLoadingGithub] = useState(false);
  const [modalPublicarIsOpen, setModalPublicarIsOpen] = useState(false);
  const [modalDescartarIsOpen, setModalDescartarIsOpen] = useState(false);
  const [erroTags, setErroTags] = useState("");
  const [erroLocal, setErroLocal] = useState("");

  const isSubmitting = loading || loadingEditPost;
  const isEditMode = !!id;

  const postType = formData.type;

  useEffect(() => {
    if (isEditMode) carregarPostPorId(id);
    else iniciarNovoPost();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEditMode]);

  useEffect(() => {
    if (isEditMode && postDetails?.id === id) prepararEdicao(postDetails);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, postDetails]);

  const lidarComUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (!file) return;

    const tiposAceitos = ["image/jpeg", "image/png", "image/gif"];
    if (!tiposAceitos.includes(file.type))
      return setErroLocal("Tipo não suportado.");
    if (file.size > 5 * 1024 * 1024) return setErroLocal("Máximo 5MB.");

    const reader = new FileReader();
    reader.onload = () => {
      definirImagem(reader.result.split(",")[1], file.name);
      setErroLocal("");
    };
    reader.readAsDataURL(file);
  };

  const lidarComKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const novaTag = formData.tagInput.trim().toLowerCase();
    if (!novaTag) return setErroTags("Digite uma tag.");
    if (formData.tags && formData.tags.includes(novaTag))
      return setErroTags("Tag já adicionada.");
    if (formData.tags.length >= 4) return setErroTags("Máximo 4 tags.");
    if (!allTags?.includes(novaTag)) return setErroTags("Tag inválida.");

    adicionarTag(novaTag);
    setErroTags("");
  };

  const tentarPublicar = (e) => {
    e.preventDefault();
    setModalPublicarIsOpen(true);
  };

  const confirmarPublicacao = async () => {
    const postData = {
      ...formData,
      projectUrl:
        formData.projectUrl?.trim() === "" ? null : formData.projectUrl,
      repoUrl: formData.repoUrl?.trim() === "" ? null : formData.repoUrl,
    };

    if (postData.type === "QUESTION") {
      postData.projectUrl = null;
      postData.repoUrl = null;
    }

    // 1. O Componente analisa o contexto do que está na tela
    const isQuestion = postData.type === "QUESTION";
    const nomeDaVertente = isQuestion ? "Dúvida" : "Projeto";
    const sufixoDeGenero = isQuestion ? "a" : "o"; // publicadA / publicadO

    if (isEditMode) {
      const sucesso = await atualizarPost(id, postData);
      if (sucesso) {
        // 2. Dispara o Toast perfeito!
        toastSucesso(
          `${nomeDaVertente} atualizad${sufixoDeGenero} com sucesso!`,
        );
        limparFormulario();
        navigate(`/post/${id}`);
      }
    } else {
      const sucesso = await publicarPost(postData);
      if (sucesso) {
        // 2. Dispara o Toast perfeito!
        toastSucesso(
          `${nomeDaVertente} publicad${sufixoDeGenero} com sucesso!`,
        );
        navigate("/feed");
      }
    }
  };

  return (
    <ContainerWrapper>
      <ModalConfirmacao
        isOpen={modalPublicarIsOpen}
        onClose={() => setModalPublicarIsOpen(false)}
        onConfirm={confirmarPublicacao}
        titulo={
          isEditMode
            ? "Salvar Alterações"
            : postType === "PROJECT"
              ? "Publicar Projeto"
              : "Publicar Dúvida"
        }
        mensagem={
          isEditMode
            ? "Salvar alterações?"
            : `Tudo pronto para publicar esta ${postType === "PROJECT" ? "vitrine" : "dúvida"}?`
        }
        textoConfirmar={isEditMode ? "Salvar" : "Publicar"}
      />

      <ModalConfirmacao
        isOpen={modalDescartarIsOpen}
        onClose={() => setModalDescartarIsOpen(false)}
        onConfirm={() => {
          limparFormulario();
          setErroLocal("");
          setErroTags("");
        }}
        titulo="Descartar Rascunho"
        mensagem="Tem certeza? Todos os dados preenchidos serão perdidos."
        textoConfirmar="Descartar"
        isDestructive={true}
      />

      <Form onSubmit={tentarPublicar}>
        {!isEditMode && (
          <TypeSelectorContainer>
            <TypeTab
              type="button"
              $active={postType === "PROJECT"}
              onClick={() => atualizarDado("type", "PROJECT")}
            >
              🚀 Compartilhar Projeto
            </TypeTab>
            <TypeTab
              type="button"
              $active={postType === "QUESTION"}
              onClick={() => atualizarDado("type", "QUESTION")}
            >
              💡 Tirar uma Dúvida
            </TypeTab>
          </TypeSelectorContainer>
        )}

        <ContainerWrapperForm>
          <ContainerUploadImg>
            {postType === "QUESTION" && (
              <label
                style={{
                  color: "#fff",
                  marginBottom: "0.8rem",
                  display: "block",
                  fontSize: "1.4rem",
                }}
              >
                Anexar Print (Opcional)
              </label>
            )}

            <ContainerImg $isQuestion={postType === "QUESTION"}>
              {formData.image ? (
                <Img
                  $isQuestion={postType === "QUESTION"}
                  src={`data:image/png;base64,${formData.image}`}
                  alt="Preview"
                />
              ) : (
                <EmptyImagePlaceholder>
                  <FaRegImage />
                  <p>
                    {postType === "PROJECT"
                      ? "Nenhuma capa selecionada"
                      : "Nenhum print anexado"}
                  </p>
                </EmptyImagePlaceholder>
              )}
            </ContainerImg>

            <ContainerButton>
              <ButtonUploadImg
                type="button"
                onClick={() => inputRef.current.click()}
              >
                <p>
                  {postType === "PROJECT" ? "Carregar Imagem" : "Anexar Imagem"}
                </p>
                <input
                  type="file"
                  ref={inputRef}
                  accept="image/*"
                  onChange={lidarComUpload}
                  style={{ display: "none" }}
                />
                <FaUpload />
              </ButtonUploadImg>
              {formData.image && (
                <ContainerSubtittle>
                  <p>{formData.imageFileName}</p>
                  <img src={closeIcon} alt="Remover" onClick={removerImagem} />
                </ContainerSubtittle>
              )}
            </ContainerButton>
            {erroLocal && <ErrorText>{erroLocal}</ErrorText>}
          </ContainerUploadImg>

          <ContainerForm>
            <h2>
              {isEditMode
                ? "Modo Edição"
                : postType === "PROJECT"
                  ? "Detalhes do Projeto"
                  : "Descreva seu Problema"}
            </h2>

            {postType === "PROJECT" && (
              <GithubImportContainer>
                <label htmlFor="repoUrl">
                  <FaGithub /> Importar do GitHub
                </label>
                <GithubInputWrapper>
                  <input
                    type="url"
                    id="repoUrl"
                    name="repoUrl"
                    placeholder="https://github.com/usuario/repo"
                    value={formData.repoUrl || ""}
                    onChange={(e) => atualizarDado("repoUrl", e.target.value)}
                    disabled={loading || loadingGithub}
                  />
                  <button
                    type="button"
                    disabled={loading || loadingGithub || !formData.repoUrl}
                    onClick={async () => {
                      setLoadingGithub(true);
                      await importarDadosDoGithub(formData.repoUrl);
                      setLoadingGithub(false);
                    }}
                  >
                    {loadingGithub ? (
                      <>
                        <LuLoader className="spin" /> Buscando...
                      </>
                    ) : (
                      "Importar"
                    )}
                  </button>
                </GithubInputWrapper>
              </GithubImportContainer>
            )}

            <CampoInput>
              <label htmlFor="title">
                {postType === "PROJECT"
                  ? "Título do Projeto"
                  : "Resumo da Dúvida"}
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder={
                  postType === "PROJECT"
                    ? "Ex: Meu Portfólio Pessoal"
                    : "Ex: Erro ao renderizar componente React"
                }
                value={formData.title}
                onChange={(e) => atualizarDado("title", e.target.value)}
                disabled={loading}
                required
              />
            </CampoInput>

            {postType === "PROJECT" && (
              <InputGroupRow>
                <CampoInput>
                  <label htmlFor="projectUrl">Link do Deploy</label>
                  <input
                    type="url"
                    id="projectUrl"
                    name="projectUrl"
                    placeholder="https://meusite.com"
                    value={formData.projectUrl || ""}
                    onChange={(e) =>
                      atualizarDado("projectUrl", e.target.value)
                    }
                    disabled={loading}
                  />
                </CampoInput>
              </InputGroupRow>
            )}

            <ContainerInputDescricao>
              <label htmlFor="content">
                {postType === "PROJECT"
                  ? "Descrição do Projeto"
                  : "Detalhes (O que já tentou?)"}
              </label>
              <textarea
                id="content"
                name="content"
                placeholder={
                  postType === "PROJECT"
                    ? "Conte um pouco sobre o projeto..."
                    : "Descreva passo a passo o que aconteceu..."
                }
                value={formData.content}
                onChange={(e) => atualizarDado("content", e.target.value)}
                disabled={loading}
                required
              />
            </ContainerInputDescricao>

            <ContainerTags>
              <label htmlFor="tags">Tags</label>
              <input
                id="tags"
                name="tags"
                type="text"
                placeholder="Digite e pressione Enter (ex: React, Bug)"
                value={formData.tagInput}
                onChange={(e) => atualizarTagInput(e.target.value)}
                onKeyDown={lidarComKeyDown}
                disabled={loading}
              />
              {erroTags && <ErrorText>{erroTags}</ErrorText>}
              {formData.tags?.length > 0 && (
                <TagList>
                  {formData.tags.map((tag, index) => (
                    <TagItem key={index}>
                      <span>{tag}</span>
                      <TagRemoveButton
                        type="button"
                        onClick={() => removerTag(index)}
                      >
                        <IoMdClose />
                      </TagRemoveButton>
                    </TagItem>
                  ))}
                </TagList>
              )}
            </ContainerTags>
          </ContainerForm>
        </ContainerWrapperForm>

        <ContainerWrapperCode>
          <ContainerCode>
            <label htmlFor="codeContent">
              {postType === "PROJECT"
                ? "README.md (Opcional)"
                : "Trecho de Código (Opcional)"}
            </label>
            <div data-color-mode="dark">
              <MDEditor
                id="codeContent"
                value={formData.codeContent || ""}
                onChange={(value) => atualizarDado("codeContent", value || "")}
                height={postType === "PROJECT" ? 400 : 250}
                preview="edit"
              />
            </div>
          </ContainerCode>
        </ContainerWrapperCode>

        <ContainerBotoes>
          <BotaoDescartar
            type="button"
            onClick={() => setModalDescartarIsOpen(true)}
            disabled={isSubmitting}
          >
            Descartar <FaTrash />
          </BotaoDescartar>
          <BotaoPublicar type="submit" disabled={isSubmitting}>
            {!isSubmitting ? (
              <>
                {isEditMode ? "Salvar alterações" : "Publicar"} <MdPublish />
              </>
            ) : (
              <>
                {isEditMode ? "Salvando..." : "Publicando..."}{" "}
                <LuLoader className="spin" />
              </>
            )}
          </BotaoPublicar>
        </ContainerBotoes>
      </Form>
    </ContainerWrapper>
  );
};

export default Publicar;
