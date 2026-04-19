import styled from "styled-components";
import { Link } from "react-router-dom";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: #171d1f;
  width: 90%;
  max-width: 45rem;
  border-radius: 1.2rem;
  border: 1px solid #333;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid #333;

  h3 {
    color: #ffffff;
    font-size: 1.8rem;
    margin: 0;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #888;
  font-size: 2.8rem;
  cursor: pointer;
  line-height: 1;
  transition: color 0.2s;

  &:hover {
    color: #ff5f56;
  }
`;

export const UserList = styled.div`
  padding: 1rem 0;
  overflow-y: auto;
  
  p.empty-msg {
    text-align: center;
    color: #888;
    padding: 3rem 2rem;
    font-size: 1.4rem;
  }
`;

export const UserRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2rem;
  transition: background 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }
`;

export const UserInfo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  text-decoration: none;

  div {
    display: flex;
    flex-direction: column;
  }

  strong {
    color: #ffffff;
    font-size: 1.6rem;
  }

  span {
    color: #888;
    font-size: 1.4rem;
  }

  &:hover strong {
    text-decoration: underline;
  }
`;