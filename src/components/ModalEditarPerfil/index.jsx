import React, { useEffect, useState } from "react";
import {
  Form,
  InputGroup,
  ModalContainer,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "./style";
import { useAuth } from "../../hooks/useAuth";
import { FaTimes } from "react-icons/fa";

const ModalEditarPerfil = ({ isOpen, onClose }) => {
  // 2. PEGANDO OS DADOS E A FUNÇÃO DIRETO DA FONTE
  // 'user' serve para preencher os campos.
  // 'atualizarPerfilNoBanco' serve para salvar no Backend.
  const { user, atualizarPerfilNoBanco } = useAuth();

  // Estados locais dos inputs do formulário
  const [nome, setNome] = useState("");
  const [funcao, setFuncao] = useState("");
  const [bio, setBio] = useState("");
  const [imagem, setImagem] = useState("");
  const [loading, setLoading] = useState(false);

  // 3. EFEITO INTELIGENTE: Preenche o formulário assim que o modal abrir
  useEffect(() => {
    if (user && isOpen) {
      setNome(user.nome || "");
      setFuncao(user.funcao || "");
      setBio(user.bio || "");
      setImagem(user.imagem || "");
    }
  }, [user, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Chama a função que criamos no AuthProvider
      await atualizarPerfilNoBanco({ nome, funcao, bio, imagem });
      onClose(); // Se deu tudo certo, fecha o modal sozinho
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Houve um erro ao atualizar os dados. Tente novamente.");
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
          <button onClick={onClose} disabled={loading}>
            <FaTimes />
          </button>
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
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
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
             
            />
          </InputGroup>

          <InputGroup>
            <label>URL da Imagem de Perfil</label>
            <input
              type="url"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              placeholder="https://..."
              disabled={loading}
            />
          </InputGroup>

          <ModalFooter>
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? "Salvando..." : "Salvar Alterações"}
            </button>
          </ModalFooter>
        </Form>
      </ModalContent>
    </ModalContainer>
  );
};

export default ModalEditarPerfil;
