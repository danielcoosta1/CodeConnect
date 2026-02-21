import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { device } from "../../styles/breakpoints";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(1rem); }
  to { opacity: 1; transform: translateY(0); }
`;

export const PostContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  padding: 2.4rem;
  animation: ${fadeIn} 0.4s ease-out forwards;

  @media ${device.mobile} {
    padding: 1.6rem;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: none;
  border: none;
  color: #bcbcbc;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 2.4rem;
  transition: color 0.2s ease;
  width: max-content;

  &:hover {
    color: #81fe88;
  }
`;

export const CoverImage = styled.div`
  width: 100%;
  height: 35rem;
  border-radius: 1.6rem;
  overflow: hidden;
  background-color: #2d3538;
  border: 0.1rem solid #333;
  margin-bottom: 3.2rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media ${device.mobile} {
    height: 20rem;
    border-radius: 0.8rem;
  }
`;

export const PostHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.4rem;
`;

export const AuthorInfo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  text-decoration: none;
  color: inherit;
  padding: 0.8rem;
  border-radius: 0.8rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  h3 {
    font-size: 1.8rem;
    color: #fff;
    margin: 0;
  }

  small {
    font-size: 1.4rem;
    color: #818388;
  }
`;

export const PostTitle = styled.h1`
  font-size: 3.6rem;
  color: #fff;
  margin-bottom: 2.4rem;
  line-height: 1.2;

  @media ${device.mobile} {
    font-size: 2.8rem;
  }
`;

export const PostContent = styled.article`
  font-size: 1.8rem;
  color: #cccccc;
  line-height: 1.6;
  margin-bottom: 3.2rem;

  p {
    white-space: pre-wrap; 
  }
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-bottom: 4rem;
  padding-bottom: 4rem;
  border-bottom: 0.1rem solid #2d3538;
`;

export const TagItem = styled.span`
  background-color: rgba(129, 254, 136, 0.1);
  color: #81fe88;
  padding: 0.8rem 1.6rem;
  border-radius: 2rem;
  font-size: 1.4rem;
  font-weight: 600;
  border: 0.1rem solid rgba(129, 254, 136, 0.2);
`;