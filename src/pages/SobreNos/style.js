import styled from "styled-components";
import { device } from "../../styles/breakpoints";

const commonTittles = `
     h2 {
    color: #bcbcbc;
    font-weight: 500;
    font-size: 2rem;
    line-height: 120%;
  }

  p {
    color: #e1e1e1;
    font-weight: 300;
    font-size: 1.3rem;
    line-height: 150%;
  }
`;

export const ContainerMain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding: 3rem 4rem;
  background-color: #171d1f;
  gap: 6rem;
`;

export const ImgCapa = styled.img`
  width: 100%;
`;

export const ContainerWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

export const ContainerApresentacao = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

  h1 {
    font-size: 2.75rem;
    color: #81fe88;
    line-height: 120%;
    font-weight: 500;
  }

  ${commonTittles}
`;

export const ContainerMissao = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ContainerWarapperMissao = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1.25rem;

  ${commonTittles}
`;

export const ImgMissao = styled.img``;

export const ContainerJunte = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  ${commonTittles}
`;

export const FooterMissao = styled.footer`
  display: flex;
  gap: 2rem;
  align-items: center;

  p {
    font-weight: 400;
    font-size: 2rem;
    line-height: 150%;
    color: #888888;
  }
`;
