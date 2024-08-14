import "./App.css";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateNote from "./screens/CreateNote/CreateNote";
import MyNotes from "./screens/MyNotes/MyNotes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleNote from "./screens/SingleNote/SingleNote";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/createnote" element={<CreateNote />} />
        <Route path="/mynotes" Component={MyNotes} />
        <Route path="/mynotes/:id" element={<SingleNote />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
