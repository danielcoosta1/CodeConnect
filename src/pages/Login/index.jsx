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
import { useEffect, useState } from "react";

import { CgArrowRight } from "react-icons/cg";
import { MdOutlineContentPaste } from "react-icons/md";

import { FiLoader } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { toastErro, toastSucesso } from "../../utils/toast";
import { useLocation, useNavigate } from "react-router-dom";
import { localStorageService } from "../../services/localStorageService";

const Login = () => {
  const { login, loadingAuth, errorAuth } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const origem = location.state?.from?.pathname || "/feed";

  // 2. Limpar erro antigo ao entrar na tela (Montagem)

  useEffect(() => {
    // 1. Verificamos se tem aviso de rota protegida
    if (location.state?.from) {
      // 2. Verificamos se foi um logout por querer
      const foiLogoutIntencional =
        localStorageService.ler("logout_intencional");

      // Limpa a URL (tira o state) para não ficar sujo
      navigate(location.pathname, { replace: true, state: {} });

      // 3. A LÓGICA:
      // Se NÃO foi intencional (ex: tentou entrar direto ou token venceu), mostra o erro.
      // Se FOI intencional, fica quietinho.
      if (!foiLogoutIntencional) {
        toastErro("Você precisa estar logado para acessar essa página.");
      }

      // 4. Limpa a bandeira para as próximas vezes
      localStorageService.remover("logout_intencional");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 3. Chamamos o login global
    const sucesso = await login(email, senha);

    // 4. Se retornou true, navegamos. Se false, o erro já apareceu via context.
    if (sucesso) {
      navigate(origem, { replace: true });
      toastSucesso("Login efetuado com sucesso!");
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
            {errorAuth && <p style={{ color: "red" }}>{errorAuth}</p>}
            <Button type="submit">
              <p>{loadingAuth ? "Carregando..." : "Entrar "}</p>
              {loadingAuth ? <FiLoader /> : <CgArrowRight />}
            </Button>
          </Form>

          <ContainerCadastro>
            <p style={{ fontSize: "1.2rem" }}>Ainda não possui conta?</p>
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
