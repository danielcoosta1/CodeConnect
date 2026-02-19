import styled, { css } from "styled-components";
import { device } from "../../styles/breakpoints";

// --- MIXIN TIPOGRAFIA ---
// Escala padronizada com o restante do app (Base: 16px para texto)
const typographyMixin = css`
  h2 {
    color: #ffffff;
    font-weight: 600;
    font-size: 2.4rem; /* 24px - Reduzido, mais elegante */
    line-height: 1.2;
    margin-bottom: 1.2rem;
  }

  p {
    color: #cccccc;
    font-weight: 400;
    font-size: 1.5rem; /* 15px - Padrão de leitura sem gritar */
    line-height: 1.6; 
  }

  @media ${device.tablet} {
    h2 {
      font-size: 2rem;
    }
    p {
      font-size: 1.4rem;
    }
  }

  @media ${device.mobile} {
    h2 {
      font-size: 1.8rem;
    }
    p {
      font-size: 1.3rem;
    }
  }
`;

export const ContainerMain = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #171d1f;
  padding-bottom: 6rem; 
`;

export const ImgCapa = styled.img`
  width: 100%;
  height: 30rem; /* Aumentado de 20 para 30rem para visual de Hero */
  object-fit: cover; 
  border-radius: 0 0 1.6rem 1.6rem; 
  margin-bottom: 4rem;

  @media ${device.mobile} {
    height: 16rem; 
    margin-bottom: 2.4rem;
  }
`;

export const ContainerWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8rem; /* Respiro bem generoso entre as seções */

  max-width: 100rem; /* Alinhado com o max-width do Perfil e Feed */
  margin: 0 auto;
  padding: 0 2.4rem; 

  @media ${device.tablet} {
    gap: 5rem;
    padding: 0 1.6rem;
  }
`;

export const ContainerApresentacao = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center; 
  gap: 1.6rem;
  margin: 0 auto;
  max-width: 80rem; 

  ${typographyMixin}

  h1 {
    font-size: 3.6rem; /* 36px - Destaque sem exageros */
    color: #81fe88;
    line-height: 1.2;
    font-weight: 700;
  }

  h2 {
    color: #e1e1e1;
    font-weight: 500; 
    font-size: 1.8rem; /* Subtítulo elegante */
    margin-bottom: 0.8rem;
  }

  @media ${device.tablet} {
    h1 {
      font-size: 2.8rem;
    }
  }

  @media ${device.mobile} {
    h1 {
      font-size: 2.4rem;
    }
  }
`;

export const ContainerMissao = styled.div`
  display: flex;
  align-items: center; 
  justify-content: space-between;
  gap: 6rem;

  @media ${device.tablet} {
    flex-direction: column;
    gap: 3.2rem;
    text-align: center; /* Centraliza no mobile */
  }
`;

export const ContainerWarapperMissao = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; 
  gap: 1.6rem;

  ${typographyMixin}
`;

export const ImgMissao = styled.img`
  width: 45%; 
  max-width: 40rem; 
  border-radius: 1.6rem;
  box-shadow: 0 0.8rem 2.4rem rgba(0, 0, 0, 0.3); 

  @media ${device.tablet} {
    width: 90%; 
    max-width: 100%;
  }
`;

export const ContainerJunte = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  background-color: #2d3538; 
  padding: 4rem;
  border-radius: 1.6rem;
  text-align: center;
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.15);

  ${typographyMixin}

  h2 {
    color: #81fe88;
    margin-bottom: 0.8rem;
  }
  
  p {
    max-width: 60rem;
    margin: 0 auto;
  }

  @media ${device.mobile} {
    padding: 2.4rem;
  }
`;

export const FooterMissao = styled.footer`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  justify-content: center;
  margin-top: 2rem;

  border-top: 0.1rem solid #333;
  padding-top: 3.2rem;

  p {
    font-weight: 400;
    font-size: 1.6rem; /* Texto de rodapé legível, mas não gigante */
    color: #888;
  }

  @media ${device.tablet} {
    flex-direction: column;
    text-align: center;
  }

  @media ${device.mobile} {
    p {
      font-size: 1.4rem;
    }
  }
`;

export const ImgFooter = styled.img`
  width: 4.8rem; 
  opacity: 0.8; 

  @media ${device.tablet} {
    width: 4rem;
  }
`;