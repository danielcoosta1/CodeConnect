import { useContext } from "react";
import { PostContext } from "../context/Post/PostContext";


export const usePost = () => useContext(PostContext);