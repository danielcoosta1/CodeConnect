import {
  Button,
  CampoInput,
  ContainerCadastro,
  ContainerContent,
  ContainerForm,
  ContainerImg,
  ContainerWrapper,
  Form,
  LinkCadastro,
} from "./style";
import imgLogin from "./assets/img_login.png";
import { useState } from "react";

import { CgArrowRight } from "react-icons/cg";
import { MdOutlineContentPaste } from "react-icons/md";

import { FiLoader } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");

    try {
      await login(email, senha);
    } catch (error) {
      setErro(
        error.response?.data?.error || "Erro ao fazer login.Tente Novamente"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContainerWrapper>
      <ContainerContent>
        <ContainerImg>
          <img src={imgLogin} alt="imagem de login" border="0" />
        </ContainerImg>

        <ContainerForm>
          <h1>Login</h1>
          <p>Preencha seus dados</p>
          <Form onSubmit={handleSubmit}>
            <CampoInput>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
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
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </CampoInput>
            {erro && <p style={{ color: "red" }}>{erro}</p>}
            <Button type="submit">
              <p>{loading ? "Carregando..." : "Entrar "}</p>
              {loading ? <FiLoader /> : <CgArrowRight />}
            </Button>
          </Form>

          <ContainerCadastro>
            <p style={{ fontSize: "14px" }}>Ainda não possui conta?</p>
            <LinkCadastro to="/cadastro">
              Crie seu cadastro! <MdOutlineContentPaste />
            </LinkCadastro>
          </ContainerCadastro>
        </ContainerForm>
      </ContainerContent>
    </ContainerWrapper>
  );
};

export default Login;
