import {
  ContainerApresentacao,
  ContainerJunte,
  ContainerMain,
  ContainerMissao,
  ContainerWarapperMissao,
  ContainerWrapper,
  FooterMissao,
  ImgCapa,
  ImgMissao,
} from "./style";

import imgCapa from "./assets/capa.png";
import imgMissao from "./assets/img_missao.png";
import logo from "./assets/logo.png";

const SobreNos = () => {
  return (
    <ContainerMain>
      <ImgCapa src={imgCapa} />
      <ContainerWrapper>
        <ContainerApresentacao>
          <h1>Bem-Vindo ao CodeConnect!</h1>
          <h2>Onde a comunidade e o código se unem!</h2>
          <p>
            No coração da revolução digital está a colaboração. CodeConnect
            nasceu da visão de criar um espaço onde desenvolvedores,
            programadores e entusiastas da tecnologia podem se conectar,
            aprender e colaborar de maneira inigualável. Somos uma comunidade
            global apaixonada por código e estamos comprometidos em oferecer um
            ambiente inclusivo e inspirador para todos os níveis de habilidade.
          </p>
        </ContainerApresentacao>
        <ContainerMissao>
          <ContainerWarapperMissao>
            <h2>Nossa Missão</h2>
            <p>
              Na CodeConnect, acreditamos que a colaboração é a essência da
              inovação. Nossa missão é fornecer uma plataforma onde os mentes
              criativas podem se unir, compartilhar conhecimento, e desenvolver
              projetos extraordinários. Quer você seja um novato ansioso para
              aprender ou um veterano experiente, você encontrará aqui um lar
              para suas aspirações tecnológicas.
            </p>
          </ContainerWarapperMissao>
          <ImgMissao src={imgMissao} />
        </ContainerMissao>

        <ContainerJunte>
          <h2>Junte-se a Nós!</h2>
          <p>
            Estamos animados para ter você conosco nesta jornada empolgante.
            Junte-se à nossa comunidade vibrante e descubra o poder da
            colaboração no mundo do código.
          </p>
        </ContainerJunte>
        <FooterMissao>
          <img src={logo} />
          <p>
            Juntos, vamos transformar ideias em inovações e moldar o futuro
            digital.
          </p>
        </FooterMissao>
      </ContainerWrapper>
    </ContainerMain>
  );
};
export default SobreNos;
