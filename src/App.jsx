import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContainerMain from "./components/ContainerMain";
import Publicar from "./pages/Publicar";
import Feed from "./pages/Feed";
import SobreNos from "./pages/SobreNos";
import Perfil from "./pages/Perfil";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
