import {
  Button,
  CampoInput,
  ContainerContent,
  ContainerForm,
  ContainerImg,
  ContainerSucesso,
  ContainerWrapper,
  Form,
  LinkLogin,
} from "./style";
import axios from "axios";
import { useState } from "react";

import { CgArrowRight } from "react-icons/cg";
import { FiLoader } from "react-icons/fi";


import imgCadastro from "./assets/img_cadastro.png";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erro, setErro] = useState("");
  const [cadastroSucesso, setCadastroSucesso] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");

    try {
      await axios.post("http://localhost:51213/api/auth/cadastro", {
        nome,
        email,
        senha,
      });
      setCadastroSucesso(true);
    } catch (error) {
      console.error(error);
      setErro(
        error.response?.data?.error ||
          "Não foi possível cadastrar. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContainerWrapper>
      <ContainerContent>
        <ContainerImg>
          <img src={imgCadastro} alt="imagem de cadastro" border="0" />
        </ContainerImg>
        {}
        <ContainerForm>
          <h1>Cadastro</h1>
          {!cadastroSucesso ? <p>Preencha seus dados</p> : null}
          {cadastroSucesso ? (
            <ContainerSucesso>
              <p>Cadastro realizado com sucesso!</p>
              <p>
                Você já pode fazer <LinkLogin to="/login">login</LinkLogin>
              </p>
            </ContainerSucesso>
          ) : (
            <Form onSubmit={handleSubmit}>
              <CampoInput>
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Digite seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </CampoInput>
              <CampoInput>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </CampoInput>
              <CampoInput>
                <label htmlFor="senha">Senha</label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </CampoInput>
              {erro && <p style={{ color: "red" }}>{erro}</p>}
              <Button type="submit">
                <p>{loading ? "Carregando..." : "Cadastrar "}</p>
                {loading ? <FiLoader /> : <CgArrowRight />}
              </Button>
            </Form>
          )}
        </ContainerForm>
      </ContainerContent>
    </ContainerWrapper>
  );
};

export default Cadastro;
