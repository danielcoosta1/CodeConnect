import { useNavigate, useSearchParams } from "react-router-dom";
import { toastErro, toastSucesso } from "../../utils/toast";
import { useAuth } from "../../hooks/useAuth";

import imgLogin from "../Login/assets/img_login.png";
import { useState } from "react";

import {
  Button,
  CampoInput,
  ContainerContent,
  ContainerForm,
  ContainerImg,
  ContainerWrapper,
  Form,
  BoxSucesso,
  TituloSucesso,
  TextoSucesso,
} from "../EsqueciSenha/style";
import { CgArrowRight } from "react-icons/cg";
import { FiLoader } from "react-icons/fi";

const RedefinirSenha = () => {
  const { resetarSenha, loadingAuth, errorAuth } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toastErro("Token de redefinição ausente. Solicite uma nova recuperação.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      toastErro("As senhas não coincidem!");
      return;
    }

    const resposta = await resetarSenha(token, novaSenha);

    if (resposta) {
      setSucesso(true);
      toastSucesso(
        "Senha redefinida com sucesso! Faça login com sua nova senha.",
      );

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  return (
    <ContainerWrapper $bgImage={imgLogin}>
      <ContainerContent>
        <ContainerImg>
          <img src={imgLogin} alt="imagem de redefinição de senha" />
        </ContainerImg>

        <ContainerForm>
          <h1>Criar nova senha</h1>
          <p className="subtitle">
            {sucesso
              ? "Tudo pronto! Redirecionando..."
              : "Digite sua nova senha abaixo."}
          </p>

          {!sucesso ? (
            <Form onSubmit={handleSubmit}>
              <CampoInput>
                <label htmlFor="novaSenha">Nova Senha</label>
                <input
                  type="password"
                  id="novaSenha"
                  placeholder="Mínimo 6 caracteres"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  disabled={loadingAuth}
                  required
                />
              </CampoInput>

              <CampoInput>
                <label htmlFor="confirmarSenha">Confirmar Nova Senha</label>
                <input
                  type="password"
                  id="confirmarSenha"
                  placeholder="Repita a nova senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  disabled={loadingAuth}
                  required
                />
              </CampoInput>

              {errorAuth && <p className="error-message">{errorAuth}</p>}

              <Button
                type="submit"
                disabled={loadingAuth || !novaSenha || !confirmarSenha}
              >
                {loadingAuth ? (
                  <>
                    Salvando... <FiLoader className="spin" />
                  </>
                ) : (
                  <>
                    Redefinir Senha <CgArrowRight />
                  </>
                )}
              </Button>
            </Form>
          ) : (
            <BoxSucesso>
              <TituloSucesso>Senha atualizada! 🔒</TituloSucesso>
              <TextoSucesso>
                Você já pode fazer login com sua <strong>nova senha</strong>.
              </TextoSucesso>
            </BoxSucesso>
          )}
        </ContainerForm>
      </ContainerContent>
    </ContainerWrapper>
  );
};

export default RedefinirSenha;
