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
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  return (
    <Router>
      <Header setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/createnote" element={<CreateNote />} />
        <Route path="/mynotes" element={<MyNotes search={search} />} />
        <Route path="/mynotes/:id" element={<SingleNote />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
