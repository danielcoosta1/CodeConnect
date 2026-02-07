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
import { toastErro } from "../../utils/toast";
import { useLocation, useNavigate } from "react-router-dom";
import { localStorageService } from "../../services/localStorageService";

const Login = () => {
  const { login } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const origem = location.state?.from?.pathname || "/feed";

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
    setLoading(true);
    setErro("");

    try {
      await login(email, senha);
      navigate(origem, { replace: true }); //replace para não voltar para a página de login
    } catch (error) {
      setErro(
        error.response?.data?.error || "Erro ao fazer login.Tente Novamente",
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
