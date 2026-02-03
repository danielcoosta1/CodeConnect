import { Navigate, Route, Routes } from "react-router-dom";
import Cadastro from "../../pages/Cadastro";
import Login from "../../pages/Login";
import ContainerMain from "../ContainerMain";
import Publicar from "../../pages/Publicar";
import Feed from "../../pages/Feed";
import Perfil from "../../pages/Perfil";
import SobreNos from "../../pages/SobreNos";
import { ToastContainer } from "react-toastify";
import ProtectedLayout from "../ProtectedLayout";
import PerfilPublico from "../../pages/PerfilPublico";

const AppContent = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />

        {/* Rotas Protegidas (Layout com Sidebar) */}
        <Route path="/" element={<ProtectedLayout />}>
          {/* 1. Redireciona a raiz '/' para '/feed' */}
          <Route index element={<Navigate to="/feed" replace />} />

          <Route path="feed" element={<Feed />} />
          <Route path="publicar" element={<Publicar />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="sobre-nos" element={<SobreNos />} />
          <Route path="perfil/:id" element={<PerfilPublico />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppContent;
