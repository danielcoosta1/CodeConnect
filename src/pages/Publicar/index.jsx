import {
  BotaoDescartar,
  BotaoPublicar,
  ButtonCarregarImg,
  CampoInput,
  ContainerBotoes,
  ContainerForm,
  ContainerImg,
  ContainerInputDescricao,
  ContainerWrapper,
  Form,
  Img,
  LegendaImg,
} from "./style";
import exemploImg from "./assets/exemplo.png";
import { useState } from "react";

const Publicar = () => {
  const [title, setTittle] = useState("");
  const [erro, setErro] = useState("");
  const [cadastroSucesso, setCadastroSucesso] = useState(false);

  const [loading, setLoading] = useState(false);

  return (
    <ContainerWrapper>
      <ContainerImg>
        <Img src={exemploImg} alt="Imagem de exemplo" />
        <ButtonCarregarImg>Carregar Imagem</ButtonCarregarImg>
        <LegendaImg>Legenda da Imagem</LegendaImg>
      </ContainerImg>
      <ContainerForm>
        <h2>Novo Projeto </h2>
        <Form>
          <CampoInput>
            <label>Nome do projeto</label>
            <input></input>
          </CampoInput>
          <ContainerInputDescricao>
            <label>Descrição</label>
            <textarea />
          </ContainerInputDescricao>
          <ContainerBotoes>
            <BotaoDescartar>Descartar</BotaoDescartar>
            <BotaoPublicar>Publicar</BotaoPublicar>
          </ContainerBotoes>
        </Form>
      </ContainerForm>
    </ContainerWrapper>
  );
};

export default Publicar;
