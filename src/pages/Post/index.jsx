import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ProfileAvatar from "../../components/ProfileAvatar";
import LoadingState from "../../components/LoadingState"; // Nossas ferramentas globais!
import ErrorState from "../../components/ErrorState"; // Nossas ferramentas globais!
import { FaArrowLeft } from "react-icons/fa6";
import defaultImg from "../Publicar/assets/exemplo.png";

import {
  PostContainer,
  CoverImage,
  PostHeader,
  AuthorInfo,
  PostTitle,
  PostContent,
  TagList,
  TagItem,
  BackButton,
} from "./style";
import { usePost } from "../../hooks/usePost";

const Post = () => {
  const { id } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();

  const {
    postDetails,
    loadingPostDetails,
    errorPostDetails,
    carregarPostPorId,
  } = usePost();

  useEffect(() => {
    if (id) {
      carregarPostPorId(id);
    }
  }, [id]);

  if (loadingPostDetails) {
    return <LoadingState texto="Carregando post..." size={45} />;
  }

  if (errorPostDetails) {
    return (
      <ErrorState
        mensagem={errorPostDetails}
        onRetry={() => carregarPostPorId(id)}
      />
    );
  }

  // Renderização de Sucesso
  return (
    <PostContainer>
      <BackButton onClick={() => navigate(-1)}>
        <FaArrowLeft /> Voltar
      </BackButton>

      <CoverImage>
        <img
          src={
            postDetails.image
              ? `data:image/png;base64,${postDetails.image}`
              : defaultImg
          }
          alt={`Capa do projeto ${postDetails.title}`}
        />
      </CoverImage>

      <PostHeader>
        <AuthorInfo to={`/perfil/${postDetails.author.id}`}>
          <ProfileAvatar
            src={postDetails.author?.imagem}
            size={50}
            hasBorder={true}
          />
          <div>
            <h3>
              {postDetails.author.nome} {postDetails.author.sobrenome}
            </h3>
            <small>@{postDetails.author.usuario}</small>
          </div>
        </AuthorInfo>
      </PostHeader>

      <PostTitle>{postDetails.title}</PostTitle>

      <PostContent>
        <p>{postDetails.content}</p>
      </PostContent>

      {postDetails.tags && postDetails.tags.length > 0 && (
        <TagList>
          {postDetails.tags.map((tag, index) => (
            <TagItem key={index}>{tag}</TagItem>
          ))}
        </TagList>
      )}
    </PostContainer>
  );
};

export default Post;
