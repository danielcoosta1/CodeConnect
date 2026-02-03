import {
  Button,
  CampoInput,
  ContainerContent,
  ContainerForm,
  ContainerImg,
  ContainerLogin,
  ContainerLoginSucesso,
  ContainerSucesso,
  ContainerWrapper,
  Form,
  LinkLogin,
  LinkLoginSucesso,
} from "./style";
import axios from "axios";
import { useState } from "react";

import { CgArrowRight } from "react-icons/cg";
import { FiLoader } from "react-icons/fi";
import { IoLogIn } from "react-icons/io5";

import imgCadastro from "./assets/img_cadastro.png";
import { toastSucesso } from "../../utils/toast";

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
      toastSucesso("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error(error);
      setErro(
        error.response?.data?.error ||
          "Não foi possível cadastrar. Tente novamente.",
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
          {cadastroSucesso ? (
            <ContainerSucesso>
              <p>Cadastro realizado com sucesso!</p>
              <ContainerLoginSucesso>
                Você já pode fazer{" "}
                <LinkLoginSucesso to="/login">
                  login <IoLogIn />
                </LinkLoginSucesso>
              </ContainerLoginSucesso>
            </ContainerSucesso>
          ) : (
            <Form onSubmit={handleSubmit}>
              <h1>Cadastro</h1>
              <p>Preencha seus dados</p>
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
              <ContainerLogin>
                <p> Já possui conta?</p>
                <LinkLogin to="/login">
                  Login <IoLogIn />
                </LinkLogin>
              </ContainerLogin>
            </Form>
          )}
        </ContainerForm>
      </ContainerContent>
    </ContainerWrapper>
  );
};

export default Cadastro;
