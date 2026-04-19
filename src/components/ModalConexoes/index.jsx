import ProfileAvatar from "../ProfileAvatar";
import {
  Overlay,
  ModalContainer,
  Header,
  CloseButton,
  UserList,
  UserRow,
  UserInfo,
} from "./style";

const ModalConexoes = ({ isOpen, onClose, titulo, usuarios = [] }) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <h3>{titulo}</h3>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Header>
        <UserList>
          {usuarios?.length === 0 ? (
            <p className="empty-msg">Nenhum usuário para mostrar.</p>
          ) : (
            usuarios.map((u) => (
              <UserRow key={u.id}>
                {/* O Link já direciona para o perfil da pessoa e fecha o modal */}
                <UserInfo to={`/perfil/${u.id}`} onClick={onClose}>
                  <ProfileAvatar src={u.imagem} size={45} hasBorder={false} />
                  <div>
                    <strong>
                      {u.nome} {u.sobrenome}
                    </strong>
                    <span>@{u.usuario}</span>
                  </div>
                </UserInfo>
              </UserRow>
            ))
          )}
        </UserList>
      </ModalContainer>
    </Overlay>
  );
};

export default ModalConexoes;
