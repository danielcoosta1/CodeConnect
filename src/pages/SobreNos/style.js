import styled, { css } from "styled-components";
import { device } from "../../styles/breakpoints";

// --- MIXIN TIPOGRAFIA ---
// Usando o helper 'css' do styled-components para garantir sintaxe correta
const typographyMixin = css`
  h2 {
    color: #bcbcbc;
    font-weight: 500;
    font-size: 2rem;
    line-height: 1.2;
    margin-bottom: 1rem; /* Espaço entre título e parágrafo */
  }

  p {
    color: #e1e1e1;
    font-weight: 300;
    font-size: 1.3rem;
    line-height: 1.6; /* Leitura mais confortável */
  }

  @media ${device.tablet} {
    h2 {
      font-size: 1.8rem;
    }
    p {
      font-size: 1.2rem;
    }
  }

  @media ${device.mobile} {
    h2 {
      font-size: 1.5rem;
    }
    p {
      font-size: 1.1rem;
    }
  }
`;

export const ContainerMain = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;

  /* Removemos o padding lateral fixo para a capa encostar nas bordas se quiser */
  /* Mas se quiser manter o conteúdo alinhado, usamos um wrapper interno */
  background-color: #171d1f;
  padding-bottom: 4rem; /* Respiro no final */
`;

export const ImgCapa = styled.img`
  width: 100%;
  height: 20rem; /* Define uma altura fixa para a capa */
  object-fit: cover; /* Corta a imagem para preencher sem distorcer */
  border-radius: 0 0 1rem 1rem; /* Charme: bordas arredondadas só embaixo */
  margin-bottom: 4rem;

  @media ${device.mobile} {
    height: 12rem; /* Capa menor no celular */
    margin-bottom: 2rem;
  }
`;

export const ContainerWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 6rem; /* Mais respiro entre seções */

  /* Centraliza o conteúdo e limita a largura para leitura (não ficar muito esticado) */
  max-width: 75rem; /* 1200px */
  margin: 0 auto;
  padding: 0 2rem; /* Padding lateral para o texto não colar na borda */

  @media ${device.tablet} {
    gap: 4rem;
    padding: 0 1.5rem;
  }
`;

export const ContainerApresentacao = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  max-width: 50rem;
  margin: 0 auto;

  /* 1. Aplica a base (H2, P e seus breakpoints) */
  ${typographyMixin}

  /* 2. Estilização EXCLUSIVA do H1 (que não existe no mixin) */
  h1 {
    font-size: 3rem;
    color: #81fe88;
    line-height: 1.1;
    font-weight: 700;
  }

  /* 3. Ajustes finos (Sobrescrita) */
  /* Como é a capa, quero o H2 um pouco mais claro que o padrão cinza do mixin */
  h2 {
    color: #ffffff;
    font-weight: 400; /* Mais leve que o bold */
  }

  /* Breakpoints exclusivos do H1 */
  @media ${device.tablet} {
    h1 {
      font-size: 2.5rem;
    }
  }

  @media ${device.mobile} {
    h1 {
      font-size: 2rem;
    }
  }
`;

export const ContainerMissao = styled.div`
  display: flex;
  align-items: center; /* Alinha verticalmente imagem e texto */
  justify-content: space-between;
  gap: 4rem;

  /* No Tablet (1280px) já vira coluna, senão fica apertado */
  @media ${device.tablet} {
    flex-direction: column-reverse; /* Imagem em cima, texto embaixo? Ou normal? */
    /* Vamos manter normal: Texto em cima, Imagem embaixo no mobile fica bom */
    flex-direction: column;
    gap: 2rem;
    text-align: center; /* Centraliza texto no mobile */
  }
`;

export const ContainerWarapperMissao = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; /* Ocupa o espaço disponível */
  gap: 1rem;

  ${typographyMixin}/* Aplica o mixin corrigido */
`;

export const ImgMissao = styled.img`
  width: 45%; /* Um pouco maior */
  max-width: 30rem; /* Limite máximo */
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.3); /* Sombra para destacar */

  @media ${device.tablet} {
    width: 80%; /* No tablet ocupa mais espaço */
    max-width: 100%;
  }
`;

export const ContainerJunte = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  background-color: #2d3538; /* Um box de destaque */
  padding: 3rem;
  border-radius: 1rem;
  text-align: center;

  ${typographyMixin}

  /* Sobrescreve cores do mixin para dar destaque */
  h2 {
    color: #81fe88;
  }
  p {
    max-width: 60rem;
    margin: 0 auto;
  }

  @media ${device.mobile} {
    padding: 2rem;
  }
`;

export const FooterMissao = styled.footer`
  display: flex;

  align-items: center;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2rem;

  border-top: 1px solid #333;
  padding-top: 3rem;

  p {
    font-weight: 400;
    font-size: 2rem;
    color: #888;
  }

  @media ${device.tablet} {
    p {
      font-size: 1.6rem;
    }
  }

  @media ${device.mobile} {
    p {
      font-size: 1.3rem;
    }
  }
`;

export const ImgFooter = styled.img`
  width: 5rem; /* 80px */
  opacity: 0.8; /* Leve transparência */

  @media ${device.tablet} {
    width: 3.5rem;
  }

  @media ${device.mobile} {
    width: 3rem;
  }
`;
