import { Outlet } from "react-router-dom";
import SideBar from "../SideBar";
import { ContainerEstilizado } from "./style";

const ContainerMain = () => {
  return (
    <ContainerEstilizado>
      <SideBar />
      <main>
        <Outlet />
      </main>
    </ContainerEstilizado>
  );
};

export default ContainerMain;
