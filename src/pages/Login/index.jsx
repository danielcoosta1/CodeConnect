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
  LinkEsqueceuSenha,
  DividerContainer,
  DividerLine,
  DividerText,
  GoogleButtonWrapper,
} from "./style";
import imgLogin from "./assets/img_login.png";
import { useEffect, useState } from "react";

import { CgArrowRight } from "react-icons/cg";
import { MdOutlineContentPaste } from "react-icons/md";
import { FiLoader } from "react-icons/fi";

import { GoogleLogin } from "@react-oauth/google";

import { useAuth } from "../../hooks/useAuth";
import { toastErro, toastSucesso } from "../../utils/toast";
import { useLocation, useNavigate } from "react-router-dom";
import { localStorageService } from "../../services/localStorageService";

const Login = () => {
  const { login, loadingAuth, errorAuth, loginGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const origem = location.state?.from?.pathname || "/feed";

  useEffect(() => {
    if (location.state?.from) {
      const foiLogoutIntencional =
        localStorageService.ler("logout_intencional");

      navigate(location.pathname, { replace: true, state: {} });

      if (!foiLogoutIntencional) {
        toastErro("Você precisa estar logado para acessar essa página.");
      }

      localStorageService.remover("logout_intencional");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sucesso = await login(email, senha);

    if (sucesso) {
      navigate(origem, { replace: true });
      toastSucesso("Login efetuado com sucesso!");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const sucesso = await loginGoogle(credentialResponse.credential);

    if (sucesso) {
      navigate(origem, { replace: true });
      toastSucesso("Login efetuado com sucesso!");
    }
  };

  return (
    <ContainerWrapper $bgImage={imgLogin}>
      <ContainerContent>
        <ContainerImg>
          <img src={imgLogin} alt="imagem de login" />
        </ContainerImg>

        <ContainerForm>
          <h1>Login</h1>
          <p className="subtitle">Preencha seus dados para acessar</p>

          <Form onSubmit={handleSubmit}>
            <CampoInput>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loadingAuth}
                required
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
                disabled={loadingAuth}
                required
              />
            </CampoInput>

            <LinkEsqueceuSenha to="/esqueci-senha">
              Esqueci minha senha
            </LinkEsqueceuSenha>

            {errorAuth && <p className="error-message">{errorAuth}</p>}

            <Button type="submit" disabled={loadingAuth}>
              {loadingAuth ? (
                <>
                  Carregando... <FiLoader className="spin" />
                </>
              ) : (
                <>
                  Entrar <CgArrowRight />
                </>
              )}
            </Button>
          </Form>

          <DividerContainer>
            <DividerLine />
            <DividerText>ou entre com</DividerText>
            <DividerLine />
          </DividerContainer>

          <GoogleButtonWrapper>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toastErro("Falha ao se comunicar com o Google.")}
              shape="rectangular"
              theme="filled_black" /* Força o botão a ficar escuro */
              size="large"
              text="continue_with"
            />
          </GoogleButtonWrapper>

          <ContainerCadastro>
            <p>Ainda não possui conta?</p>
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
