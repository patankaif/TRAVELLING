import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Main from "./components/Main.jsx";
import ImagePage from "./components/ImagePage.jsx";
import AddPlace from "./components/AddPlace.jsx";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/image" element={<ImagePage />} />
        <Route path="/add" element={<AddPlace />} />
      </Routes>
    </>
  );
}

export default App;
