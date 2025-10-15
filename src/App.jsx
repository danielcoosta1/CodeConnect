import { BrowserRouter as Router } from "react-router-dom";
import AppContent from "./components/AppContent";
import AuthProvider from "./context/AuthProvider";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
