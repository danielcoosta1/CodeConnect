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

const ModalEditarPerfil = ({ isOpen, onClose }) => {
  const {
    // Dados do Formulário (Vêm do Reducer)
    nome,
    sobrenome,
    usuario,
    funcao,
    bio,
    imagem,

    // Estados de Interface
    loadingUpdate,

    // Funções (Ações)
    iniciarEdicao,
    atualizarDado,
    definirImagemForm,
    salvarPerfil,
  } = useAuth();

  const inputRef = useRef();

  // Estados locais dos inputs do formulário

  const [localErro, setLocalErro] = useState("");

  // 2. EFEITO: Quando o modal abre (isOpen vira true), iniciamos a edição
  useEffect(() => {
    if (isOpen) {
      iniciarEdicao();
      setLocalErro(""); // Limpa erros antigos de imagem
    }
  }, [isOpen]);

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
      // Manda direto para o Global
      definirImagemForm(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Chama a função global. Ela retorna true se deu certo.
    const sucesso = await salvarPerfil();
    if (sucesso) {
      onClose();
    }
  };

  // Se o interruptor estiver desligado, não desenha nada.
  if (!isOpen) return null;

  return (
    <ModalContainer>
      <ModalContent>
        <ModalHeader>
          <h3>Editar Perfil</h3>
          <button type="button" onClick={onClose} disabled={loadingUpdate}>
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
              {localErro && (
                <span
                  style={{ color: "red", fontSize: "0.9rem", marginTop: "5px" }}
                >
                  {localErro}
                </span>
              )}
            </ContainerButton>
          </ContainerUploadImg>
          <InputGroup>
            <label>Nome</label>
            <input
              id="nome"
              name="nome"
              type="text"
              value={nome || ""}
              onChange={(e) => atualizarDado("nome", e.target.value)}
              disabled={loadingUpdate}
            />
          </InputGroup>
          <InputGroup>
            <label>Sobrenome</label>
            <input
              type="text"
              id="sobrenome"
              name="sobrenome"
              value={sobrenome || ""}
              onChange={(e) => atualizarDado("sobrenome", e.target.value)}
              disabled={loadingUpdate}
            />
          </InputGroup>
          <InputGroup>
            <label>Usuário</label>{" "}
            {/* Tirei o (@) do label pra não ficar repetitivo */}
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* O charmoso @ fixo do lado esquerdo */}
              <span
                style={{
                  position: "absolute",
                  left: "10px",
                  color: "#171d1f",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  zIndex: 1,
                }}
              >
                @
              </span>

              <input
                type="text"
                id="usuario"
                name="usuario"
                value={usuario || ""}
                // AQUI ESTÁ A MÁGICA
                onChange={(e) => {
                  const valorLimpo = e.target.value
                    .replace(/@/g, "") // Remove qualquer @ que ele tentar colar
                    .replace(/\s/g, "") // Remove espaços (usuário não tem espaço)
                    .toLowerCase(); // Força minúsculo (boa prática)

                  atualizarDado("usuario", valorLimpo);
                }}
                disabled={loadingUpdate}
                placeholder="seu.usuario" // Sem o @ no placeholder
                // Um padding extra na esquerda para o texto não ficar em cima do @ estático
                style={{ paddingLeft: "2rem" }}
              />
            </div>
          </InputGroup>
          <InputGroup>
            <label>Função / Cargo</label>
            <input
              id="funcao"
              name="funcao"
              type="text"
              value={funcao || ""}
              onChange={(e) => atualizarDado("funcao", e.target.value)}
              disabled={loadingUpdate}
              placeholder="Ex: Desenvolvedor Front-End"
            />
          </InputGroup>
          <InputGroup>
            <label>Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={bio || ""}
              onChange={(e) => atualizarDado("bio", e.target.value)}
              disabled={loadingUpdate}
            />
          </InputGroup>

          <ModalFooter>
            <BotaoCancelar
              type="button"
              onClick={onClose}
              disabled={loadingUpdate}
            >
              Cancelar
            </BotaoCancelar>
            <BotaoSalvar type="submit" disabled={loadingUpdate}>
              {loadingUpdate ? "Salvando..." : "Salvar Alterações"}
            </BotaoSalvar>
          </ModalFooter>
        </Form>
      </ModalContent>
    </ModalContainer>
  );
};

export default ModalEditarPerfil;
