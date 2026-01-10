import { PostContext } from "./PostContext";

const PostProvider = ({ children }) => {
  return <PostContext.Provider value={{}}> {children} </PostContext.Provider>;
};

export default PostProvider;
