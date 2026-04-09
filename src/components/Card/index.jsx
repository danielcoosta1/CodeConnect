import { useNavigate } from "react-router-dom";
import ProfileAvatar from "../ProfileAvatar";
import {
  CardContainer,
  ImgCard,
  ContentCard,
  TitleCard,
  Description,
  CardFooter,
  AuthorInfo,
  ActionIcons,
  IconGroup,
} from "./style";

import {
  FaRegComment,
  FaShareNodes,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa6";

import { useAuth } from "../../hooks/useAuth";
import { usePost } from "../../hooks/usePost";
import { toastSucesso } from "../../utils/toast";

const Card = ({ post }) => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Pega o usuário logado
  const { curtirPost, compartilharPost } = usePost(); // Pega as funções de ação

  // Verifica se o usuário atual logado está na lista de curtidas desse post
  const hasLiked = post.likeIds?.includes(user?.id);

  // Função que abre o post inteiro
  const abrirPost = () => {
    navigate(`/post/${post.id}`);
  };

const handleShare = async (e) => {
    e.stopPropagation(); // Evita abrir o post ao clicar no botão
    const link = `${window.location.origin}/post/${post.id}`;

    // 1. CHAMA A API IMEDIATAMENTE! (Isso garante que o contador suba na hora)
    compartilharPost(post.id);

    try {
      // 2. Tenta abrir a gaveta nativa do celular (WhatsApp, Insta, Twitter)
      if (navigator.share) {
        await navigator.share({
          title: "CodeConnect",
          text: `Dá uma olhada no projeto "${post.title}" no CodeConnect!`,
          url: link,
        });
      } else {
        // 3. Plano B para PCs antigos: Copia o link
        await navigator.clipboard.writeText(link);
        toastSucesso("Link copiado para a área de transferência!");
      }
    } catch (error) {
      console.log("Compartilhamento cancelado pelo usuário.", error);
      // Como já chamamos a API lá em cima, não importa se ele cancelou, o +1 já contou!
    }
  };
  return (
    <CardContainer onClick={abrirPost}>
      {post.image && (
        <ImgCard>
          <img
            src={`data:image/png;base64,${post.image}`}
            alt={post.title}
            loading="lazy"
          />
        </ImgCard>
      )}

      <ContentCard>
        <TitleCard>{post.title}</TitleCard>
        <Description>{post.content}</Description>

        <CardFooter
          onClick={
            (e) =>
              e.stopPropagation() /* Evita que o clique no footer abra o post */
          }
        >
          {post.author && (
            <ActionIcons>
              {/* --- BOTÃO DE CURTIR --- */}
              <IconGroup
                onClick={() => {
                  if (user) curtirPost(post.id);
                }}
                style={{ color: hasLiked ? "#ff5f56" : "inherit" }}
              >
                {hasLiked ? <FaHeart /> : <FaRegHeart />}
                <span>{post.likeIds?.length || 0}</span>
              </IconGroup>

              {/* --- BOTÃO DE COMPARTILHAR --- */}
              <IconGroup onClick={handleShare}>
                <FaShareNodes />
                <span>{post.shares || 0}</span>
              </IconGroup>

              {/* --- CONTADOR DE COMENTÁRIOS --- */}
              <IconGroup>
                <FaRegComment />
                <span>{post.comments?.length || 0}</span>
              </IconGroup>
            </ActionIcons>
          )}

          <AuthorInfo to={`/perfil/${post.author.id}`}>
            <ProfileAvatar
              src={post.author?.imagem}
              size={60}
              hasBorder={true}
            />
            <div className="author-text">
              <small>@{post.author.usuario}</small>
            </div>
          </AuthorInfo>
        </CardFooter>
      </ContentCard>
    </CardContainer>
  );
};

export default Card;
