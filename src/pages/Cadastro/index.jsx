import {
  Button,
  CampoInput,
  ContainerContent,
  ContainerForm,
  ContainerImg,
  ContainerLogin,
  ContainerVerificacao,
  ContainerWrapper,
  Form,
  LinkLogin,
  InputsCodigo,
} from "./style";

import { useState, useRef } from "react";
import { CgArrowRight } from "react-icons/cg";
import { FiLoader } from "react-icons/fi";
import { IoLogIn } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import imgCadastro from "./assets/img_cadastro.png";
import { toastSucesso } from "../../utils/toast";
import { useAuth } from "../../hooks/useAuth";

const Cadastro = () => {
  const {
    cadastro,
    loadingRegister,
    errorRegister,
    cadastroSucesso,
    emailCadastrado,
    verificarCodigo,
    loadingAuth,
  } = useAuth();

  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Estado para os 6 dígitos do código
  const [codigo, setCodigo] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]); // Ref para controlar o foco dos inputs

  // --- Lógica do Cadastro ---
  const handleSubmitCadastro = async (e) => {
    e.preventDefault();
    await cadastro(nome, email, senha);
  };

  // --- Lógica do Código de Verificação ---
  const handleCodigoChange = (index, value) => {
    // Permite apenas números
    if (isNaN(value)) return;

    const novoCodigo = [...codigo];
    novoCodigo[index] = value;
    setCodigo(novoCodigo);

    // Se digitou um número, pula automaticamente para o próximo quadrado
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleCodigoKeyDown = (index, e) => {
    // Se apagou e o quadrado está vazio, volta o foco para o anterior
    if (e.key === "Backspace" && codigo[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmitVerificacao = async (e) => {
    e.preventDefault();
    const codigoCompleto = codigo.join(""); // Junta ["1","2","3","4","5","6"] em "123456"

    if (codigoCompleto.length < 6) return;

    const sucesso = await verificarCodigo(emailCadastrado, codigoCompleto);
    console.log(emailCadastrado, codigoCompleto);
    if (sucesso) {
      navigate("/login"); // Redireciona para o login se o código estiver certo
    }
  };

  // ------------------------------------------

  return (
    <ContainerWrapper $bgImage={imgCadastro}>
      <ContainerContent>
        <ContainerImg>
          <img src={imgCadastro} alt="imagem de cadastro" border="0" />
        </ContainerImg>

        <ContainerForm>
          {cadastroSucesso ? (
            // --- NOVA TELA DE VERIFICAÇÃO ---
            <ContainerVerificacao>
              <p className="success-title">Verifique seu E-mail</p>
              <p className="verification-subtitle">
                Enviamos um código de 6 dígitos para{" "}
                <strong>{emailCadastrado}</strong>
              </p>

              <Form onSubmit={handleSubmitVerificacao}>
                <InputsCodigo>
                  {codigo.map((digito, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={digito}
                      onChange={(e) =>
                        handleCodigoChange(index, e.target.value)
                      }
                      onKeyDown={(e) => handleCodigoKeyDown(index, e)}
                      ref={(el) => (inputRefs.current[index] = el)} // Conecta o input ao Ref
                      disabled={loadingAuth}
                      required
                    />
                  ))}
                </InputsCodigo>

                <Button
                  type="submit"
                  disabled={loadingAuth || codigo.join("").length < 6}
                >
                  {loadingAuth ? (
                    <>
                      Verificando... <FiLoader className="spin" />
                    </>
                  ) : (
                    <>
                      Validar Código <CgArrowRight />
                    </>
                  )}
                </Button>
              </Form>

              <ContainerLogin>
                <p>O código não chegou?</p>
                <LinkLogin
                  to="#"
                  onClick={() => toastSucesso("Função de reenvio em breve!")}
                >
                  Reenviar código
                </LinkLogin>
              </ContainerLogin>
            </ContainerVerificacao>
          ) : (
            // --- FORMULÁRIO DE CADASTRO NORMAL ---
            <>
              <h1>Cadastro</h1>
              <p className="subtitle">Preencha seus dados para começar</p>

              <Form onSubmit={handleSubmitCadastro}>
                {/* ... teus inputs normais continuam aqui (nome, email, senha) ... */}
                <CampoInput>
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Digite seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    disabled={loadingRegister}
                    required
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
                    disabled={loadingRegister}
                    required
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
                    disabled={loadingRegister}
                    required
                  />
                </CampoInput>

                {errorRegister && (
                  <p className="error-message">{errorRegister}</p>
                )}

                <Button type="submit" disabled={loadingRegister}>
                  {loadingRegister ? (
                    <>
                      Cadastrando... <FiLoader className="spin" />
                    </>
                  ) : (
                    <>
                      Continuar <CgArrowRight />
                    </>
                  )}
                </Button>
              </Form>

              <ContainerLogin>
                <p>Já possui conta?</p>
                <LinkLogin to="/login">
                  Fazer Login <IoLogIn />
                </LinkLogin>
              </ContainerLogin>
            </>
          )}
        </ContainerForm>
      </ContainerContent>
    </ContainerWrapper>
  );
};

export default Cadastro;
