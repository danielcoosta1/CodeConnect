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
  Form,
  Img,
  TagItem,
  TagList,
  TagRemoveButton,
} from "./style";

import { FaTrash } from "react-icons/fa";
import { MdPublish } from "react-icons/md";

import defaultImg from "./assets/exemplo.png";
import closeIcon from "./assets/icons/close.svg";

import uploadIcon from "./assets/icons/upload.svg";

import { useEffect, useRef, useState } from "react";

import { LuLoader } from "react-icons/lu";

import { IoMdClose } from "react-icons/io";
import { usePost } from "../../hooks/usePost";

const Publicar = () => {
  const {
    title,
    content,
    tags,
    tagInput,
    image,
    imageFileName,
    loading,
    atualizarDado,
    atualizarTagInput,
    adicionarTag,
    removerTag,
    definirImagem,
    removerImagem,
    limparFormulario,
    publicarProjeto,
  } = usePost();
  const inputRef = useRef();

  const [allTags, setAllTags] = useState([]);
  const [erroTags, setErroTags] = useState("");
  const [erroLocal, setErroLocal] = useState("");

  // Buscar todas as tags disponíveis ao montar o componente
  useEffect(() => {
    fetch("/mocks/tags.json")
      .then((response) => response.json())
      .then((data) => setAllTags(data))
      .catch((error) => console.error("Error fetching tags:", error));
  }, []);

  const lidarComUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (!file) return;

    const tiposAceitos = ["image/jpeg", "image/png", "image/gif"];
    if (!tiposAceitos.includes(file.type)) {
      setErroLocal(
        "Tipo de arquivo não suportado. Por favor, envie uma imagem."
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErroLocal("O tamanho do arquivo excede o limite de 5MB.");
      return;
    }

    const reader = new FileReader(); // Cria um leitor de arquivos

    // Quando o arquivo for carregado
    reader.onload = () => {
      const base64String = reader.result.split(",")[1]; // Extrai a parte base64 que seria o  src da imagem
      definirImagem(base64String, file.name);
    };

    reader.readAsDataURL(file); // Converte o arquivo para base64
  };

  const lidarComKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    const novaTag = tagInput.trim().toLowerCase();

    if (!novaTag)
      return setErroTags("Digite uma tag antes de pressionar Enter.");
    if (tags && tags.includes(novaTag))
      return setErroTags("Essa tag já foi adicionada.");
    if (tags.length >= 4)
      return setErroTags("Você não pode adicionar mais de 4 tags.");
    if (allTags.length > 0 && !allTags.includes(novaTag))
      return setErroTags("Tag inválida. Escolha uma tag válida");
    adicionarTag(novaTag);
    setErroTags("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    publicarProjeto();
  };

  return (
    <ContainerWrapper>
      <ContainerUploadImg>
        <ContainerImg>
          <Img
            src={image ? `data:image/png;base64,${image}` : defaultImg}
            alt="Imagem de exemplo"
          />
        </ContainerImg>
        <ContainerButton>
          <ButtonUploadImg onClick={() => inputRef.current.click()}>
            <p>Carregar Imagem </p>
            <input
              type="file"
              ref={inputRef}
              accept="image/"
              onChange={lidarComUpload}
              style={{ display: "none" }}
            />
            <img src={uploadIcon} alt="Ícone de upload" />
          </ButtonUploadImg>
          {image && (
            <ContainerSubtittle>
              <p>{imageFileName}</p>
              <img
                src={closeIcon}
                alt="Ícone de lixeira"
                onClick={removerImagem}
              />
            </ContainerSubtittle>
          )}
        </ContainerButton>
        {erroLocal && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {erroLocal}
          </p>
        )}
      </ContainerUploadImg>
      <ContainerForm>
        <h2>Novo Projeto </h2>
        <Form onSubmit={handleSubmit}>
          <CampoInput>
            <label>Título do projeto</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => atualizarDado("title", e.target.value)}
              required
            ></input>
          </CampoInput>
          <ContainerInputDescricao>
            <label>Descrição</label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => atualizarDado("content", e.target.value)}
              required
            />
          </ContainerInputDescricao>
          <ContainerTags>
            <label htmlFor="tags">Tags</label>
            <input
              id="tags"
              name="tags"
              type="text"
              placeholder="Digite e pressione Enter(Ex: JavaScript, React, Node.js)"
              value={tagInput}
              onChange={(e) => atualizarTagInput(e.target.value)}
              onKeyDown={lidarComKeyDown}
            />
            {erroTags && (
              <p style={{ color: "red", marginTop: "15px" }}>{erroTags}</p>
            )}
            {tags?.length > 0 && (
              <TagList>
                {tags.map((tag, index) => (
                  <TagItem key={index}>
                    <span>{tag}</span>
                    <TagRemoveButton>
                      <IoMdClose onClick={() => removerTag(index)} />
                    </TagRemoveButton>
                  </TagItem>
                ))}
              </TagList>
            )}
          </ContainerTags>

          {erroTags && <p style={{ color: "red" }}>{erroTags}</p>}
          <ContainerBotoes>
            <BotaoDescartar onClick={limparFormulario} type="button">
              Descartar <FaTrash />
            </BotaoDescartar>
            <BotaoPublicar type="submit">
              {!loading ? (
                <>
                  Publicar <MdPublish />
                </>
              ) : (
                <LuLoader />
              )}{" "}
            </BotaoPublicar>
          </ContainerBotoes>
        </Form>
      </ContainerForm>
    </ContainerWrapper>
  );
};

export default Publicar;
