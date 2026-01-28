import React, { useEffect, useRef, useState } from "react";
import {
  BotaoCancelar,
  BotaoSalvar,
  ButtonUploadImg,
  ContainerButton,
  ContainerUploadImg,
  Form,
  Img,
  InputGroup,
  ModalContainer,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "./style";
import { useAuth } from "../../hooks/useAuth";
import { FaTimes, FaUserCircle } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
import { toastErro, toastSucesso } from "../../utils/toast";

const ModalEditarPerfil = ({ isOpen, onClose }) => {
  // 2. PEGANDO OS DADOS E A FUNÇÃO DIRETO DA FONTE
  // 'user' serve para preencher os campos.
  // 'atualizarPerfilNoBanco' serve para salvar no Backend.
  const { user, atualizarPerfilNoBanco } = useAuth();

  const inputRef = useRef();

  // Estados locais dos inputs do formulário
  const [nome, setNome] = useState("");
  const [funcao, setFuncao] = useState("");
  const [bio, setBio] = useState("");
  const [imagem, setImagem] = useState("");
  const [loading, setLoading] = useState(false);
  const [localErro, setLocalErro] = useState("");

  // 3. EFEITO INTELIGENTE: Preenche o formulário assim que o modal abrir
  useEffect(() => {
    if (user && isOpen) {
      setNome(user.nome || "");
      setFuncao(user.funcao || "");
      setBio(user.bio || "");
      setImagem(user.imagem || "");
    }
  }, [user, isOpen]);

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;

    const tiposAceitos = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!tiposAceitos.includes(file.type)) {
      setLocalErro(
        "Tipo de arquivo não suportado. Por favor, envie uma imagem.",
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB
      setLocalErro("O tamanho do arquivo excede o limite de 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setImagem(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Chama a função que criamos no AuthProvider
      await atualizarPerfilNoBanco({ nome, funcao, bio, imagem });
      toastSucesso("Perfil atualizado com sucesso!");
      onClose(); // Se deu tudo certo, fecha o modal sozinho
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toastErro("Erro ao atualizar o perfil. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Se o interruptor estiver desligado, não desenha nada.
  if (!isOpen) return null;

  return (
    <ModalContainer>
      <ModalContent>
        <ModalHeader>
          <h3>Editar Perfil</h3>
          <button type="button" onClick={onClose} disabled={loading}>
            <FaTimes />
          </button>
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ContainerUploadImg>
            {imagem ? (
              <Img
                src={`data:image/png;base64,${imagem}`}
                alt="Imagem de perfil"
              />
            ) : (
              <FaUserCircle size={150} color="#888888" />
            )}

            <ContainerButton>
              <ButtonUploadImg
                type="button"
                onClick={() => inputRef.current.click()}
              >
                <p>Carregar nova foto</p>
                <input
                  type="file"
                  accept="image/"
                  style={{ display: "none" }}
                  ref={inputRef}
                  onChange={handleImageChange}
                />
                <FaUpload />
              </ButtonUploadImg>
            </ContainerButton>
          </ContainerUploadImg>
          <InputGroup>
            <label>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              disabled={loading}
            />
          </InputGroup>

          <InputGroup>
            <label>Função / Cargo</label>
            <input
              type="text"
              value={funcao}
              onChange={(e) => setFuncao(e.target.value)}
              disabled={loading}
              placeholder="Desenvolvedor Front-End"
            />
          </InputGroup>

          <InputGroup>
            <label>Bio</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          </InputGroup>

          <ModalFooter>
            <BotaoCancelar type="button" onClick={onClose} disabled={loading}>
              Cancelar
            </BotaoCancelar>
            <BotaoSalvar type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar Alterações"}
            </BotaoSalvar>
          </ModalFooter>
        </Form>
      </ModalContent>
    </ModalContainer>
  );
};

export default ModalEditarPerfil;
