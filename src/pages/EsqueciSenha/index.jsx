import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { CgArrowRight } from "react-icons/cg";

import { useAuth } from "../../hooks/useAuth";
import { toastSucesso } from "../../utils/toast";
import imgLogin from "../Login/assets/img_login.png";

import {
  Button,
  CampoInput,
  ContainerContent,
  ContainerForm,
  ContainerImg,
  ContainerWrapper,
  Form,
  LinkVoltar,
  BoxSucesso,
  TituloSucesso,
  TextoSucesso,
} from "./style";

const EsqueciSenha = () => {
  const { esqueciSenha, loadingAuth, errorAuth } = useAuth();
  const [sucesso, setSucesso] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resposta = await esqueciSenha(email);

    if (resposta) {
      setSucesso(true);
      toastSucesso(
        "E-mail de recuperação enviado! Verifique sua caixa de entrada e spam.",
      );
    }
  };

  return (
    <ContainerWrapper $bgImage={imgLogin}>
      <ContainerContent>
        <ContainerImg>
          <img src={imgLogin} alt="imagem de recuperação" />
        </ContainerImg>

        <ContainerForm>
          <LinkVoltar to="/login">
            <FaArrowLeft />  Login
          </LinkVoltar>

          <h1>Recuperar Senha</h1>
          <p className="subtitle">
            {sucesso
              ? "Confira sua caixa de entrada e spam."
              : "Digite seu e-mail e enviaremos um link de acesso."}
          </p>

          {!sucesso ? (
            <Form onSubmit={handleSubmit}>
              <CampoInput>
                <label htmlFor="email">E-mail de cadastro</label>
                <input
                  type="email"
                  id="email"
                  placeholder="exemplo@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loadingAuth}
                  required
                />
              </CampoInput>

              {errorAuth && <p className="error-message">{errorAuth}</p>}

              <Button type="submit" disabled={loadingAuth || !email}>
                {loadingAuth ? (
                  <>
                    Enviando... <FiLoader className="spin" />
                  </>
                ) : (
                  <>
                    Enviar Link <CgArrowRight />
                  </>
                )}
              </Button>
            </Form>
          ) : (
            <BoxSucesso>
              <TituloSucesso>E-mail a caminho! 🚀</TituloSucesso>
              <TextoSucesso>
                Enviamos as instruções para <strong>{email}</strong>.
              </TextoSucesso>
            </BoxSucesso>
          )}
        </ContainerForm>
      </ContainerContent>
    </ContainerWrapper>
  );
};

export default EsqueciSenha;
