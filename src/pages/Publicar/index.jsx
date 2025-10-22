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
  ContainerTags,
  ContainerUploadImg,
  ContainerWrapper,
  Form,
  Img,
} from "./style";

import { FaTrash } from "react-icons/fa";
import { MdPublish } from "react-icons/md";

import defaultImg from "./assets/exemplo.png";
import trashIcon from "./assets/icons/trash.svg";
import uploadIcon from "./assets/icons/upload.svg";

import { useRef, useState } from "react";
import axios from "axios";

import { toastSucesso } from "../../utils/toast";
import { LuLoader } from "react-icons/lu";

const Publicar = () => {
  const inputRef = useRef();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const [image, setImage] = useState(null);
  const [imageFileName, setImageFileName] = useState("");

  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const lidarComUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (!file) return;

    const tiposAceitos = ["image/jpeg", "image/png", "image/gif"];
    if (!tiposAceitos.includes(file.type)) {
      setErro("Tipo de arquivo não suportado. Por favor, envie uma imagem.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErro("O tamanho do arquivo excede o limite de 5MB.");
      return;
    }

    const reader = new FileReader(); // Cria um leitor de arquivos

    // Quando o arquivo for carregado
    reader.onload = () => {
      const base64String = reader.result.split(",")[1]; // Extrai a parte base64 que seria o  src da imagem
      setImage(base64String); // Armazena a imagem em base64 no estado
      setImageFileName(file.name); // Armazena o nome do arquivo no estado
    };

    reader.readAsDataURL(file); // Converte o arquivo para base64
  };

  const limparCampos = () => {
    setTitle("");
    setContent("");
    setImage(null);
    setImageFileName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");

    try {
      await axios.post("http://localhost:51213/api/posts", {
        title,
        content,
        imageFileName,
        image,
        tags,
      });
      toastSucesso("Post publicado com sucesso!");
      limparCampos();
    } catch (error) {
      console.error(error);
      setErro(
        error.response?.data?.error ||
          "Não foi possível publicar. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContainerWrapper>
      <ContainerUploadImg>
        <ContainerImg>
          <Img src={image || defaultImg} alt="Imagem de exemplo" />
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
          {image && <p>{imageFileName}</p>}
        </ContainerButton>
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
              onChange={(e) => setTitle(e.target.value)}
              required
            ></input>
          </CampoInput>
          <ContainerInputDescricao>
            <label>Descrição</label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </ContainerInputDescricao>
          <ContainerTags>
            <label>Tags</label>
            <input
              type="text"
              placeholder="Digite e pressione Enter(Ex: JavaScript, React, Node.js)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </ContainerTags>
          {erro && <p style={{ color: "red" }}>{erro}</p>}
          <ContainerBotoes>
            <BotaoDescartar onClick={limparCampos}>
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
