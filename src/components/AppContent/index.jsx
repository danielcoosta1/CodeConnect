import { Route, Routes } from "react-router-dom";
import Cadastro from "../../pages/Cadastro";
import Login from "../../pages/Login";
import ContainerMain from "../ContainerMain";
import Publicar from "../../pages/Publicar";
import Feed from "../../pages/Feed";
import Perfil from "../../pages/Perfil";
import SobreNos from "../../pages/SobreNos";

const AppContent = () => {
  return (
    <Routes>
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      {/* Layout com Sidebar */}
      <Route path="/" element={<ContainerMain />}>
        <Route path="publicar" element={<Publicar />} />
        <Route path="feed" element={<Feed />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="sobre-nos" element={<SobreNos />} />
      </Route>
    </Routes>
  );
};

export default AppContent;
