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

import { useState } from "react";
import { CgArrowRight } from "react-icons/cg";
import { FiLoader } from "react-icons/fi";
import { IoLogIn } from "react-icons/io5";

import imgCadastro from "./assets/img_cadastro.png";
import { toastSucesso } from "../../utils/toast";
import { useAuth } from "../../hooks/useAuth";

const Cadastro = () => {
  const { cadastro, loadingRegister, errorRegister, cadastroSucesso } = useAuth();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sucesso = await cadastro(nome, email, senha);
    if (sucesso) {
      toastSucesso("Cadastro efetuado com sucesso!");
    }
  };

  return (
    // Passamos a imagem para o fundo dinâmico no Mobile
    <ContainerWrapper $bgImage={imgCadastro}>
      <ContainerContent>
        <ContainerImg>
          <img src={imgCadastro} alt="imagem de cadastro" border="0" />
        </ContainerImg>
        
        <ContainerForm>
          {cadastroSucesso ? (
            <ContainerSucesso>
              <p className="success-title">Cadastro realizado com sucesso!</p>
              <ContainerLoginSucesso>
                <p>Você já pode acessar sua conta</p>
                <LinkLoginSucesso to="/login">
                  Fazer Login <IoLogIn />
                </LinkLoginSucesso>
              </ContainerLoginSucesso>
            </ContainerSucesso>
          ) : (
            <>
              <h1>Cadastro</h1>
              <p className="subtitle">Preencha seus dados para começar</p>
              
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
                
                {errorRegister && <p className="error-message">{errorRegister}</p>}
                
                <Button type="submit" disabled={loadingRegister}>
                  {loadingRegister ? (
                    <>
                      Cadastrando... <FiLoader className="spin" />
                    </>
                  ) : (
                    <>
                      Cadastrar <CgArrowRight />
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