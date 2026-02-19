import { useRef, useState } from "react";
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
} from "./style";

import { FaTrash, FaUpload } from "react-icons/fa";
import { MdPublish } from "react-icons/md";
import { LuLoader } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";

import defaultImg from "./assets/exemplo.png";
import closeIcon from "./assets/icons/close.svg";

const Publicar = () => {
  const {
    title,
    content,
    allTags,
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
    publicarPost,
  } = usePost();
  
  const inputRef = useRef();

  const [erroTags, setErroTags] = useState("");
  const [erroLocal, setErroLocal] = useState("");

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

  const lidarComKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    const novaTag = tagInput.trim().toLowerCase();

    if (!novaTag) return setErroTags("Digite uma tag antes de pressionar Enter.");
    if (tags && tags.includes(novaTag)) return setErroTags("Essa tag já foi adicionada.");
    if (tags.length >= 4) return setErroTags("Você não pode adicionar mais de 4 tags.");
    if (allTags.length > 0 && !allTags.includes(novaTag))
      return setErroTags("Tag inválida. Escolha uma tag válida");
    
    adicionarTag(novaTag);
    setErroTags("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await publicarPost();
    setErroTags("");
    setErroLocal("");
  };

  return (
    <ContainerWrapper>
      <ContainerUploadImg>
        <ContainerImg>
          <Img
            src={image ? `data:image/png;base64,${image}` : defaultImg}
            alt="Preview do projeto"
          />
        </ContainerImg>
        
        <ContainerButton>
          <ButtonUploadImg type="button" onClick={() => inputRef.current.click()}>
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
          
          {image && (
            <ContainerSubtittle>
              <p>{imageFileName}</p>
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

      <ContainerForm>
        <h2>Novo Projeto</h2>
        
        <Form onSubmit={handleSubmit}>
          <CampoInput>
            <label htmlFor="title">Título do projeto</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => atualizarDado("title", e.target.value)}
              disabled={loading}
              required
            />
          </CampoInput>
          
          <ContainerInputDescricao>
            <label htmlFor="content">Descrição</label>
            <textarea
              id="content"
              name="content"
              value={content}
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
              value={tagInput}
              onChange={(e) => atualizarTagInput(e.target.value)}
              onKeyDown={lidarComKeyDown}
              disabled={loading}
            />
            {erroTags && <ErrorText>{erroTags}</ErrorText>}
            
            {tags?.length > 0 && (
              <TagList>
                {tags.map((tag, index) => (
                  <TagItem key={index}>
                    <span>{tag}</span>
                    <TagRemoveButton type="button" onClick={() => removerTag(index)}>
                      <IoMdClose />
                    </TagRemoveButton>
                  </TagItem>
                ))}
              </TagList>
            )}
          </ContainerTags>

          <ContainerBotoes>
            <BotaoDescartar 
              onClick={limparFormulario} 
              type="button" 
              disabled={loading}
            >
              Descartar <FaTrash />
            </BotaoDescartar>
            
            <BotaoPublicar type="submit" disabled={loading}>
              {!loading ? (
                <>
                  Publicar <MdPublish />
                </>
              ) : (
                <>
                  Publicando... <LuLoader className="spin" />
                </>
              )}
            </BotaoPublicar>
          </ContainerBotoes>
        </Form>
      </ContainerForm>
    </ContainerWrapper>
  );
};

export default Publicar;