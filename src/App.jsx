import { BrowserRouter as Router } from "react-router-dom";
import AppContent from "./components/AppContent";
import AuthProvider from "./context/Auth/AuthProvider";
import { PostProvider } from "./context/Post/PostProvider";
import GlobalStyle from "./styles/GlobalStyles";

function App() {
  return (
    <Router>
      <AuthProvider>
        <PostProvider>
          <AppContent />
          <GlobalStyle />
        </PostProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
