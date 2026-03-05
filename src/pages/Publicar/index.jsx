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
} from "./style";

import { FaTrash, FaUpload } from "react-icons/fa";
import { MdPublish } from "react-icons/md";
import { LuLoader } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import MDEditor from "@uiw/react-md-editor";
import defaultImg from "./assets/exemplo.png";
import closeIcon from "./assets/icons/close.svg";
import ModalConfirmacao from "../../components/ModalConfirmacao";
import { useNavigate, useParams } from "react-router-dom";

const Publicar = () => {
  const {
    formData,
    loading,
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
  } = usePost();

  const inputRef = useRef();

  // Estados dos Modais
  const [modalPublicarIsOpen, setModalPublicarIsOpen] = useState(false);
  const [modalDescartarIsOpen, setModalDescartarIsOpen] = useState(false);

  const [erroTags, setErroTags] = useState("");
  const [erroLocal, setErroLocal] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // EFEITOS
  useEffect(() => {
    if (isEditMode) {
      carregarPostPorId(id);
    } else {
      iniciarNovoPost(); // Se não for modo edição, iniciamos um novo post para garantir que o estado do formulário esteja limpo e pronto para receber os dados do novo post. Isso é importante para evitar que dados de um post anterior (se o usuário veio de uma edição ou visualização) permaneçam no formulário quando ele quer criar um novo post.
    }
  }, [id, isEditMode]);

  useEffect(() => {
    if (isEditMode && postDetails?.id === id) {
      prepararEdicao(postDetails);
    }
  }, [isEditMode, postDetails]);

  // MANUSEIO DE IMAGEM
  const lidarComUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (!file) return;

    const tiposAceitos = ["image/jpeg", "image/png", "image/gif"];
    if (!tiposAceitos.includes(file.type)) {
      setErroLocal("Tipo de arquivo não suportado. Envie uma imagem.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErroLocal("O tamanho do arquivo excede o limite de 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(",")[1];
      definirImagem(base64String, file.name);
      setErroLocal("");
    };
    reader.readAsDataURL(file);
  };

  // MANUSEIO DE TAGS
  const lidarComKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    const novaTag = formData.tagInput.trim().toLowerCase();

    if (!novaTag)
      return setErroTags("Digite uma tag antes de pressionar Enter.");
    if (formData.tags && formData.tags.includes(novaTag))
      return setErroTags("Essa tag já foi adicionada.");
    if (formData.tags.length >= 4)
      return setErroTags("Você não pode adicionar mais de 4 tags.");
    if (formData.allTags.length > 0 && !formData.allTags.includes(novaTag))
      return setErroTags("Tag inválida. Escolha uma tag válida");

    adicionarTag(novaTag);
    setErroTags("");
  };

  // PUBLICAÇÃO E EDIÇÃO
  const tentarPublicar = (e) => {
    e.preventDefault();
    setModalPublicarIsOpen(true);
  };

  const confirmarPublicacao = async () => {
    // 1. Pegamos tudo do formData e só substituímos o que precisa de tratamento especial
    const postData = {
      ...formData,
      projectUrl:
        formData.projectUrl?.trim() === "" ? null : formData.projectUrl, // Se for string vazia, vira null. Senão, mantém o valor. é uma forma de garantir que a API receba null em vez de string vazia, caso o usuário limpe o campo. O mesmo vale para repoUrl. O zod quebra ao receber string vazia, mas aceita null ou string com valor. Então garantimos que seja null quando vazio. Assim, a validação do zod passa e a API recebe o formato esperado.
      repoUrl: formData.repoUrl?.trim() === "" ? null : formData.repoUrl,
    };

    // 2. Disparamos para a API
    if (isEditMode) {
      const sucesso = await atualizarPost(id, postData);

      if (sucesso) {
        limparFormulario();
        navigate(`/post/${id}`);
      }
    } else {
      const sucesso = await publicarPost(postData);

      if (sucesso) {
        navigate("/feed");
      }
    }

    setErroTags("");
    setErroLocal("");
  };

  const confirmarDescarte = () => {
    limparFormulario();
    setErroLocal("");
    setErroTags("");
  };

  return (
    <ContainerWrapper>
      <ModalConfirmacao
        isOpen={modalPublicarIsOpen}
        onClose={() => setModalPublicarIsOpen(false)}
        onConfirm={confirmarPublicacao}
        titulo={isEditMode ? "Salvar Alterações" : "Publicar Projeto"}
        mensagem={
          isEditMode
            ? "Tem certeza que deseja salvar as alterações neste projeto?"
            : "Tudo pronto? Tem certeza que deseja publicar este projeto para a comunidade?"
        }
        textoConfirmar={isEditMode ? "Salvar" : "Publicar"}
      />

      <ModalConfirmacao
        isOpen={modalDescartarIsOpen}
        onClose={() => setModalDescartarIsOpen(false)}
        onConfirm={confirmarDescarte}
        titulo="Descartar Projeto"
        mensagem="Tem certeza? Todos os dados preenchidos serão perdidos e não poderão ser recuperados."
        textoConfirmar="Descartar"
        isDestructive={true}
      />

      {/* AQUI COMEÇA O FORMULÁRIO. TUDO ENVOLVIDO POR <Form> PARA ENVIAR CORRETAMENTE */}
      <Form onSubmit={tentarPublicar}>
        {/* PARTE DE CIMA: IMAGEM + DADOS BÁSICOS */}
        <ContainerWrapperForm>
          {/* LADO ESQUERDO */}
          <ContainerUploadImg>
            <ContainerImg>
              <Img
                src={
                  formData.image
                    ? `data:image/png;base64,${formData.image}`
                    : defaultImg
                }
                alt="Preview do projeto"
              />
            </ContainerImg>

            <ContainerButton>
              <ButtonUploadImg
                type="button"
                onClick={() => inputRef.current.click()}
              >
                <p>Carregar Imagem</p>
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
                  <img
                    src={closeIcon}
                    alt="Remover imagem"
                    onClick={removerImagem}
                  />
                </ContainerSubtittle>
              )}
            </ContainerButton>
            {erroLocal && <ErrorText>{erroLocal}</ErrorText>}
          </ContainerUploadImg>

          {/* LADO DIREITO */}
          <ContainerForm>
            <h2>{isEditMode ? "Editar Projeto" : "Novo Projeto"}</h2>
            <CampoInput>
              <label htmlFor="title">Título do Projeto</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Ex: Meu Portfólio Pessoal"
                value={formData.title}
                onChange={(e) => atualizarDado("title", e.target.value)}
                disabled={loading}
                required
              />
            </CampoInput>
            <InputGroupRow>
              <CampoInput>
                <label htmlFor="projectUrl">Deploy</label>
                <input
                  type="url"
                  id="projectUrl"
                  name="projectUrl"
                  placeholder="https://meusite.com"
                  value={formData.projectUrl || ""}
                  onChange={(e) => atualizarDado("projectUrl", e.target.value)}
                  disabled={loading}
                />
              </CampoInput>

              <CampoInput>
                <label htmlFor="repoUrl">Repositório</label>
                <input
                  type="url"
                  id="repoUrl"
                  name="repoUrl"
                  placeholder="https://github.com/usuario/repo"
                  value={formData.repoUrl || ""}
                  onChange={(e) => atualizarDado("repoUrl", e.target.value)}
                  disabled={loading}
                />
              </CampoInput>
            </InputGroupRow>

            {/* Aqui fica apenas a Descrição (Texto) */}
            <ContainerInputDescricao>
              <label htmlFor="content">Descrição do Projeto</label>
              <textarea
                id="content"
                name="content"
                placeholder="Conte um pouco sobre o projeto"
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
                placeholder="Digite e pressione Enter (Ex: React, Node.js)"
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

        {/* PARTE DE BAIXO: O CÓDIGO FONTE (MARKDOWN) */}
        <ContainerWrapperCode>
          <ContainerCode>
            <label htmlFor="codeContent">Readme - MarkDown</label>
            <div data-color-mode="dark">
              <MDEditor
                id="codeContent"
                value={formData.codeContent || ""}
                onChange={(value) => atualizarDado("codeContent", value || "")}
                height={400}
                preview="edit"
              />
            </div>
          </ContainerCode>
        </ContainerWrapperCode>

        {/* BOTÕES NO FINAL DO FORMULÁRIO */}
        <ContainerBotoes>
          <BotaoDescartar
            type="button"
            onClick={() => setModalDescartarIsOpen(true)}
            disabled={loading}
          >
            Descartar <FaTrash />
          </BotaoDescartar>

          <BotaoPublicar type="submit" disabled={loading}>
            {!loading ? (
              <>
                {isEditMode ? "Salvar" : "Publicar"} <MdPublish />
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
