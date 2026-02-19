import React, { useEffect, useRef, useState } from "react";
import {
  BotaoCancelar,
  BotaoSalvar,
  ButtonUploadImg,
  ContainerButton,
  ContainerUploadImg,
  Form,
  InputGroup,
  ModalContainer,
  ModalContent,
  ModalFooter,
  ModalHeader,
  InputWrapper,
  InputPrefix,
  ErrorText,
} from "./style";
import { useAuth } from "../../hooks/useAuth";
import { FaTimes, FaUpload } from "react-icons/fa";
import ProfileAvatar from "../ProfileAvatar"; // Reutilizando nosso componente perfeito!

const ModalEditarPerfil = ({ isOpen, onClose }) => {
  const {
    nome,
    sobrenome,
    usuario,
    funcao,
    bio,
    imagem,
    loadingUpdate,
    iniciarEdicao,
    atualizarDado,
    definirImagemForm,
    salvarPerfil,
  } = useAuth();

  const inputRef = useRef();
  const [localErro, setLocalErro] = useState("");

  useEffect(() => {
    if (isOpen) {
      iniciarEdicao();
      setLocalErro("");
    }
  }, [isOpen]);

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;

    const tiposAceitos = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!tiposAceitos.includes(file.type)) {
      setLocalErro("Tipo de arquivo não suportado. Envie uma imagem.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setLocalErro("O tamanho do arquivo excede o limite de 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      definirImagemForm(base64String);
      setLocalErro(""); // Limpa o erro ao dar sucesso
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sucesso = await salvarPerfil();
    if (sucesso) {
      onClose();
    }
  };

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
            <ProfileAvatar src={imagem} size={180} hasBorder={true} />

            <ContainerButton>
              <ButtonUploadImg
                type="button"
                onClick={() => inputRef.current.click()}
              >
                <p>Carregar nova foto</p>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={inputRef}
                  onChange={handleImageChange}
                />
                <FaUpload />
              </ButtonUploadImg>
              {localErro && <ErrorText>{localErro}</ErrorText>}
            </ContainerButton>
          </ContainerUploadImg>

          <InputGroup>
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              value={nome || ""}
              onChange={(e) => atualizarDado("nome", e.target.value)}
              disabled={loadingUpdate}
            />
          </InputGroup>

          <InputGroup>
            <label htmlFor="sobrenome">Sobrenome</label>
            <input
              id="sobrenome"
              type="text"
              value={sobrenome || ""}
              onChange={(e) => atualizarDado("sobrenome", e.target.value)}
              disabled={loadingUpdate}
            />
          </InputGroup>

          <InputGroup>
            <label htmlFor="usuario">Usuário</label>
            <InputWrapper>
              <InputPrefix>@</InputPrefix>
              <input
                id="usuario"
                type="text"
                value={usuario || ""}
                onChange={(e) => {
                  const valorLimpo = e.target.value
                    .replace(/@/g, "")
                    .replace(/\s/g, "")
                    .toLowerCase();
                  atualizarDado("usuario", valorLimpo);
                }}
                disabled={loadingUpdate}
                placeholder="seu.usuario"
                className="input-com-prefixo"
              />
            </InputWrapper>
          </InputGroup>

          <InputGroup>
            <label htmlFor="funcao">Função / Cargo</label>
            <input
              id="funcao"
              type="text"
              value={funcao || ""}
              onChange={(e) => atualizarDado("funcao", e.target.value)}
              disabled={loadingUpdate}
              placeholder="Ex: Desenvolvedor Front-End"
            />
          </InputGroup>

          <InputGroup>
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
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
