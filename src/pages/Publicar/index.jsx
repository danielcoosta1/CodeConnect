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
  ContainerUploadImg,
  ContainerWrapper,
  Form,
  Img,
  LegendaImg,
} from "./style";

import { FaTrash } from "react-icons/fa";
import { MdPublish } from "react-icons/md";
import exemploImg from "./assets/exemplo.png";

import { useRef, useState } from "react";
import axios from "axios";

import { toastSucesso } from "../../utils/toast";
import { LuLoader } from "react-icons/lu";

const Publicar = () => {
  const inputRef = useRef();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageFileName, setImageFileName] = useState("");

  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

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
          <Img src={exemploImg} alt="Imagem de exemplo" />
        </ContainerImg>
        <ContainerButton>
          <ButtonUploadImg>Carregar Imagem</ButtonUploadImg>
          <LegendaImg>Legenda da Imagem</LegendaImg>
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
